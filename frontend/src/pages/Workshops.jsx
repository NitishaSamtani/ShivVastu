import { useEffect, useState } from "react";
import api from "../api/api";
import WorkshopCard from "../components/WorkshopCard";

export default function Workshops() {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/workshops").then((res) => setWorkshops(res.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <div className="container-px py-12">
      <div className="mb-10">
        <p className="text-gold-dark text-xs uppercase tracking-widest mb-1">Learn & Grow</p>
        <h1 className="text-3xl font-semibold text-ink">Upcoming Workshops</h1>
      </div>

      {loading ? (
        <p className="text-ink/50">Loading workshops…</p>
      ) : workshops.length === 0 ? (
        <p className="text-ink/50">No workshops scheduled right now. Check back soon.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {workshops.map((w) => (
            <WorkshopCard key={w._id} workshop={w} />
          ))}
        </div>
      )}
    </div>
  );
}
