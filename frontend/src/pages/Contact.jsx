import { useState } from "react";
import { openWhatsAppEnquiry, buildGeneralEnquiryMessage } from "../utils/whatsapp";

export default function Contact() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    openWhatsAppEnquiry(buildGeneralEnquiryMessage(name, message));
  };

  return (
    <div className="container-px py-12">
      <div className="grid md:grid-cols-2 gap-10">
        {/* Card 1: Get in touch */}
        <div className="bg-white rounded-2xl p-8 ring-1 ring-primary/10">
          <p className="text-gold-dark text-xs uppercase tracking-widest mb-1">Reach Us</p>
          <h2 className="font-display text-2xl font-semibold text-ink mb-4">Get in Touch</h2>
          <ul className="space-y-3 text-ink/80 text-sm">
            <li>📞 +91 9320729594</li>
            <li>✉️ shivvastu.19@gmail.com</li>
            <li>📍 Mumbai, Maharashtra, India</li>
            <li>🕐 Mon–Sat, 10:00 AM – 7:00 PM</li>
          </ul>
        </div>

        {/* Card 2: Enquire now */}
        <div className="bg-white rounded-2xl p-8 ring-1 ring-primary/10">
          <p className="text-gold-dark text-xs uppercase tracking-widest mb-1">Have a question?</p>
          <h2 className="font-display text-2xl font-semibold text-ink mb-4">Enquire Now</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-primary/20 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
            />
            <textarea
              placeholder="What would you like to know?"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full rounded-xl border border-primary/20 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
            />
            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-gold text-ink font-semibold hover:bg-gold-light transition-colors"
            >
              Send via WhatsApp
            </button>
          </form>
        </div>
      </div>

      {/* Card 3: What happens next */}
      <div className="mt-10 bg-[#440773] rounded-2xl p-8 text-cream">
        <h2 className="font-display text-2xl font-semibold mb-6">What Happens Next?</h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { step: "1", title: "You reach out", desc: "Via WhatsApp, phone or the form above." },
            { step: "2", title: "We respond", desc: "Our team replies with guidance, usually within a few hours." },
            { step: "3", title: "You're sorted", desc: "Get your product, workshop slot, or service confirmed." },
          ].map((s) => (
            <div key={s.step}>
              <span className="text-gold font-display text-3xl font-semibold">{s.step}</span>
              <h3 className="font-medium mt-2">{s.title}</h3>
              <p className="text-cream/70 text-sm mt-1">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
