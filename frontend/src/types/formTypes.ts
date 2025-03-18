/**
 * Form Fields Interface
 * Defines the structure of form input values.
 */
export interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  emiratesIdNumber?: string; //  Optional for flexibility in API interactions
  emiratesIdName?: string; //  Optional for flexibility in API interactions
}

/**
 * Input Component Props
 * Extends standard HTML input attributes with form validation support.
 */
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: keyof FormValues; //  Ensures only valid form fields are used
  error?: string; //  Supports validation messages
}

/**
 * Button Component Props
 * Extends standard HTML button attributes.
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode; //  Optional for buttons without labels/icons
}

/**
 * Status Popup Props
 * Defines props for status popups displaying messages.
 */
export interface StatusPopupProps {
  message?: string; //  Optional to support hidden popups
  onClose: () => void; //  Required close handler
}
