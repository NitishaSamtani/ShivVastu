import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/api";
import { openWhatsAppEnquiry, buildProductMessage } from "../utils/whatsapp";
import { getImageUrl } from "../utils/image";
import BackButton from "../components/BackButton";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    api.get(`/products/${id}`).then((res) => setProduct(res.data)).catch(() => {});
  }, [id]);

  if (!product) return <div className="container-px py-16 text-ink/50">Loading…</div>;

  return (
    <div className="container-px py-8 sm:py-12">
      <BackButton fallback="/categories" label="Back to Categories" />
      <div className="grid md:grid-cols-2 gap-10 items-start">
      <div>
        <div className="aspect-square rounded-2xl overflow-hidden bg-sand ring-1 ring-primary/10">
          <img
            src={getImageUrl(product.images?.[activeImg])}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>
        {product.images?.length > 1 && (
          <div className="flex gap-3 mt-4">
            {product.images.map((img, i) => (
              <button
                key={img}
                onClick={() => setActiveImg(i)}
                className={`w-16 h-16 rounded-lg overflow-hidden ring-2 ${
                  i === activeImg ? "ring-gold" : "ring-transparent"
                }`}
              >
                <img src={getImageUrl(img)} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div>
        <Link to={`/categories?cat=${product.category?._id}`} className="text-xs uppercase tracking-widest text-gold-dark font-medium">
          {product.category?.title}
        </Link>
        <h1 className="font-display text-3xl font-semibold text-ink mt-2">{product.title}</h1>
        <p className="text-2xl text-primary font-semibold mt-3">₹{product.price}</p>
        <p className="text-ink/70 leading-relaxed mt-5">{product.description}</p>

        <button
          onClick={() => openWhatsAppEnquiry(buildProductMessage(product))}
          className="mt-8 w-full sm:w-auto px-8 py-3.5 rounded-full bg-gold text-ink font-semibold hover:bg-gold-light transition-colors"
        >
          Enquire Now on WhatsApp
        </button>
      </div>
      </div>
    </div>
  );
}
