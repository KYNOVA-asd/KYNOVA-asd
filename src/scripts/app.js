import { portfolio } from "./data/portfolio.js";
import { createContactForm } from "./features/contactForm.js";
import { createNavigation } from "./features/navigation.js";
import { renderPortfolio } from "./features/renderPortfolio.js";

const bootstrap = () => {
  renderPortfolio(portfolio);
  createNavigation();
  createContactForm();
};

bootstrap();
