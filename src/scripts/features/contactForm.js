import { select } from "../core/dom.js";
import { portfolio } from "../data/portfolio.js";

export const createContactForm = () => {
  const form = select("[data-contact-form]");
  const note = select("[data-form-note]");

  if (!form || !note) {
    return;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = data.get("name")?.toString().trim() || "Cliente";
    const message = data.get("message")?.toString().trim().slice(0, 40) || "cotizar un proyecto";
    const whatsappMessage = encodeURIComponent(`Hola, soy ${name}. Me gustaría cotizar: ${message}`);

    window.open(`https://wa.me/${portfolio.contact.whatsapp}?text=${whatsappMessage}`, "_blank", "noreferrer");
    note.textContent = `Listo, ${name}. Se abrió WhatsApp.`;
    form.reset();
  });
};
