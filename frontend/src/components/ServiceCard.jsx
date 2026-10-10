import { Link } from "react-router-dom";
import { getImageUrl } from "../utils/image";

export default function ServiceCard({ service }) {
  return (
    <Link
      to={`/services/${service._id}`}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm ring-1 ring-primary/10 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
    >
      <div className="aspect-[4/3] overflow-hidden bg-sand">
        <img
          src={getImageUrl(service.image)}
          alt={service.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-4">
        <h3 className="font-display text-lg font-semibold text-ink line-clamp-1">{service.title}</h3>
        <p className="text-sm text-ink/60 mt-1 line-clamp-2">{service.description}</p>
      </div>
    </Link>
  );
}
