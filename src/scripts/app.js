import { portfolio } from "./data/portfolio.js";
import { createContactForm } from "./features/contactForm.js";
import { createNavigation } from "./features/navigation.js";
import { renderPortfolio } from "./features/renderPortfolio.js";
import { createInteractions } from "./features/interactions.js";
import { createCalendarBooking } from "./features/calendarBooking.js";

const bootstrap = () => {
  renderPortfolio(portfolio);
  createNavigation();
  createContactForm();
  createInteractions();
  createCalendarBooking();
};

bootstrap();
