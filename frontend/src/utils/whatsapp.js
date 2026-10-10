// Central helper for building "click to enquire" WhatsApp deep links.
// Opens WhatsApp with the target number and a pre-filled message;
// user just taps Send inside WhatsApp to complete the enquiry.

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || "919320729594";

export const openWhatsAppEnquiry = (message) => {
  const encoded = encodeURIComponent(message);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
  window.open(url, "_blank", "noopener,noreferrer");
};

export const buildProductMessage = (product) =>
  `Namah Shivay Shiv Vastu Team, I'd like to enquire about this product:\n\n` +
  `*${product.title}*\n` +
  `Category: ${product.category?.title || ""}\n` +
  `Price: ₹${product.price}\n\n` +
  `Please share more details.`;

export const buildWorkshopMessage = (workshop) =>
  `Namah Shivay Shiv Vastu Team, I'd like to book a slot for this workshop:\n\n` +
  `*${workshop.title}*\n` +
  `Date & Time: ${new Date(workshop.eventTime).toLocaleString()}\n` +
  `Venue: ${workshop.eventAddress}\n` +
  `Price: ₹${workshop.price}\n\n` +
  `Please confirm availability for a slot.`;

export const buildServiceMessage = (service) =>
  `Namah Shivay Shiv Vastu Team, I'd like information about this service:\n\n` +
  `*${service.title}*\n\n` +
  `Please share more details.`;

export const buildBulkOrderMessage = () =>
  `Namah Shivay Shiv Vastu Team, I'm interested in placing a bulk order. Please share details on pricing and quantities.`;

export const buildGeneralEnquiryMessage = (name, message) =>
  `Namah Shivay Shiv Vastu Team, this is ${name || "a visitor from your website"}.\n\n${message || "I'd like more information."}`;
