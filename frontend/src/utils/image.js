// Backend stores uploaded image paths as relative, e.g. "/uploads/abc123.jpg".
// The frontend and backend run on different origins (e.g. :5173 vs :5000),
// so a relative <img src="/uploads/..."> resolves against the FRONTEND's own
// origin and 404s. This helper turns a relative path into an absolute URL
// pointing at the backend, derived from VITE_API_URL.

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
// Strip a trailing "/api" (or "/api/") to get the backend's origin/root.
const SERVER_ORIGIN = API_URL.replace(/\/api\/?$/, "");

export const getImageUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("blob:")) {
    return path;
  }
  return `${SERVER_ORIGIN}${path.startsWith("/") ? "" : "/"}${path}`;
};
