import React, { useEffect } from "react";
import { useOCR } from "../../hooks/useOCR";
import { OCRUploaderProps } from "../../types/ocrTypes";
import StatusPopup from "./StatusPopup";
import ReactDOM from "react-dom";

/**
 * OCR Uploader component for Emirates ID image processing.
 */
const OCRUploader: React.FC<OCRUploaderProps> = React.memo(
  ({ onOCRComplete, setTouched }) => {
    const {
      frontImage,
      backImage,
      loading,
      handleFileUpload,
      handleVerify,
      errorMessage,
      setErrorMessage,
    } = useOCR();

    useEffect(() => {
      if (frontImage && backImage) {
        handleVerify(onOCRComplete, setTouched);
      }
      return () => setErrorMessage(null); // Cleanup error when images change
    }, [frontImage, backImage, onOCRComplete, setTouched, setErrorMessage]);

    return (
      <fieldset disabled={loading} className="ocr-uploader">
        <div className="upload-group">
          <label htmlFor="front-id">Upload Front Side of Emirates ID:</label>
          <input
            id="front-id"
            type="file"
            accept="image/*"
            onChange={(e) => handleFileUpload(e, "front")}
          />
        </div>

        <div className="upload-group">
          <label htmlFor="back-id">Upload Back Side of Emirates ID:</label>
          <input
            id="back-id"
            type="file"
            accept="image/*"
            onChange={(e) => handleFileUpload(e, "back")}
          />
        </div>
        {loading &&
          ReactDOM.createPortal(
            <div className="popup-overlay">
              <div className="spinner"></div>
            </div>,
            document.getElementById("portal-root") as HTMLElement
          )}
        {errorMessage && (
          <StatusPopup
            message={errorMessage}
            onClose={() => setErrorMessage(null)}
          />
        )}
      </fieldset>
    );
  }
);

export default OCRUploader;
