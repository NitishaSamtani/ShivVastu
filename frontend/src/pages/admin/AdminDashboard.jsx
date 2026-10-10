import { NavLink, Outlet, useNavigate } from "react-router-dom";

const links = [
  { to: "/admin/dashboard/categories", label: "Categories" },
  { to: "/admin/dashboard/products", label: "Products" },
  { to: "/admin/dashboard/workshops", label: "Workshops" },
  { to: "/admin/dashboard/services", label: "Services" },
];

export default function AdminDashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("sv_admin_token");
    navigate("/admin/login");
  };

  const linkClass = ({ isActive }) =>
    `block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
      isActive ? "bg-gold text-ink" : "text-cream/80 hover:bg-white/10"
    }`;

  return (
    <div className="min-h-[85vh] grid md:grid-cols-[220px_1fr]">
      <aside className="bg-ink p-5 md:min-h-[85vh]">
        <div className="flex items-center gap-2 mb-6">
          <img src="/logo.png" alt="Shiv Vastu" className="w-8 h-8 object-contain" />
          <h2 className="font-brand text-2xl font-bold text-cream leading-none">Shiv Vastu</h2>
        </div>
        <nav className="space-y-1">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
        </nav>
        <button
          onClick={logout}
          className="mt-8 text-sm text-cream/60 hover:text-gold"
        >
          Log out
        </button>
      </aside>
      <main className="container-px py-8">
        <Outlet />
      </main>
    </div>
  );
}
