import { useState } from "react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Home" },
  { to: "/categories", label: "Categories" },
  { to: "/workshops", label: "Workshops" },
  { to: "/services", label: "Services" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `relative py-1 transition-colors duration-300 ${
      isActive
        ? "text-[#F79428]"
        : "text-[#351070] hover:text-[#F79428]"
    }`;

  return (
    <header className="relative z-50 bg-[#FAF8F0] border-b border-[#E8C96A]/40 shadow-[0_4px_15px_rgba(53,16,112,0.12)]">

      {/* Main Navbar */}
      <nav className="container-px h-[72px] flex items-center justify-between">

        {/* Logo */}
        <NavLink
          to="/"
          className="flex items-center gap-3 shrink-0"
          onClick={() => setOpen(false)}
        >
          {/* Replace this with your actual logo image if you have one */}
          <div className="w-11 h-11 flex items-center justify-center">
            <img
              src="/tlogo.jpeg"
              alt="Shiv Vastu"
              className="w-full h-full object-contain"
            />
          </div>

          <span
            className="
              font-display
              text-3xl
              sm:text-[32px]
              text-[#351070]
              leading-none
            "
          >
            Shiv Vastu
          </span>
        </NavLink>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 font-medium text-sm tracking-wide">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink to={l.to} className={linkClass}>
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Mobile Hamburger */}
        <button
          type="button"
          className="
            md:hidden
            flex items-center justify-center
            w-10 h-10
            text-[#F79428]
            hover:text-[#351070]
            transition-colors duration-300
            focus:outline-none
          "
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? (
            <span className="text-3xl font-light leading-none">
              ×
            </span>
          ) : (
            <span className="flex flex-col gap-[5px]">
              <span className="block w-6 h-[2px] bg-[#F79428] rounded-full" />
              <span className="block w-6 h-[2px] bg-[#F79428] rounded-full" />
              <span className="block w-6 h-[2px] bg-[#F79428] rounded-full" />
            </span>
          )}
        </button>

      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-[#FAF8F0] border-t border-[#E8C96A]/40 shadow-md">

          <ul className="flex flex-col px-5 py-3">

            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `
                    block
                    py-3
                    text-base
                    font-medium
                    transition-colors duration-300
                    border-b border-[#351070]/10
                    ${
                      isActive
                        ? "text-[#F79428]"
                        : "text-[#351070] hover:text-[#F79428]"
                    }
                    `
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}

          </ul>

        </div>
      )}

    </header>
  );
}