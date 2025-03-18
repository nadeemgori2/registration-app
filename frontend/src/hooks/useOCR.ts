import { useState, useCallback } from "react";
import Tesseract from "tesseract.js";
import { parseEmiratesId } from "../utils/ocrParser";
import { OCRHookReturn } from "../types/ocrTypes";

/**
 * Custom OCR Hook - Handles image uploads, processing, and verification.
 */
export const useOCR = (): OCRHookReturn => {
  const [frontImage, setFrontImage] = useState<File | null>(null);
  const [backImage, setBackImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  /**
   * Handles file uploads and assigns them to the correct state.
   */
  const handleFileUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, side: "front" | "back") => {
      try {
        const file = event.target.files?.[0];
        if (!file) return;

        side === "front" ? setFrontImage(file) : setBackImage(file);
      } catch (error) {
        console.error("File Upload Error:", error);
        setErrorMessage("Failed to upload file. Please try again.");
      }
    },
    []
  );

  /**
   * Processes OCR on the provided image using Tesseract.js.
   */
  const handleOCRProcessing = useCallback(
    async (image: File): Promise<string> => {
      setLoading(true);
      const imageUrl = URL.createObjectURL(image);

      try {
        const { data } = await Tesseract.recognize(imageUrl, "eng", {
          logger: (m) => console.log("OCR Processing:", m),
        });

        return data.text;
      } catch (error) {
        console.error("OCR Processing Error:", error);
        setErrorMessage("OCR processing failed. Please try again.");
        return "";
      } finally {
        URL.revokeObjectURL(imageUrl); // ✅ Free up memory after OCR processing
        setLoading(false);
      }
    },
    []
  );

  /**
   * Verifies uploaded Emirates ID images and extracts ID details.
   */
  const handleVerify = useCallback(
    async (
      onOCRComplete: (idNumber: string, name: string) => void,
      setTouched: (fields: Partial<Record<string, boolean>>) => void
    ) => {
      if (!frontImage || !backImage) {
        setErrorMessage(
          "Please upload both front and back images of your Emirates ID."
        );
        return;
      }

      try {
        const [frontText, backText] = await Promise.all([
          handleOCRProcessing(frontImage),
          handleOCRProcessing(backImage),
        ]);

        const { idNumber, name } = parseEmiratesId(frontText, backText);

        if (!idNumber || !name) {
          setErrorMessage("Failed to extract Emirates ID details.");
        } else {
          setErrorMessage("Emirates ID details successfully verified.");
          onOCRComplete(idNumber, name);
          setTouched({ emiratesIdNumber: true, emiratesIdName: true });
        }
      } catch (error) {
        console.error("Unexpected OCR Verification Error:", error);
        setErrorMessage("An unexpected error occurred during verification.");
      }
    },
    [frontImage, backImage, handleOCRProcessing]
  );

  return {
    frontImage,
    backImage,
    loading,
    handleFileUpload,
    handleVerify,
    errorMessage,
    setErrorMessage,
  };
};
