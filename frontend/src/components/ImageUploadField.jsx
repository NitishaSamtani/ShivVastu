import { useId } from "react";

/**
 * Mobile-friendly image picker: a large tappable dropzone (not the tiny
 * native "Choose File" button) that shows the selected image(s) immediately,
 * whether picked from a phone's camera/gallery or a desktop file dialog.
 *
 * previews: array of image URLs to show (already resolved / blob URLs)
 * onChange: receives the raw FileList from the input
 */
export default function ImageUploadField({
  label,
  multiple = false,
  previews = [],
  onChange,
  required = false,
}) {
  const inputId = useId();
  const hasPreview = previews.length > 0;

  return (
    <div>
      <label className="block text-sm font-medium text-ink mb-1">{label}</label>

      <label
        htmlFor={inputId}
        className="flex flex-wrap gap-3 items-center rounded-xl border-2 border-dashed border-primary/25 bg-cream/60 px-4 py-4 cursor-pointer hover:border-gold hover:bg-cream transition-colors min-h-[76px]"
      >
        {hasPreview ? (
          <>
            {previews.map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                className="w-16 h-16 rounded-lg object-cover ring-1 ring-primary/20"
              />
            ))}
            <span className="text-xs font-medium text-primary ml-1">
              Tap to {multiple ? "change photos" : "change photo"}
            </span>
          </>
        ) : (
          <span className="flex items-center gap-2 text-sm text-ink/50">
            <span aria-hidden className="text-xl">📷</span>
            Tap to {multiple ? "upload photos" : "upload a photo"}
          </span>
        )}
      </label>

      <input
        id={inputId}
        type="file"
        accept="image/*"
        multiple={multiple}
        required={required}
        onChange={onChange}
        className="sr-only"
      />
    </div>
  );
}
