import { createElement } from "../core/dom.js";

const appendText = (parent, tag, className, text) => {
  const node = createElement(tag, className, text);
  parent.append(node);
  return node;
};

const createHeartIcon = () => {
  const namespace = "http://www.w3.org/2000/svg";
  const icon = document.createElementNS(namespace, "svg");
  const path = document.createElementNS(namespace, "path");
  icon.setAttribute("class", "icon-svg insta-feed__post-icon");
  icon.setAttribute("width", "20");
  icon.setAttribute("height", "20");
  icon.setAttribute("viewBox", "0 0 24 24");
  icon.setAttribute("fill", "none");
  icon.setAttribute("stroke", "currentColor");
  icon.setAttribute("stroke-width", "2");
  icon.setAttribute("stroke-linecap", "round");
  icon.setAttribute("stroke-linejoin", "round");
  icon.setAttribute("aria-hidden", "true");
  icon.setAttribute("focusable", "false");
  path.setAttribute("d", "M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z");
  icon.append(path);
  return icon;
};

const renderStats = (container, postCount) => {
  const stats = createElement("dl", "insta-feed__stats");
  const entries = [
    [String(postCount), "Publicaciones"],
    ["No público", "Seguidores"],
  ];
  entries.forEach(([value, label]) => {
    const item = createElement("div", "insta-feed__stat");
    appendText(item, "dt", "insta-feed__stat-value", value);
    appendText(item, "dd", "insta-feed__stat-label", label);
    stats.append(item);
  });
  container.append(stats);
};

const renderPost = (project, post, resolveImage, onOpen) => {
  const button = createElement("button", "insta-feed__post");
  const image = createElement("img", "insta-feed__post-image");
  const overlay = createElement("span", "insta-feed__post-overlay");
  const badge = createElement("span", "insta-feed__post-badge", "Ver estrategia");
  const metrics = Object.entries(post.kpis || {});

  button.type = "button";
  button.setAttribute("aria-label", `Abrir estrategia de ${project.title}: ${post.copy}`);
  image.src = resolveImage(post.image || project.image);
  image.alt = `Publicación del caso ${project.title}`;
  image.onerror = () => {
    image.onerror = null;
    image.src = project.fallbackImage;
  };

  overlay.append(createHeartIcon());
  overlay.append(badge);
  appendText(
    overlay,
    "span",
    "insta-feed__post-kpi",
    metrics.length ? metrics.map(([label, value]) => `${label}: ${value}`).join(" · ") : "KPIs por documentar",
  );
  button.append(image, overlay);
  button.addEventListener("click", () => onOpen(project, post));
  return button;
};

const renderProfile = (project, resolveImage, onOpen) => {
  const profile = project.instagram;
  const feed = createElement("article", "insta-feed");
  const header = createElement("header", "insta-feed__header");
  const avatar = createElement("img", "insta-feed__avatar");
  const identity = createElement("div", "insta-feed__identity");
  const actions = createElement("div", "insta-feed__actions");

  avatar.src = resolveImage(project.logo || project.image);
  avatar.alt = `Identidad visual de ${project.company}`;
  avatar.onerror = () => { avatar.src = project.fallbackImage; };
  appendText(identity, "p", "insta-feed__handle", profile.handle);
  appendText(identity, "p", "insta-feed__name", project.company);
  renderStats(identity, profile.posts.length);
  appendText(identity, "p", "insta-feed__bio", profile.bio);
  const link = appendText(identity, "a", "insta-feed__link", "Ver proyecto");
  link.href = profile.link;
  link.target = "_blank";
  link.rel = "noopener noreferrer";

  ["Seguir", "Mensaje"].forEach((label) => {
    const action = createElement("button", "insta-feed__action", label);
    action.type = "button";
    action.disabled = true;
    action.title = "Vista demostrativa";
    actions.append(action);
  });
  header.append(avatar, identity, actions);

  const highlights = createElement("div", "insta-feed__highlights");
  profile.highlights.forEach((highlight) => {
    const item = createElement("span", "insta-feed__highlight");
    appendText(item, "span", "insta-feed__highlight-ring", highlight.slice(0, 1));
    appendText(item, "span", "insta-feed__highlight-label", highlight);
    highlights.append(item);
  });

  const grid = createElement("div", "insta-feed__grid");
  profile.posts.forEach((post) => grid.append(renderPost(project, post, resolveImage, onOpen)));
  feed.append(header, highlights, grid);
  return feed;
};

export const renderInstagramFeed = ({ container, projects, resolveImage, onOpen }) => {
  if (!container) return;
  const cases = projects.filter((project) => project.instagram?.posts?.length);
  container.replaceChildren(...cases.map((project) => renderProfile(project, resolveImage, onOpen)));
  container.hidden = cases.length === 0;
};
