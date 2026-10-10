import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("sv_admin_token", res.data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-ink container-px">
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 w-full max-w-sm">
        <div className="flex items-center gap-2.5 mb-1">
          <img src="/logo.png" alt="Shiv Vastu" className="w-9 h-9 object-contain" />
          <h1 className="font-brand text-3xl font-bold text-ink leading-none">Shiv Vastu</h1>
        </div>
        <p className="text-sm text-ink/60 mb-6">Admin — sign in to manage your catalog.</p>

        {error && (
          <p className="mb-4 text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>
        )}

        <label className="block text-sm font-medium text-ink mb-1">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-primary/20 px-4 py-2.5 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-gold"
        />

        <label className="block text-sm font-medium text-ink mb-1">Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-xl border border-primary/20 px-4 py-2.5 text-sm mb-6 focus:outline-none focus:ring-2 focus:ring-gold"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-full bg-gold text-ink font-semibold hover:bg-gold-light transition-colors disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign In"}
        </button>
      </form>
    </div>
  );
}
