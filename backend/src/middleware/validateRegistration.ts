import { Request, Response, NextFunction } from "express";

/**
 * Middleware to validate customer registration request.
 * Ensures required fields are present and names match the Emirates ID.
 */
export const validateRegistration = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const {
    email,
    mobile,
    firstName,
    lastName,
    emiratesIdName,
    emiratesIdNumber,
  } = req.body;

  // Required fields validation
  if (
    ![
      email,
      mobile,
      firstName,
      lastName,
      emiratesIdName,
      emiratesIdNumber,
    ].every(Boolean)
  ) {
    res.status(400).json({ message: "All fields are required" });
    return;
  }

  // Ensure firstName and lastName are part of emiratesIdName
  const formattedEmiratesIdName = emiratesIdName.toLowerCase();
  if (
    !formattedEmiratesIdName.includes(firstName.toLowerCase()) ||
    !formattedEmiratesIdName.includes(lastName.toLowerCase())
  ) {
    res.status(400).json({
      message: "First name and last name do not match Emirates ID name",
    });
    return;
  }

  return next(); // ✅ Always call next() to move to the next middleware or route handler
};
