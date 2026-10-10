import { useEffect, useState } from "react";
import api from "../api/api";
import ServiceCard from "../components/ServiceCard";

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/services").then((res) => setServices(res.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <div className="container-px py-12">
      <div className="mb-10">
        <p className="text-gold-dark text-xs uppercase tracking-widest mb-1">What We Offer</p>
        <h1 className="text-3xl font-semibold text-ink">Our Services</h1>
      </div>

      {loading ? (
        <p className="text-ink/50">Loading services…</p>
      ) : services.length === 0 ? (
        <p className="text-ink/50">Services will appear here once added from the Admin panel.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {services.map((s) => (
            <ServiceCard key={s._id} service={s} />
          ))}
        </div>
      )}
    </div>
  );
}
