/**
 * Generic API Response Type
 * @template T - The type of the response data.
 */
export interface APIResponse<T> {
  success: boolean; //  Explicit success flag for handling API status
  message?: string; //  Optional, since not all APIs return a message
  data: T | null; //  Allows null in case of errors or missing data
}

/**
 * Customer Data Type
 */
export interface Customer {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  emiratesIdNumber?: string; //  Made optional for flexible API interactions
  emiratesIdName?: string; //  Made optional for flexible API interactions
}

/**
 * Partial Customer Type for Flexible API Calls
 * Useful for updating customer data or searching for a customer.
 */
export type PartialCustomer = Partial<Customer>;
