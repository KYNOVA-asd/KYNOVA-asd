import { createElement, select, selectAll } from "../core/dom.js";

const RSS_API = "https://api.rss2json.com/v1/api.json?rss_url=";
const MAX_VISIBLE_NEWS = 9;
const sources = [
  { name: "Xataka", url: "https://feeds.weblogssl.com/xataka2" },
  { name: "Genbeta", url: "https://feeds.weblogssl.com/genbeta" },
  { name: "The Verge", url: "https://www.theverge.com/rss/index.xml" },
  { name: "Engadget", url: "https://www.engadget.com/rss.xml" },
];

const state = { news: [], filter: "Todas" };

const formatDate = (value) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Fecha no disponible";
  return new Intl.DateTimeFormat("es-MX", { day: "numeric", month: "short", year: "numeric" }).format(date);
};

const createExternalIcon = () => {
  const namespace = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(namespace, "svg");
  const path = document.createElementNS(namespace, "path");
  svg.setAttribute("class", "news-card__external-icon");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("width", "16");
  svg.setAttribute("height", "16");
  svg.setAttribute("fill", "none");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("stroke-width", "2");
  svg.setAttribute("stroke-linecap", "round");
  svg.setAttribute("stroke-linejoin", "round");
  svg.setAttribute("aria-hidden", "true");
  path.setAttribute("d", "M14 3h7v7M10 14 21 3M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5");
  svg.append(path);
  return svg;
};

const normalizeItem = (item, source) => ({
  title: item.title?.trim() || "Artículo sin título",
  link: item.link,
  date: item.pubDate || item.published || "",
  excerpt: item.description?.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim().slice(0, 180) || "Lee la nota completa en el medio original.",
  source,
});

const fetchFeed = async ({ name, url }) => {
  try {
    const response = await fetch(`${RSS_API}${encodeURIComponent(url)}`);
    if (!response.ok) throw new Error(`${name}: HTTP ${response.status}`);
    const data = await response.json();
    if (data.status !== "ok" || !Array.isArray(data.items)) throw new Error(`${name}: respuesta RSS inválida`);
    return data.items.map((item) => normalizeItem(item, name)).filter((item) => item.link);
  } catch (error) {
    console.warn("No fue posible cargar una fuente RSS.", error);
    return [];
  }
};

const createNewsCard = (item) => {
  const article = createElement("article", "news-card");
  const badge = createElement("span", "news-card__source", `Vía ${item.source}`);
  const title = createElement("h3", "news-card__title", item.title);
  const excerpt = createElement("p", "news-card__excerpt", item.excerpt);
  const footer = createElement("div", "news-card__footer");
  const date = createElement("time", "news-card__date", formatDate(item.date));
  const link = createElement("a", "news-card__link", "Leer en el medio");
  link.href = item.link;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.append(createExternalIcon());
  footer.append(date, link);
  article.append(badge, title, excerpt, footer);
  return article;
};

const renderLoading = (container) => {
  const status = createElement("p", "news-grid__status", "Cargando noticias...");
  container.replaceChildren(status);
};

const renderNews = () => {
  const container = select("#rss-news");
  if (!container) return;
  const visibleNews = state.news
    .filter((item) => state.filter === "Todas" || item.source === state.filter)
    .slice(0, MAX_VISIBLE_NEWS);

  container.setAttribute("aria-busy", "false");
  if (!visibleNews.length) {
    container.replaceChildren(createElement("p", "news-grid__status", "No hay noticias disponibles para esta fuente en este momento."));
    return;
  }
  container.replaceChildren(...visibleNews.map(createNewsCard));
};

const bindFilters = () => {
  selectAll("[data-rss-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      state.filter = button.dataset.rssFilter;
      selectAll("[data-rss-filter]").forEach((item) => {
        const active = item === button;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      renderNews();
    });
  });
};

export const renderRSS = async () => {
  const container = select("#rss-news");
  if (!container) return;
  renderLoading(container);
  const feeds = await Promise.all(sources.map(fetchFeed));
  state.news = feeds.flat().sort((a, b) => new Date(b.date) - new Date(a.date));
  bindFilters();
  renderNews();
};
