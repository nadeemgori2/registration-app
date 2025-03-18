import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Input from "./Input";
import Button from "./Button";
import OCRUploader from "./OCRUploader";
import StatusPopup from "./StatusPopup";
import { registerCustomer } from "../../services/api";
import { useFormValidation } from "../../hooks/useFormValidation";
import { Customer } from "../../types/apiTypes";
import { validateForm } from "../../utils/validators";

/**
 * Registration Form Component - Handles customer registration with validation & OCR support.
 */
const RegistrationForm: React.FC = React.memo(() => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  // Initial form values
  const initialValues: Customer = {
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    emiratesIdNumber: "",
    emiratesIdName: "",
  };

  // Form validation hook
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setValues,
    setTouched,
    setErrors,
    isFormValid,
  } = useFormValidation(initialValues);

  /**
   * Handles form submission and API call for customer registration.
   */
  const submitForm = useCallback(async () => {
    const response = await registerCustomer(values);
    console.debug("API Response:", response);

    //  Navigate based on success or error messages
    if (response.success) {
      navigate("/thank-you");
    } else if (
      !response.success &&
      response.message === "User already exists."
    ) {
      console.warn("User already exists. Redirecting...");
      navigate("/user-exists");
    } else {
      setError(response.message as string); //  Show specific error message in popup
      console.warn("Error:", response.message);
    }
  }, [values, navigate]);

  /**
   * Updates form values with OCR-extracted Emirates ID data.
   */
  const handleOCRComplete = useCallback(
    (idNumber: string, name: string) => {
      setValues((prevValues) => {
        const updatedValues = {
          ...prevValues,
          emiratesIdNumber: idNumber,
          emiratesIdName: name,
        };

        setErrors(validateForm(updatedValues)); // Revalidate after OCR update
        return updatedValues;
      });

      setTouched(
        (prev) =>
          ({
            ...prev,
            emiratesIdNumber: true,
            emiratesIdName: true,
          } as any)
      );
    },
    [setValues, setTouched, setErrors]
  );

  /**
   * Returns validation error for a given form field.
   */
  const getFieldError = useCallback(
    (field: keyof Customer) =>
      touched[field] && errors[field] ? errors[field] : undefined,
    [touched, errors]
  );

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
          if (isFormValid) submitForm();
        }}
        className="registration-form"
      >
        <fieldset className="form-group">
          <legend>Personal Information</legend>
          <Input
            placeholder="First Name"
            name="firstName"
            type="text"
            value={values.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={getFieldError("firstName")}
          />
          <Input
            placeholder="Last Name"
            name="lastName"
            type="text"
            value={values.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={getFieldError("lastName")}
          />
          <Input
            placeholder="Email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={getFieldError("email")}
          />
          <Input
            placeholder="Mobile Number"
            name="mobile"
            type="text"
            value={values.mobile}
            onChange={handleChange}
            onBlur={handleBlur}
            error={getFieldError("mobile")}
          />
        </fieldset>

        <fieldset className="form-group">
          <legend>Emirates ID Verification</legend>
          <OCRUploader
            onOCRComplete={handleOCRComplete}
            setTouched={setTouched}
          />
        </fieldset>

        <Button type="submit" disabled={!isFormValid}>
          Submit
        </Button>
      </form>

      {error && (
        <StatusPopup
          message={error}
          onClose={() => setError(null)}
          aria-live="polite"
        />
      )}
    </>
  );
});

export default RegistrationForm;
