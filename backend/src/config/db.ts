import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

/**
 * Establishes a connection to MongoDB using dynamic credentials.
 */
const connectDB = async (): Promise<void> => {
  try {
    const { DATABASE_URL, DB_USER, DB_PASS, DB_NAME } = process.env;

    if (!DATABASE_URL || !DB_USER || !DB_PASS || !DB_NAME) {
      throw new Error("Missing database credentials in environment variables.");
    }

    // Replace placeholders dynamically in DATABASE_URL
    const dbURI = DATABASE_URL.replace("${DB_USER}", DB_USER)
      .replace("${DB_PASS}", DB_PASS)
      .replace("${DB_NAME}", DB_NAME);

    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions);

    console.log("MongoDB connected successfully.");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;
