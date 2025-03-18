import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//  Lazy-loaded components for better performance
const ThankYou = lazy(() => import("./components/pages/ThankYou"));
const UserAlreadyExists = lazy(
  () => import("./components/pages/UserAlreadyExists")
);
const RegistrationPage = lazy(
  () => import("./components/pages/RegistrationPage")
);

/**
 * 404 Not Found Page - Displays when a user navigates to an unknown route.
 */
const NotFound: React.FC = React.memo(() => (
  <div className="notfound-container">
    <h2>404 - Page Not Found</h2>
    <p>The page you're looking for doesn't exist.</p>
  </div>
));

/**
 * Main App Component - Handles routing and lazy loading.
 */
const App: React.FC = React.memo(() => (
  <Router>
    <Suspense fallback={<div className="loading">Loading...</div>}>
      <Routes>
        <Route path="/" element={<RegistrationPage />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/user-exists" element={<UserAlreadyExists />} />
        <Route path="*" element={<NotFound />} />{" "}
        {/*  Catches unknown routes */}
      </Routes>
    </Suspense>
  </Router>
));

export default App;
