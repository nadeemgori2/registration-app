import { FormValues } from "../types/formTypes";

/**
 * Validates form fields and returns an object containing errors.
 * @param values - The form values to validate.
 * @returns Partial<FormValues> - Object containing field errors.
 */
export const validateForm = (values: FormValues): Partial<FormValues> => {
  const errors: Partial<FormValues> = {};

  //  Trim whitespace for all fields using Object.fromEntries()
  const trimmedValues = Object.fromEntries(
    Object.entries(values).map(([key, value]) => [key, value?.trim() || ""])
  ) as FormValues;

  //  First & Last Name Validation (min 2 characters)
  if (trimmedValues.firstName.length < 2)
    errors.firstName = "First name must have at least 2 characters.";
  if (trimmedValues.lastName.length < 2)
    errors.lastName = "Last name must have at least 2 characters.";

  //  Email Validation (Standard Format)
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(trimmedValues.email))
    errors.email = "Please enter a valid email address.";

  //  UAE Mobile Number Validation (9715XXXXXXXX or 05XXXXXXXX)
  const mobileRegex = /^(?:\+9715\d{8}|05\d{8})$/;
  if (!mobileRegex.test(trimmedValues.mobile))
    errors.mobile =
      "Valid UAE mobile number required (e.g., 05XXXXXXXX or +9715XXXXXXXX).";

  //  Emirates ID Validation (784-XXXX-XXXXXXX-X)
  const emiratesIdRegex = /^784-\d{4}-\d{7}-\d$/;
  if (
    trimmedValues.emiratesIdNumber &&
    !emiratesIdRegex.test(trimmedValues.emiratesIdNumber)
  )
    errors.emiratesIdNumber =
      "Valid Emirates ID required (format: 784-XXXX-XXXXXXX-X).";

  //  Emirates ID Name Validation (Alphabetical only, min 2 characters)
  const nameRegex = /^[A-Za-z\s'-]{2,}$/; // Supports names like O'Neil, Jean-Pierre
  if (
    trimmedValues.emiratesIdName &&
    !nameRegex.test(trimmedValues.emiratesIdName)
  )
    errors.emiratesIdName =
      "Valid name required (letters, spaces, hyphens, apostrophes, at least 2 characters).";

  return errors;
};
