import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import { openWhatsAppEnquiry, buildWorkshopMessage } from "../utils/whatsapp";
import { getImageUrl } from "../utils/image";
import BackButton from "../components/BackButton";

export default function WorkshopDetail() {
  const { id } = useParams();
  const [workshop, setWorkshop] = useState(null);

  useEffect(() => {
    api.get(`/workshops/${id}`).then((res) => setWorkshop(res.data)).catch(() => {});
  }, [id]);

  if (!workshop) return <div className="container-px py-16 text-ink/50">Loading…</div>;

  return (
    <div className="container-px py-8 sm:py-12">
      <BackButton fallback="/workshops" label="Back to Workshops" />
      <div className="grid md:grid-cols-2 gap-10 items-start">
      <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-sand ring-1 ring-primary/10">
        <img src={getImageUrl(workshop.image)} alt={workshop.title} className="w-full h-full object-cover" />
      </div>

      <div>
        <h1 className="font-display text-3xl font-semibold text-ink">{workshop.title}</h1>
        <p className="text-ink/70 leading-relaxed mt-4">{workshop.description}</p>

        <div className="mt-6 space-y-2 text-sm text-ink/80">
          <p><span className="font-medium text-ink">📅 When: </span>
            {new Date(workshop.eventTime).toLocaleString(undefined, {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </p>
          <p><span className="font-medium text-ink">📍 Venue: </span>{workshop.eventAddress}</p>
          <p><span className="font-medium text-ink">💰 Price: </span>₹{workshop.price}</p>
        </div>

        <button
          onClick={() => openWhatsAppEnquiry(buildWorkshopMessage(workshop))}
          className="mt-8 w-full sm:w-auto px-8 py-3.5 rounded-full bg-gold text-ink font-semibold hover:bg-gold-light transition-colors"
        >
          Enquire to Book a Slot
        </button>
      </div>
      </div>
    </div>
  );
}
