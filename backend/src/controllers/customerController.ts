import { Request, Response } from "express";
import Customer from "../models/Customer";

/**
 * Registers a new customer.
 * - Checks if the email or mobile already exists.
 * - Saves the customer if unique.
 */
export const registerCustomer = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, mobile } = req.body;

    // Check if user already exists (by email or mobile)
    const existingCustomer = await Customer.findOne({
      $or: [{ email }, { mobile }],
    });

    if (existingCustomer) {
      res.status(409).json({ message: "User already exists" });
      return;
    }

    // Create and save new customer
    const customer = new Customer(req.body);
    await customer.save();

    res.status(201).json({ message: "Registration successful", customer });
  } catch (error) {
    console.error("Error registering customer:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
