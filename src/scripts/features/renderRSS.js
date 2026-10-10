import { createElement, select, selectAll } from "../core/dom.js";

const DATA_URL = new URL("../data/rss-news.json", import.meta.url);
const editorialComments = {
  "Inteligencia Artificial": "La oportunidad no está en adoptar IA por moda, sino en integrarla donde mejore decisiones, atención o producción sin perder criterio humano.",
  Marketing: "Esta señal importa porque conecta tecnología y comportamiento. Conviene traducirla en una prueba concreta antes de convertirla en una tendencia de marca.",
  Desarrollo: "Más que una novedad técnica, evaluamos su impacto en rendimiento, mantenimiento y experiencia de usuario antes de incorporarla a un proyecto.",
  Tecnología: "La tecnología genera valor cuando resuelve una necesidad real. Esta noticia merece atención por lo que puede cambiar en productos y negocios digitales.",
};
const state = { news: [], filter: "Todas" };

const formatDate = (value) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "Fecha no disponible" : new Intl.DateTimeFormat("es-MX", { day: "numeric", month: "short", year: "numeric" }).format(date);
};

const createExternalIcon = () => {
  const namespace = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(namespace, "svg");
  const path = document.createElementNS(namespace, "path");
  Object.entries({ class: "news-card__external-icon", viewBox: "0 0 24 24", width: "16", height: "16", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", "aria-hidden": "true" }).forEach(([key, value]) => svg.setAttribute(key, value));
  path.setAttribute("d", "M14 3h7v7M10 14 21 3M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5");
  svg.append(path);
  return svg;
};

const createNewsLink = (item, label = "Leer en el medio") => {
  const link = createElement("a", "news-card__link", label);
  link.href = item.link; link.target = "_blank"; link.rel = "noopener noreferrer";
  link.append(createExternalIcon());
  return link;
};

const createNewsCard = (item) => {
  const article = createElement("article", "news-card");
  if (item.imageUrl) {
    const image = createElement("img", "news-card__image");
    image.src = item.imageUrl; image.alt = ""; image.loading = "lazy"; image.referrerPolicy = "no-referrer";
    article.append(image);
  }
  const footer = createElement("div", "news-card__footer");
  const date = createElement("time", "news-card__date", formatDate(item.published));
  date.dateTime = item.published;
  footer.append(date, createNewsLink(item));
  article.append(
    createElement("span", "news-card__source", `Vía ${item.source}`),
    createElement("span", "news-card__category", item.category),
    createElement("h3", "news-card__title", item.title),
    createElement("p", "news-card__excerpt", item.summary),
    footer,
  );
  return article;
};

const renderSelection = () => {
  const container = select("#kynova-selection");
  if (!container) return;
  const item = state.news[0];
  container.setAttribute("aria-busy", "false");
  if (!item) {
    container.replaceChildren(createElement("p", "news-grid__status", "La próxima selección editorial aparecerá después de actualizar el Radar."));
    return;
  }
  const article = createElement("article", "editorial-pick");
  const body = createElement("div", "editorial-pick__body");
  body.append(
    createElement("p", "editorial-pick__meta", `${item.category} · Vía ${item.source}`),
    createElement("h3", "editorial-pick__title", item.title),
    createElement("p", "editorial-pick__comment", editorialComments[item.category] || editorialComments.Tecnología),
    createNewsLink(item, "Leer noticia seleccionada"),
  );
  if (item.imageUrl) {
    const image = createElement("img", "editorial-pick__image");
    image.src = item.imageUrl; image.alt = ""; image.loading = "lazy"; image.referrerPolicy = "no-referrer";
    article.append(image);
  }
  article.append(body);
  container.replaceChildren(article);
};

const renderNews = () => {
  const container = select("#rss-news");
  if (!container) return;
  const visible = state.news.filter((item) => state.filter === "Todas" || item.source === state.filter || item.category === state.filter);
  container.setAttribute("aria-busy", "false");
  container.replaceChildren(...(visible.length ? visible.map(createNewsCard) : [createElement("p", "news-grid__status", "No hay noticias disponibles para este filtro.")]));
};

const bindFilters = () => selectAll("[data-rss-filter]").forEach((button) => button.addEventListener("click", () => {
  state.filter = button.dataset.rssFilter;
  selectAll("[data-rss-filter]").forEach((item) => {
    const active = item === button;
    item.classList.toggle("is-active", active); item.setAttribute("aria-pressed", String(active));
  });
  renderNews();
}));

export const renderRSS = async () => {
  const newsContainer = select("#rss-news");
  const selectionContainer = select("#kynova-selection");
  if (!newsContainer || !selectionContainer) return;
  newsContainer.replaceChildren(createElement("p", "news-grid__status", "Cargando Radar Tech..."));
  selectionContainer.replaceChildren(createElement("p", "news-grid__status", "Preparando la selección KYNOVA..."));
  try {
    const response = await fetch(DATA_URL, { cache: "no-cache" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const payload = await response.json();
    state.news = Array.isArray(payload.items) ? payload.items : [];
    bindFilters(); renderSelection(); renderNews();
  } catch (error) {
    console.warn("No fue posible cargar el Radar Tech.", error);
    newsContainer.replaceChildren(createElement("p", "news-grid__status", "El Radar Tech no está disponible temporalmente. Los artículos KYNOVA siguen accesibles."));
    selectionContainer.replaceChildren(createElement("p", "news-grid__status", "La selección editorial volverá con la próxima actualización."));
    newsContainer.setAttribute("aria-busy", "false"); selectionContainer.setAttribute("aria-busy", "false");
  }
};
