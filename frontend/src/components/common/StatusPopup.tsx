import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { StatusPopupProps } from "../../types/formTypes";

/**
 * StatusPopup - Displays an alert message with close functionality.
 */
const StatusPopup: React.FC<StatusPopupProps> = React.memo(
  ({ message, onClose }) => {
    if (!message) return null;

    const closeButtonRef = useRef<HTMLButtonElement>(null);

    /**
     * Handles closing popup on "Escape" key press.
     */
    useEffect(() => {
      const handleEscapeKey = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          onClose();
        }
      };

      document.addEventListener("keydown", handleEscapeKey);
      return () => document.removeEventListener("keydown", handleEscapeKey);
    }, [onClose]);

    /**
     * Handles closing popup when clicking outside of the content.
     */
    const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
      if ((event.target as Element).classList.contains("popup-overlay")) {
        onClose();
      }
    };

    // Move focus to close button when popup opens
    useEffect(() => {
      closeButtonRef.current?.focus();
    }, []);

    const portalRoot = document.getElementById("portal-root");
    if (!portalRoot) return null;

    return ReactDOM.createPortal(
      <div className="popup-overlay" onClick={handleOutsideClick}>
        <div className="popup-content" role="alert" aria-live="assertive">
          <h3>Notification</h3>
          <p className="popup-message">{message}</p>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="close-btn"
            aria-label="Close notification"
          >
            Close
          </button>
        </div>
      </div>,
      portalRoot
    );
  }
);

export default StatusPopup;
