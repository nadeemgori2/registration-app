import { FormValues } from "./formTypes";

/**
 * Enum for OCR processing types (ID or Name extraction).
 */
export enum OCRProcessingType {
  NAME = "NAME",
  ID = "ID",
}

/**
 * Props for OCRUploader Component.
 */
export interface OCRUploaderProps {
  onOCRComplete: (idNumber: string, name: string) => void;
  setTouched: (fields: Record<keyof FormValues, boolean>) => void; //  Changed from full `Record<>`
}

/**
 * Return type for useOCR Hook.
 */
export interface OCRHookReturn {
  frontImage: File | null;
  backImage: File | null;
  loading: boolean;
  errorMessage: string | null;
  setErrorMessage: (message: string | null) => void;
  handleFileUpload: (
    event: React.ChangeEvent<HTMLInputElement>,
    side: "front" | "back"
  ) => void;
  handleVerify: (
    onOCRComplete: (idNumber: string, name: string) => void,
    setTouched: (fields: Record<keyof FormValues, boolean>) => void
  ) => void;
}
