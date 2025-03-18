import React from "react";
import { Link } from "react-router-dom";

/**
 * Heading for User Already Exists page with accessibility support.
 */
const UserExistsHeading: React.FC = React.memo(() => (
  <h2 className="heading text-danger" role="alert">
    ⚠️ User Already Exists
  </h2>
));

/**
 * Message displayed when a user with the same email or mobile is already registered.
 */
const UserExistsMessage: React.FC = React.memo(() => (
  <p className="message">
    A user with the provided email or mobile number is already registered.
  </p>
));

/**
 * User Already Exists Page - Displays a message when a duplicate user is detected.
 */
const UserAlreadyExists: React.FC = React.memo(() => (
  <div className="userexists-container">
    <div className="card">
      <UserExistsHeading />
      <UserExistsMessage />
      <nav>
        <Link to="/" className="home-link">
          Try Again
        </Link>
      </nav>
    </div>
  </div>
));

export default UserAlreadyExists;
