// Central HTTP client. Every API module builds on this — pages never call fetch directly.
//
// DEFAULT: relative "/api" path — Vite dev proxy forwards to http://localhost:5001.
// OVERRIDE: set VITE_API_URL in .env.local for a different base (e.g. production).
const BASE_URL = import.meta.env.VITE_API_URL ?? "/api";

/**
 * Make a JSON request to the backend.
 * @param {string} path        e.g. "/auth/login"
 * @param {object} options
 * @param {string} [options.method="GET"]
 * @param {object} [options.body]   plain object, serialized to JSON
 * @param {string} [options.token]  Bearer token; falls back to stored token
 * @returns {Promise<any>} parsed JSON response
 * @throws  {Error} with a user-friendly message on failure
 */
export async function apiRequest(path, { method = "GET", body, token } = {}) {
  const headers = { "Content-Type": "application/json" };
  const authToken = token ?? localStorage.getItem("token");
  if (authToken) headers.Authorization = `Bearer ${authToken}`;

  let res;
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch (networkErr) {
    // Network-level failure (backend unreachable, DNS failure, etc.)
    throw new Error(
      "Cannot reach the server. Please check your internet connection or try again later."
    );
  }

  // Parse response body (may be empty on some errors)
  let data = null;
  try {
    data = await res.json();
  } catch {
    // Non-JSON response — treat as generic server error
  }

  // Backend uses both `success` and the legacy `sucess` (typo) spelling.
  // A response is "ok" only when HTTP is 2xx AND backend signals success.
  const backendOk =
    data?.success !== false && data?.sucess !== false;

  if (!res.ok || !backendOk) {
    // Build the best possible user-facing message from whatever the backend sent.
    const serverMsg = data?.message || data?.error || null;
    const statusMsg = humanizeStatus(res.status, path);
    throw new Error(serverMsg || statusMsg);
  }

  return data;
}

/**
 * Convert a bare HTTP status code into a readable fallback message.
 */
function humanizeStatus(status, path) {
  const isAuth = path.includes("/auth/");
  switch (status) {
    case 400:
      return isAuth
        ? "Invalid request. Please check your inputs and try again."
        : "Bad request. Please verify your input.";
    case 401:
      return "Unauthorized. Please log in again.";
    case 403:
      return "You do not have permission to perform this action.";
    case 404:
      return "The requested resource was not found.";
    case 409:
      return "A user with this email already exists.";
    case 422:
      return "Validation failed. Please check your inputs.";
    case 429:
      return "Too many requests. Please wait a moment and try again.";
    case 500:
      return "Internal server error. Please try again later.";
    case 503:
      return "Service temporarily unavailable. Please try again later.";
    default:
      return `Request failed (HTTP ${status}). Please try again.`;
  }
}
