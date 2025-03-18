import express from "express";
import { registerCustomer } from "../controllers/customerController";
import { validateRegistration } from "../middleware/validateRegistration";

const router = express.Router();

/**
 * @route   POST /api/customers/register
 * @desc    Registers a new customer
 * @access  Public
 */
router.post("/register", validateRegistration, registerCustomer);

export default router;
