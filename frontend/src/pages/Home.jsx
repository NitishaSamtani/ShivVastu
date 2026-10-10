import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";
import CategoryCard from "../components/CategoryCard";
import { openWhatsAppEnquiry, buildBulkOrderMessage } from "../utils/whatsapp";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    api.get("/categories").then((res) => setCategories(res.data)).catch(() => {});
    api.get("/products").then((res) => setProductCount(res.data.length)).catch(() => {});
  }, []);

  return (
    <div>
      {/* Card 1: Hero */}
     {/* Card 1: Hero */}
<section className="container-px py-8 sm:py-12">
  <div
    className="
      relative overflow-hidden
      rounded-[28px]
      border border-[#E8C96A]
      bg-[#e3d388]
      px-6 py-10
      sm:px-10 sm:py-14
      lg:px-16 lg:py-16
      shadow-[0_10px_35px_rgba(53,16,112,0.08)]
    "
  >

    {/* Decorative glow */}
    <div
      className="
        absolute -top-24 -right-24
        h-64 w-64
        rounded-full
        bg-[#F79428]/10
        blur-3xl
      "
    />

    <div
      className="
        absolute -bottom-24 -left-24
        h-64 w-64
        rounded-full
        bg-[#351070]/10
        blur-3xl
      "
    />

    {/* Decorative stars */}
    <div className="absolute top-7 right-8 text-[#F79428]/40 text-xl">
      ✦
    </div>

    <div className="absolute bottom-8 left-8 text-[#F79428]/30 text-lg">
      ✦
    </div>

    <div className="relative max-w-3xl">

      {/* Small heading */}
      <p className="text-[#6B3A91] text-xs uppercase tracking-[0.28em] font-medium mb-5">
        ✦ A Divine Collection
      </p>

      {/* Main heading */}
      <h1
        className="
          font-display
          text-4xl sm:text-5xl lg:text-6xl
          leading-[1.08]
          font-medium
          text-[#351070]
          max-w-2xl
        "
      >
        Sacred pieces to
        <br />
        bless every corner
        <br />
        of home.
      </h1>

      {/* Description */}
      <div className="flex gap-3 mt-7 max-w-xl">
        <span className="text-[#F79428] text-2xl leading-none">
          ❯
        </span>

        <p className="text-[#5B514D] text-sm sm:text-base leading-7 italic">
          "Where devotion meets design — each item is a whisper of the divine,
          chosen to invite peace, prosperity and grace."
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-4 mt-8">

        <Link
          to="/categories"
          className="
            inline-flex items-center gap-2
            px-7 py-3.5
            rounded-full
            bg-[#F79428]
            text-white
            font-semibold
            shadow-md shadow-[#F79428]/20
            hover:bg-[#E98319]
            hover:shadow-lg
            transition-all duration-300
          "
        >
          Explore Categories
          <span>→</span>
        </Link>

        <Link
          to="/contact"
          className="
            inline-flex items-center
            px-7 py-3.5
            rounded-full
            border border-[#351070]
            text-[#351070]
            font-medium
            bg-transparent
            hover:bg-[#351070]
            hover:text-[#FFFBEA]
            transition-all duration-300
          "
        >
          Enquire Now
        </Link>

      </div>

      {/* Stats */}
      <div
        className="
          grid grid-cols-3
          max-w-md
          gap-4 sm:gap-6
          mt-12
          pt-7
          border-t border-[#E8C96A]/50
        "
      >

        <div>
          <p className="font-display text-2xl sm:text-3xl font-semibold text-[#351070]">
            {productCount}+
          </p>
          <p className="text-[10px] sm:text-xs uppercase tracking-widest text-[#6B3A91] mt-1">
            Products
          </p>
        </div>

        <div>
          <p className="font-display text-2xl sm:text-3xl font-semibold text-[#351070]">
            {categories.length}
          </p>
          <p className="text-[10px] sm:text-xs uppercase tracking-widest text-[#6B3A91] mt-1">
            Categories
          </p>
        </div>

        <div>
          <p className="font-display text-2xl sm:text-3xl font-semibold text-[#351070]">
            100%
          </p>
          <p className="text-[10px] sm:text-xs uppercase tracking-widest text-[#6B3A91] mt-1">
            Authentic
          </p>
        </div>

      </div>

    </div>
  </div>
</section>

      {/* Card 2: Browse by category */}
      <section className="container-px py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-gold-dark text-xs uppercase tracking-widest mb-1">Browse</p>
            <h2 className="text-3xl font-semibold text-ink">Shop by Category</h2>
          </div>
          <Link to="/categories" className="text-primary font-medium hover:text-gold-dark text-sm">
            View all →
          </Link>
        </div>

        {categories.length === 0 ? (
          <p className="text-ink/50">Categories will appear here once added from the Admin panel.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
            {categories.map((c) => (
              <CategoryCard key={c._id} category={c} />
            ))}
          </div>
        )}
      </section>

      {/* Card 3: Bulk orders */}
      <section className="bg-[#440773]">
        <div className="container-px py-14 flex flex-col rounded-full sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl font-semibold text-cream font-display">
              Planning a Bulk Order?
            </h2>
            <p className="text-cream/70 mt-2 max-w-lg">
              Gifting, events, or reselling — get special pricing for bulk purchases across our
              entire catalog.
            </p>
          </div>
          <button
            onClick={() => openWhatsAppEnquiry(buildBulkOrderMessage())}
            className="shrink-0 px-7 py-3 rounded-full bg-[#F79428] text-ink font-semibold hover:bg-[#E98319] transition-colors"
          >
            Enquire on WhatsApp
          </button>
        </div>
      </section>

      {/* Card 4: Why choose us */}
      <section className="container-px py-16">
        <div className="text-center mb-10">
          <p className="text-gold-dark text-xs uppercase tracking-widest mb-1">Why Shiv Vastu</p>
          <h2 className="text-3xl font-semibold text-ink">Chosen for Trust, Made with Care</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: "✦", title: "100% Authentic", desc: "Every product sourced and verified for genuine quality." },
            { icon: "🛡", title: "Safe & Blessed", desc: "Handled with traditional care from source to doorstep." },
            { icon: "💬", title: "Personal Guidance", desc: "Enquire directly on WhatsApp for tailored advice." },
            { icon: "🌙", title: "Vastu Expertise", desc: "Curated by practitioners who understand true Vastu Shastra." },
          ].map((f) => (
            <div key={f.title} className="bg-white rounded-2xl p-6 ring-1 ring-primary/10 text-center">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-display text-lg font-semibold text-ink">{f.title}</h3>
              <p className="text-sm text-ink/60 mt-2">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
