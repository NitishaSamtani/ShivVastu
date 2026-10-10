import { useNavigate } from "react-router-dom";

/**
 * In-page back button. Browser/OS chrome (with its own back arrow) isn't
 * always present — e.g. on mobile web or when opened as a PWA/webview —
 * so detail pages need their own way back instead of relying on it.
 *
 * Uses browser history when we got here by clicking through the site;
 * falls back to a fixed route (e.g. the listing page) if this page was
 * opened directly, so the button is never a dead end.
 */
export default function BackButton({ fallback = "/", label = "Back" }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate(fallback);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-gold-dark mb-6"
    >
      <span aria-hidden>←</span> {label}
    </button>
  );
}
