import { useState, useEffect, useCallback } from "react";
import { validateForm } from "../utils/validators";
import { FormValues } from "../types/formTypes";

/**
 * Custom hook for form validation, state management, and error handling.
 */
export const useFormValidation = (initialValues: FormValues) => {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<Partial<FormValues>>(
    validateForm(initialValues)
  );
  const [touched, setTouched] = useState<Record<keyof FormValues, boolean>>(
    Object.fromEntries(
      Object.keys(initialValues).map((key) => [key, false])
    ) as Record<keyof FormValues, boolean>
  );
  const [isFormValid, setIsFormValid] = useState(false);

  /**
   * Handles input change and triggers validation.
   */
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setValues((prevValues) => {
      const updatedValues = { ...prevValues, [name]: value };
      setErrors(validateForm(updatedValues)); // ✅ Validate only when the value changes
      return updatedValues;
    });
  }, []);

  /**
   * Marks field as touched and validates the input on blur.
   */
  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      const { name } = e.target;

      setTouched((prev) => ({
        ...prev,
        [name as keyof FormValues]: true,
      }));

      setErrors((prevErrors) => ({
        ...prevErrors,
        [name as keyof FormValues]:
          validateForm(values)[name as keyof FormValues], // ✅ Validate only the blurred field
      }));
    },
    [values]
  );

  /**
   * Handles form submission, validates the entire form, and marks all fields as touched.
   */
  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const validationErrors = validateForm(values);

      setTouched(
        Object.fromEntries(
          Object.keys(values).map((key) => [key, true])
        ) as Record<keyof FormValues, boolean>
      );

      setErrors(validationErrors);
    },
    [values]
  );

  /**
   * Updates form validity state whenever errors or values change.
   */
  useEffect(() => {
    setIsFormValid(
      Object.values(errors).every((error) => !error) &&
        Object.values(values).every((value) => value.trim() !== "")
    );
  }, [errors, values]);

  return {
    values,
    errors,
    touched,
    isFormValid,
    handleChange,
    handleBlur,
    handleSubmit,
    setValues,
    setTouched,
    setErrors,
  };
};
