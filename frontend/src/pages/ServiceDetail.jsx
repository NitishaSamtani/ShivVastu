import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import { openWhatsAppEnquiry, buildServiceMessage } from "../utils/whatsapp";
import { getImageUrl } from "../utils/image";
import BackButton from "../components/BackButton";

export default function ServiceDetail() {
  const { id } = useParams();
  const [service, setService] = useState(null);

  useEffect(() => {
    api.get(`/services/${id}`).then((res) => setService(res.data)).catch(() => {});
  }, [id]);

  if (!service) return <div className="container-px py-16 text-ink/50">Loading…</div>;

  return (
    <div className="container-px py-8 sm:py-12">
      <BackButton fallback="/services" label="Back to Services" />
      <div className="grid md:grid-cols-2 gap-10 items-start">
      <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-sand ring-1 ring-primary/10">
        <img src={getImageUrl(service.image)} alt={service.title} className="w-full h-full object-cover" />
      </div>

      <div>
        <h1 className="font-display text-3xl font-semibold text-ink">{service.title}</h1>
        <p className="text-ink/70 leading-relaxed mt-4">{service.description}</p>

        <button
          onClick={() => openWhatsAppEnquiry(buildServiceMessage(service))}
          className="mt-8 w-full sm:w-auto px-8 py-3.5 rounded-full bg-gold text-ink font-semibold hover:bg-gold-light transition-colors"
        >
          Enquire Now
        </button>
      </div>
      </div>
    </div>
  );
}
