import { useEffect, useState } from "react";
import api from "../../api/api";
import { getImageUrl } from "../../utils/image";
import ImageUploadField from "../../components/ImageUploadField";

const empty = { title: "", category: "", price: "", description: "", images: [] };

export default function ManageProducts() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);
  const [previews, setPreviews] = useState([]);
  const [saving, setSaving] = useState(false);

  const load = () => api.get("/products").then((res) => setItems(res.data));
  useEffect(() => {
    load();
    api.get("/categories").then((res) => setCategories(res.data));
  }, []);

  const resetForm = () => {
    setForm(empty);
    setEditingId(null);
    setPreviews([]);
  };

  const handleFiles = (e) => {
    const files = Array.from(e.target.files);
    setForm((f) => ({ ...f, images: files }));
    setPreviews(files.map((f) => URL.createObjectURL(f)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("category", form.category);
      fd.append("price", form.price);
      fd.append("description", form.description);
      form.images.forEach((img) => fd.append("images", img));

      if (editingId) {
        await api.put(`/products/${editingId}`, fd);
      } else {
        await api.post("/products", fd);
      }
      resetForm();
      load();
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setForm({
      title: item.title,
      category: item.category?._id || "",
      price: item.price,
      description: item.description,
      images: [],
    });
    setPreviews((item.images || []).map(getImageUrl));
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    await api.delete(`/products/${id}`);
    load();
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-ink mb-6">Manage Products</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 ring-1 ring-primary/10 mb-8 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-ink mb-1">Title</label>
            <input
              required
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              className="w-full rounded-xl border border-primary/20 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-1">Category</label>
            <select
              required
              value={form.category}
              onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
              className="w-full rounded-xl border border-primary/20 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
            >
              <option value="">Select category</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>{c.title}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-1">Price (₹)</label>
            <input
              type="number"
              required
              value={form.price}
              onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
              className="w-full rounded-xl border border-primary/20 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>
          <div>
            <ImageUploadField
              label="Images (up to 5)"
              multiple
              previews={previews}
              onChange={handleFiles}
              required={!editingId}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-ink mb-1">Description</label>
          <textarea
            required
            rows={3}
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            className="w-full rounded-xl border border-primary/20 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>

        <div className="flex gap-2">
          <button disabled={saving} className="px-6 py-2.5 rounded-full bg-gold text-ink font-semibold hover:bg-gold-light disabled:opacity-60">
            {editingId ? "Update" : "Add"}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} className="px-4 py-2.5 rounded-full border border-primary/20 text-ink/70 text-sm">
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((p) => (
          <div key={p._id} className="bg-white rounded-2xl p-4 ring-1 ring-primary/10 flex gap-4 items-center">
            <img src={getImageUrl(p.images?.[0])} alt={p.title} className="w-16 h-16 rounded-lg object-cover" />
            <div className="flex-1">
              <p className="font-medium text-ink">{p.title}</p>
              <p className="text-xs text-ink/50">{p.category?.title} · ₹{p.price}</p>
            </div>
            <div className="flex flex-col gap-1 text-sm">
              <button onClick={() => handleEdit(p)} className="text-primary hover:text-gold-dark">Edit</button>
              <button onClick={() => handleDelete(p._id)} className="text-red-500 hover:text-red-700">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
