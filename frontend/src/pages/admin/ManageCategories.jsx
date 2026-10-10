import { useEffect, useState } from "react";
import api from "../../api/api";
import { getImageUrl } from "../../utils/image";
import ImageUploadField from "../../components/ImageUploadField";

const empty = { title: "", image: null };

export default function ManageCategories() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);
  const [preview, setPreview] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = () => api.get("/categories").then((res) => setItems(res.data));
  useEffect(() => { load(); }, []);

  const resetForm = () => {
    setForm(empty);
    setEditingId(null);
    setPreview(null);
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    setForm((f) => ({ ...f, image: file }));
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append("title", form.title);
      if (form.image) fd.append("image", form.image);

      if (editingId) {
        await api.put(`/categories/${editingId}`, fd);
      } else {
        await api.post("/categories", fd);
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
    setForm({ title: item.title, image: null });
    setPreview(getImageUrl(item.image));
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this category?")) return;
    await api.delete(`/categories/${id}`);
    load();
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-ink mb-6">Manage Categories</h1>

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
            <ImageUploadField
              label="Image"
              previews={preview ? [preview] : []}
              onChange={handleFile}
              required={!editingId}
            />
          </div>
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
        {items.map((c) => (
          <div key={c._id} className="bg-white rounded-2xl p-4 ring-1 ring-primary/10 flex gap-4 items-center">
            <img src={getImageUrl(c.image)} alt={c.title} className="w-16 h-16 rounded-lg object-cover" />
            <div className="flex-1">
              <p className="font-medium text-ink">{c.title}</p>
            </div>
            <div className="flex flex-col gap-1 text-sm">
              <button onClick={() => handleEdit(c)} className="text-primary hover:text-gold-dark">Edit</button>
              <button onClick={() => handleDelete(c._id)} className="text-red-500 hover:text-red-700">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
