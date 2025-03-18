import axios, { AxiosInstance, AxiosError } from "axios";
import { APIResponse, Customer } from "../types/apiTypes";

// API Base URL from environment variables or fallback to localhost
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/customers";

/**
 * Axios instance for API requests.
 */
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

/**
 * Registers a customer via API.
 * @param customerData - The customer details to be sent.
 * @returns APIResponse<Customer> - The server response.
 */
export const registerCustomer = async (
  customerData: Customer
): Promise<APIResponse<Customer>> => {
  try {
    const response = await apiClient.post<APIResponse<Customer>>(
      "/register",
      customerData
    );

    //  Consider 201 Created as success
    if (response.status === 201) {
      return {
        success: true,
        message: "Registration successful!",
        data: response.data.data,
      };
    }

    return {
      success: false,
      message: "Unexpected response from server.",
      data: null,
    };
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;

    console.error(
      "API Error:",
      axiosError.response?.data || axiosError.message
    );

    //  Handle specific error statuses
    switch (axiosError.response?.status) {
      case 409:
        return { success: false, message: "User already exists.", data: null };
      case 404:
        return {
          success: false,
          message: "API not found. Please contact support.",
          data: null,
        };
      case 500:
        return {
          success: false,
          message: "Server error. Please try again later.",
          data: null,
        };
      default:
        return {
          success: false,
          message:
            axiosError.response?.data?.message ||
            "An unexpected error occurred.",
          data: null,
        };
    }
  }
};
