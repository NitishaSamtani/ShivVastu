import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api/api";
import ProductCard from "../components/ProductCard";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCat = searchParams.get("cat") || "";

  useEffect(() => {
    api.get("/categories").then((res) => setCategories(res.data)).catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    api
      .get("/products", { params: selectedCat ? { category: selectedCat } : {} })
      .then((res) => setProducts(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [selectedCat]);

  const activeCategoryTitle = useMemo(
    () => categories.find((c) => c._id === selectedCat)?.title,
    [categories, selectedCat]
  );

  return (
    <div className="container-px py-12">
      <div className="mb-8">
        <p className="text-gold-dark text-xs uppercase tracking-widest mb-1">Catalog</p>
        <h1 className="text-3xl font-semibold text-ink">
          {activeCategoryTitle ? activeCategoryTitle : "All Categories"}
        </h1>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-10">
        <select
          value={selectedCat}
          onChange={(e) =>
            setSearchParams(e.target.value ? { cat: e.target.value } : {})
          }
          className="rounded-full border border-primary/20 bg-white px-5 py-2.5 text-sm font-medium text-ink focus:outline-none focus:ring-2 focus:ring-gold"
        >
          <option value="">Choose a Category</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.title}
            </option>
          ))}
        </select>

        {selectedCat && (
          <button
            onClick={() => setSearchParams({})}
            className="text-sm text-primary hover:text-gold-dark"
          >
            Clear filter ✕
          </button>
        )}
      </div>

      {loading ? (
        <p className="text-ink/50">Loading products…</p>
      ) : products.length === 0 ? (
        <p className="text-ink/50">No products found in this category yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
