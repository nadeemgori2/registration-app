import React from "react";
import { ButtonProps } from "../../types/formTypes";

/**
 * Reusable Button component with memoization for performance.
 */
const Button: React.FC<ButtonProps> = React.memo(
  ({ children, type = "button", onClick, disabled }) => (
    <button
      className={`submit-btn ${disabled ? "disabled" : ""}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
);

export default Button;
