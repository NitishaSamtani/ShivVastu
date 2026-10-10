import { useEffect, useState } from "react";
import api from "../../api/api";
import { getImageUrl } from "../../utils/image";
import ImageUploadField from "../../components/ImageUploadField";

const empty = { title: "", description: "", eventAddress: "", eventTime: "", price: "", image: null };

export default function ManageWorkshops() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);
  const [preview, setPreview] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = () => api.get("/workshops").then((res) => setItems(res.data));
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
      fd.append("description", form.description);
      fd.append("eventAddress", form.eventAddress);
      fd.append("eventTime", form.eventTime);
      fd.append("price", form.price);
      if (form.image) fd.append("image", form.image);

      if (editingId) {
        await api.put(`/workshops/${editingId}`, fd);
      } else {
        await api.post("/workshops", fd);
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
      description: item.description,
      eventAddress: item.eventAddress,
      eventTime: item.eventTime ? new Date(item.eventTime).toISOString().slice(0, 16) : "",
      price: item.price,
      image: null,
    });
    setPreview(getImageUrl(item.image));
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this workshop?")) return;
    await api.delete(`/workshops/${id}`);
    load();
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-ink mb-6">Manage Workshops</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 ring-1 ring-primary/10 mb-8 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-ink mb-1">Title</label>
            <input required value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              className="w-full rounded-xl border border-primary/20 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold" />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-1">Event Address</label>
            <input required value={form.eventAddress} onChange={(e) => setForm((f) => ({ ...f, eventAddress: e.target.value }))}
              className="w-full rounded-xl border border-primary/20 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold" />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-1">Event Time</label>
            <input type="datetime-local" required value={form.eventTime} onChange={(e) => setForm((f) => ({ ...f, eventTime: e.target.value }))}
              className="w-full rounded-xl border border-primary/20 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold" />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-1">Price (₹)</label>
            <input type="number" required value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
              className="w-full rounded-xl border border-primary/20 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold" />
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

        <div>
          <label className="block text-sm font-medium text-ink mb-1">Description</label>
          <textarea required rows={3} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            className="w-full rounded-xl border border-primary/20 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold" />
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
        {items.map((w) => (
          <div key={w._id} className="bg-white rounded-2xl p-4 ring-1 ring-primary/10 flex gap-4 items-center">
            <img src={getImageUrl(w.image)} alt={w.title} className="w-16 h-16 rounded-lg object-cover" />
            <div className="flex-1">
              <p className="font-medium text-ink">{w.title}</p>
              <p className="text-xs text-ink/50">{new Date(w.eventTime).toLocaleDateString()} · ₹{w.price}</p>
            </div>
            <div className="flex flex-col gap-1 text-sm">
              <button onClick={() => handleEdit(w)} className="text-primary hover:text-gold-dark">Edit</button>
              <button onClick={() => handleDelete(w._id)} className="text-red-500 hover:text-red-700">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
