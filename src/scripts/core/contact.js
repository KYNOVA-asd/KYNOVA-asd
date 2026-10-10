import { portfolio } from "../data/portfolio.js";

export const createWhatsAppUrl = (message = "") => {
  const baseUrl = `https://wa.me/${portfolio.contact.whatsapp}`;
  return message ? `${baseUrl}?text=${encodeURIComponent(message)}` : baseUrl;
};
