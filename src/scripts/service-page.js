import { createNavigation } from "./features/navigation.js";
import { createInteractions } from "./features/interactions.js";
import { createContactForm } from "./features/contactForm.js";
import { createCalendarBooking } from "./features/calendarBooking.js";
import { renderContactLinks } from "./features/renderPortfolio.js";
import { portfolio } from "./data/portfolio.js";

document.querySelectorAll("[data-current-year]").forEach((node) => { node.textContent = new Date().getFullYear(); });
renderContactLinks(portfolio.contact);
createContactForm();
createCalendarBooking();
createNavigation();
createInteractions();
