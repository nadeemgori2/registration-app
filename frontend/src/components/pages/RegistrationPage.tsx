import React from "react";
import RegistrationForm from "../common/RegistrationForm";

/**
 * Tooltip Component for displaying disabled links with a message.
 */
const TooltipItem: React.FC<{ label: string }> = React.memo(({ label }) => (
  <div className="tooltip-container">
    <button
      className="text-light disabled-link"
      aria-describedby={`${label}-tooltip`}
    >
      {label}
    </button>
    <span id={`${label}-tooltip`} className="tooltip-text" role="tooltip">
      This functionality is not available for now.
    </span>
  </div>
));

/**
 * Signup Page Header Component.
 */
const SignupHeader: React.FC = React.memo(() => (
  <header className="signup-header text-center">
    <h2 className="h4">Signup</h2>
    <p>Just some details to get you in.!</p>
  </header>
));

/**
 * Signup Page Footer Component with tooltips for navigation links.
 */
const SignupFooter: React.FC = React.memo(() => (
  <footer className="signup-footer text-center mt-4">
    <div className="already-registered">
      <span>Already Registered? </span>
      <TooltipItem label="Login" />
    </div>
    <div className="footer-links d-flex flex-column flex-sm-row justify-content-between mt-2">
      <TooltipItem label="Terms & Conditions" />
      <TooltipItem label="Support" />
      <TooltipItem label="Customer Care" />
    </div>
  </footer>
));

/**
 * Left Section of the Signup Page (Marketing Message & Skip Button).
 */
const SignupLeftSection: React.FC = React.memo(() => (
  <section className="signup-left col-12 col-md-6 d-flex flex-column align-items-center align-items-md-start justify-content-center text-center text-md-start px-3">
    <h1 className="display-4 text-white fw-semibold">Roll the Carpet.!</h1>
    <button className="skip-btn btn btn-outline-light mt-3">
      Skip the lag?
    </button>
    <div className="dotted-line"></div>
  </section>
));

/**
 * Registration Page Component with structured layout.
 */
const RegistrationPage: React.FC = () => (
  <main className="signup-container container-fluid d-flex flex-column flex-md-row justify-content-center align-items-center">
    {/* 🔵 Dynamically Render 10 Animated Circles */}
    {[...Array(10)].map((_, i) => (
      <div key={i} className={`circle circle-${i + 1}`}></div>
    ))}
    <div className="signup-wrapper row w-100">
      <SignupLeftSection />

      {/* Right Section (Form) */}
      <section className="signup-right col-12 col-md-6 d-flex align-items-center justify-content-center">
        {/* Signup Card */}
        <div className="signup-card card shadow-lg p-4 text-white mx-3 mx-md-0">
          <SignupHeader />

          {/* Registration Form */}
          <div className="signup-form mt-4">
            <RegistrationForm />
          </div>

          <SignupFooter />
        </div>
      </section>
    </div>
  </main>
);

export default React.memo(RegistrationPage);
