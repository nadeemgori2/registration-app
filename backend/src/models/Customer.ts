import mongoose, { Schema, Document, Model } from "mongoose";

/**
 * Interface defining the structure of a Customer document.
 */
export interface ICustomer extends Document {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  emiratesIdNumber: string;
  emiratesIdName: string;
  createdAt?: Date;
}

/**
 * Mongoose schema for the Customer model.
 */
const CustomerSchema: Schema<ICustomer> = new Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    mobile: { type: String, required: true, unique: true, trim: true },
    emiratesIdNumber: { type: String, required: true, trim: true },
    emiratesIdName: { type: String, required: true, trim: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

/**
 * Customer model.
 */
const Customer: Model<ICustomer> = mongoose.model<ICustomer>(
  "Customer",
  CustomerSchema
);

export default Customer;
