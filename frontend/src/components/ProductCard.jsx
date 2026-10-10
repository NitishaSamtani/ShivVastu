import { Link } from "react-router-dom";
import { getImageUrl } from "../utils/image";

export default function ProductCard({ product }) {
  return (
    <Link
      to={`/product/${product._id}`}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm ring-1 ring-primary/10 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
    >
      <div className="aspect-square overflow-hidden bg-sand">
        <img
          src={getImageUrl(product.images?.[0])}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-4">
        <p className="text-xs uppercase tracking-wide text-gold-dark font-medium">
          {product.category?.title}
        </p>
        <h3 className="font-display text-lg font-semibold text-ink mt-1 line-clamp-1">
          {product.title}
        </h3>
        <p className="text-primary font-semibold mt-1">₹{product.price}</p>
      </div>
    </Link>
  );
}
