import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#440773] text-cream/80 mt-20">
      <div className="container-px py-12 grid gap-10 sm:grid-cols-3">
        <div>
          <h3 className="flex items-center gap-2 mb-2">
            <img src="/logo.png" alt="Shiv Vastu" className="w-9 h-9 object-contain" />
            <span className="font-brand text-3xl font-bold text-cream leading-none">Shiv Vastu</span>
          </h3>
          <p className="text-sm leading-relaxed">Your source to Goodluck.</p>
          <p className="text-sm mt-3 leading-relaxed">
            Authentic Shank, Anklets, Crystals, Bracelets, Shivling & Festive Vastu products —
            sourced and blessed with care.
          </p>
        </div>

        <div>
          <h4 className="text-gold font-medium mb-3 tracking-wide uppercase text-xs">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/categories" className="hover:text-gold">Categories</Link></li>
            <li><Link to="/workshops" className="hover:text-gold">Workshops</Link></li>
            <li><Link to="/services" className="hover:text-gold">Services</Link></li>
            <li><Link to="/contact" className="hover:text-gold">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-gold font-medium mb-3 tracking-wide uppercase text-xs">Get in touch</h4>
          <p className="text-sm">WhatsApp / Phone: +91 9320729594</p>
          <p className="text-sm mt-1">Email: shivvastu.19@gmail.com</p>
          <p className="text-sm mt-1">Mumbai, India</p>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-cream/60">
        © {new Date().getFullYear()} Shiv Vastu. All rights reserved.
      </div>
    </footer>
  );
}
