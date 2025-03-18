import React from "react";
import { Link } from "react-router-dom";

/**
 * Heading for the Thank You page with accessibility support.
 */
const ThankYouHeading: React.FC = React.memo(() => (
  <h2 className="heading" role="alert">
    🎉 Registration Successful!
  </h2>
));

/**
 * Thank You message for confirmation.
 */
const ThankYouMessage: React.FC = React.memo(() => (
  <p className="message">
    Thank you for registering with us. Your details have been successfully
    submitted.
  </p>
));

/**
 * Thank You Page - Displays a confirmation message after registration.
 */
const ThankYou: React.FC = React.memo(() => (
  <div className="thankyou-container">
    <div className="card">
      <ThankYouHeading />
      <ThankYouMessage />
      <nav>
        <Link to="/" className="homeLink">
          Go back to Home
        </Link>
      </nav>
    </div>
  </div>
));

export default ThankYou;
