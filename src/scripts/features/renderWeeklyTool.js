import { createElement, select } from "../core/dom.js";
import { tools } from "../data/tools.js";

const getIsoWeek = (date = new Date()) => {
  const utc = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  utc.setUTCDate(utc.getUTCDate() + 4 - (utc.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(utc.getUTCFullYear(), 0, 1));
  const week = Math.ceil((((utc - yearStart) / 86400000) + 1) / 7);
  return `${utc.getUTCFullYear()}-W${String(week).padStart(2, "0")}`;
};

export const renderWeeklyTool = () => {
  const container = select("#weekly-tool");
  if (!container || !tools.length) return;
  const currentWeek = getIsoWeek();
  const fallbackIndex = Number(currentWeek.slice(-2)) % tools.length;
  const tool = tools.find((item) => item.featuredWeek === currentWeek) || tools[fallbackIndex];
  const card = createElement("article", "tool-card");
  const logo = createElement("img", "tool-card__logo");
  logo.src = tool.logo; logo.alt = `Logo de ${tool.name}`; logo.loading = "lazy"; logo.width = 72; logo.height = 72;
  const content = createElement("div", "tool-card__content");
  content.append(createElement("p", "tool-card__category", tool.category), createElement("h3", "tool-card__title", tool.name), createElement("p", "tool-card__description", tool.description));
  const use = createElement("p", "tool-card__use");
  const strong = createElement("strong", "", "Para qué nos sirve en KYNOVA: "); use.append(strong, document.createTextNode(tool.kynovaUse));
  const link = createElement("a", "button tool-card__link", "Probar herramienta");
  link.href = tool.url; link.target = "_blank"; link.rel = "noopener noreferrer";
  content.append(use, link); card.append(logo, content); container.replaceChildren(card);
};
