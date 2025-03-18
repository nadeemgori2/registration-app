import React from "react";
import { InputProps } from "../../types/formTypes";

/**
 * Reusable Input component with validation and accessibility support.
 */
const Input: React.FC<InputProps> = React.memo(
  ({
    placeholder = "Enter text",
    name,
    type = "text",
    value,
    onChange,
    onBlur,
    error,
  }) => {
    const errorId = `${name}-error`;

    return (
      <div className="input-wrapper">
        <input
          placeholder={placeholder}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`input-field ${error ? "input-error" : ""}`}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
        />
        <span
          id={errorId}
          className={`error text-danger d-block ${error ? "" : "invisible"}`}
        >
          {error || "Placeholder"}
        </span>
      </div>
    );
  }
);

export default Input;
