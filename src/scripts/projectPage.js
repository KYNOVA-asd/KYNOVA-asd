import { createElement, select, selectAll } from "./core/dom.js";
import { projects } from "./data/projects.js";

const state = {
  filter: "Todos",
  query: "",
};

const resolvePageImage = (image) => {
  if (image.startsWith("http")) return image;
  return `../${image.replace("./", "")}`;
};

const filteredProjects = () =>
  projects.filter((project) => {
    const filterMatches = state.filter === "Todos" || project.owner === state.filter;
    const haystack = [
      project.title,
      project.company,
      project.category,
      project.description,
      project.sector,
      project.duration,
      project.budget,
      project.deliverables,
      project.clientGoal,
      project.challenge,
      project.solution,
      project.result,
      project.owner,
      project.involvement,
      project.tags.join(" "),
    ]
      .join(" ")
      .toLowerCase();

    return filterMatches && haystack.includes(state.query.toLowerCase());
  });

const fillImage = (image, project, className) => {
  image.className = className;
  image.onerror = () => {
    image.onerror = null;
    image.src = project.fallbackImage;
  };
  image.src = resolvePageImage(project.image);
  image.alt = `Imagen de ${project.title}`;
};

const appendTags = (container, tags) => {
  tags.forEach((tag) => container.append(createElement("span", "tag", tag)));
};

const appendFacts = (container, facts) => {
  container.replaceChildren();
  facts
    .filter((fact) => fact.value)
    .forEach((fact) => {
      const item = createElement("div", "case-fact");
      item.append(createElement("span", "", fact.label));
      item.append(createElement("strong", "", fact.value));
      container.append(item);
    });
};

const appendSections = (container, sections) => {
  container.replaceChildren();
  sections
    .filter((section) => section.text)
    .forEach((section) => {
      const block = createElement("section", "case-section");
      block.append(createElement("h3", "", section.title));
      block.append(createElement("p", "", section.text));
      container.append(block);
    });
};

const openCase = (project) => {
  const modal = select("[data-case-modal]");
  const image = select("[data-case-image]");
  const area = select("[data-case-area]");
  const title = select("[data-case-title]");
  const company = select("[data-case-company]");
  const summary = select("[data-case-summary]");
  const facts = select("[data-case-facts]");
  const sections = select("[data-case-sections]");
  const bullets = select("[data-case-bullets]");
  const fit = select("[data-case-fit]");
  const note = select("[data-case-note]");
  const tags = select("[data-case-tags]");
  const link = select("[data-case-link]");

  if (
    !modal ||
    !image ||
    !area ||
    !title ||
    !company ||
    !summary ||
    !facts ||
    !sections ||
    !bullets ||
    !fit ||
    !note ||
    !tags ||
    !link
  )
    return;

  fillImage(image, project, "case-modal__image");
  area.textContent = project.involvement || project.owner;
  title.textContent = project.title;
  company.textContent = `${project.company} / ${project.category}`;
  summary.textContent = project.summary;
  fit.textContent = project.clientFit;
  note.textContent = project.confidentiality || "";
  link.href = project.link;
  link.textContent = project.link.includes("github.com") ? "Ver repositorio" : "Ver sitio";

  appendFacts(facts, [
    { label: "Sector", value: project.sector },
    { label: "Fecha", value: project.duration },
    { label: "Inversión", value: project.budget },
    { label: "Referencia", value: project.startedAt },
  ]);

  appendSections(sections, [
    { title: "Objetivo", text: project.clientGoal },
    { title: "Reto", text: project.challenge },
    { title: "Solución", text: project.solution },
    { title: "Resultado", text: project.result },
  ]);

  bullets.replaceChildren();
  project.details.forEach((item) => bullets.append(createElement("li", "", item)));

  tags.replaceChildren();
  appendTags(tags, project.tags);

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("has-modal");
};

const closeCase = () => {
  const modal = select("[data-case-modal]");
  modal?.classList.remove("is-open");
  modal?.setAttribute("aria-hidden", "true");
  document.body.classList.remove("has-modal");
};

const renderProjects = () => {
  const list = select("[data-project-list]");
  const count = select("[data-project-count]");
  const items = filteredProjects();

  if (!list || !count) return;

  list.replaceChildren();
  count.textContent = `${items.length} caso${items.length === 1 ? "" : "s"} disponibles`;

  if (items.length === 0) {
    list.append(createElement("p", "project-detail__empty", "No hay casos con esa busqueda."));
    return;
  }

  items.forEach((project) => {
    const card = createElement("article", "case-card");
    const image = createElement("img");
    const body = createElement("div", "case-card__body");
    const brand = createElement("div", "case-card__brand");
    const meta = createElement("div", "project-row__meta");
    const facts = createElement("div", "case-card__facts");
    const tags = createElement("div", "project-card__meta");
    const button = createElement("button", "button button--primary", "Ver caso");

    fillImage(image, project, "case-card__image");
    if (project.logo) {
      const logo = createElement("img", "case-card__logo");
      logo.src = resolvePageImage(project.logo);
      logo.alt = `Logo de ${project.company}`;
      brand.append(logo);
    }

    brand.append(createElement("span", "", project.company));
    meta.append(createElement("span", "", project.involvement || project.owner));
    meta.append(createElement("span", "", project.category));
    appendFacts(facts, [
      { label: "Sector", value: project.sector },
      { label: "Fecha", value: project.duration },
      { label: "Desde", value: project.budget },
    ]);
    appendTags(tags, project.tags);

    button.type = "button";
    button.addEventListener("click", () => openCase(project));

    body.append(brand);
    body.append(meta);
    body.append(createElement("h2", "", project.title));
    body.append(createElement("p", "", project.description));
    body.append(facts);
    body.append(tags);
    body.append(button);
    card.append(image, body);
    list.append(card);
  });
};

const setupControls = () => {
  selectAll("[data-project-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      state.filter = button.dataset.projectFilter;
      selectAll("[data-project-filter]").forEach((item) => item.classList.toggle("is-active", item === button));
      renderProjects();
    });
  });

  select("[data-project-search]")?.addEventListener("input", (event) => {
    state.query = event.target.value;
    renderProjects();
  });

  document.addEventListener("click", (event) => {
    if (event.target.matches("[data-case-close]")) closeCase();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeCase();
  });
};

setupControls();
renderProjects();
