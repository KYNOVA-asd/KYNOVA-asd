import { createElement, select } from "../core/dom.js";

const DATA_URL = new URL("../data/youtube-videos.json", import.meta.url);

const formatDate = (value) => new Intl.DateTimeFormat("es-MX", { day: "numeric", month: "short", year: "numeric" }).format(new Date(value));

const createPlayIcon = () => {
  const namespace = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(namespace, "svg");
  const path = document.createElementNS(namespace, "path");
  svg.setAttribute("viewBox", "0 0 24 24"); svg.setAttribute("width", "20"); svg.setAttribute("height", "20");
  svg.setAttribute("fill", "currentColor"); svg.setAttribute("aria-hidden", "true");
  path.setAttribute("d", "M8 5v14l11-7z"); svg.append(path);
  return svg;
};

const configureModal = () => {
  const modal = select("#video-modal");
  const frame = select("iframe", modal);
  const title = select("#video-modal-title", modal);
  const external = select(".video-modal__external", modal);
  const close = select(".video-modal__close", modal);
  let trigger = null;

  const closeModal = () => modal.close();
  close.addEventListener("click", closeModal);
  modal.addEventListener("click", (event) => { if (event.target === modal) closeModal(); });
  modal.addEventListener("close", () => { frame.src = "about:blank"; trigger?.focus(); });

  return (video, button) => {
    trigger = button;
    title.textContent = video.title;
    external.href = video.videoUrl;
    frame.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(video.id)}?autoplay=1&rel=0`;
    modal.showModal();
  };
};

const createVideoCard = (video, openModal) => {
  const article = createElement("article", "video-card");
  const button = createElement("button", "video-card__media");
  button.type = "button"; button.setAttribute("aria-label", `Reproducir: ${video.title}`);
  const image = createElement("img", "video-card__image");
  image.src = video.thumbnailUrl; image.alt = ""; image.loading = "lazy"; image.width = 480; image.height = 360;
  const play = createElement("span", "video-card__play"); play.append(createPlayIcon());
  button.append(image, play); button.addEventListener("click", () => openModal(video, button));
  const body = createElement("div", "video-card__body");
  body.append(createElement("p", "video-card__meta", `${video.category} · ${video.channelTitle} · ${formatDate(video.published)}`), createElement("h3", "video-card__title", video.title));
  article.append(button, body);
  return article;
};

export const renderShorts = async () => {
  const container = select("#youtube-videos");
  if (!container) return;
  container.replaceChildren(createElement("p", "news-grid__status", "Cargando videos..."));
  try {
    const response = await fetch(DATA_URL, { cache: "no-cache" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const payload = await response.json();
    const videos = Array.isArray(payload.items) ? payload.items : [];
    const openModal = configureModal();
    container.replaceChildren(...(videos.length ? videos.map((video) => createVideoCard(video, openModal)) : [createElement("p", "news-grid__status", "Próximamente agregaremos nuevos videos.")]));
  } catch (error) {
    console.warn("No fue posible cargar Tech & Mkt Shorts.", error);
    container.replaceChildren(createElement("p", "news-grid__status", "Los videos no están disponibles temporalmente."));
  } finally {
    container.setAttribute("aria-busy", "false");
  }
};
