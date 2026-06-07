import { Navigate } from "react-router-dom";

import { isAuthenticated } from "../utils/auth";

// Wraps routes that require a logged-in user. Redirects to /login otherwise.
export default function ProtectedRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
}
