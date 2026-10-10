import { Link } from "react-router-dom";
import { getImageUrl } from "../utils/image";

export default function CategoryCard({ category }) {
  return (
    <Link
      to={`/categories?cat=${category._id}`}
      className="group relative overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-primary/10 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
    >
      <div className="aspect-square overflow-hidden">
        <img
          src={getImageUrl(category.image)}
          alt={category.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-4">
        <h3 className="text-cream font-display text-xl font-semibold">{category.title}</h3>
      </div>
    </Link>
  );
}
