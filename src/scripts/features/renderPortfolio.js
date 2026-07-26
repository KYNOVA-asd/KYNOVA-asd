import { createElement, select } from "../core/dom.js";

const appendTags = (container, tags = []) => {
  tags.forEach((tag) => {
    container.append(createElement("span", "tag", tag));
  });
};

const openProjectModal = (project) => {
  const modal = select("[data-project-modal]");
  const image = select("[data-modal-image]");
  const title = select("[data-modal-title]");
  const category = select("[data-modal-category]");
  const description = select("[data-modal-description]");
  const details = select("[data-modal-details]");
  const fit = select("[data-modal-fit]");
  const note = select("[data-modal-note]");
  const tags = select("[data-modal-tags]");
  const link = select("[data-modal-link]");
  const site = select("[data-modal-site]");

  if (!modal || !image || !title || !category || !description || !details || !fit || !note || !tags || !link || !site) {
    return;
  }

  image.onerror = () => {
    image.onerror = null;
    image.src = project.fallbackImage;
  };
  image.src = project.image;
  image.alt = `Vista previa de ${project.title}`;
  title.textContent = project.title;
  category.textContent = project.involvement || project.category;
  description.textContent = project.summary || project.description;
  fit.textContent = project.clientFit || "";
  note.textContent = project.confidentiality || "";
  link.href = project.link;
  link.textContent = "Ver repositorio";
  if (project.siteLink) {
    site.href = project.siteLink;
    site.hidden = false;
  } else {
    site.hidden = true;
    site.removeAttribute("href");
  }
  details.replaceChildren();
  tags.replaceChildren();
  project.details.forEach((item) => {
    details.append(createElement("li", "", item));
  });
  appendTags(tags, project.tags);

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("has-modal");
};

const closeProjectModal = () => {
  const modal = select("[data-project-modal]");

  if (!modal) {
    return;
  }

  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("has-modal");
};

const renderContactLinks = (contact) => {
  const container = select("[data-contact-links]");

  if (!container) {
    return;
  }

  const links = [
    {
      label: "GitHub",
      href: contact.github,
    },
    {
      label: "WhatsApp",
      href: `https://wa.me/${contact.whatsapp}`,
    },
  ];

  links.forEach((item) => {
    const link = createElement("a", "contact-link", item.label);
    link.href = item.href;
    link.target = "_blank";
    link.rel = "noreferrer";
    container.append(link);
  });
};

export const renderPortfolio = ({ contact, stats, projects, services, skills }) => {
  const statsContainer = select("[data-stats]");
  const projectsContainer = select("[data-projects]");
  const servicesContainer = select("[data-services]");
  const skillsContainer = select("[data-skills]");

  stats.forEach((item) => {
    const card = createElement("article", "stat");
    card.append(createElement("strong", "", item.value));
    card.append(createElement("span", "", item.label));
    statsContainer.append(card);
  });

  projects.slice(0, 3).forEach((project) => {
    const card = createElement("article", "project-card");
    const image = createElement("img", "project-card__image");
    const body = createElement("div", "project-card__body");
    const meta = createElement("div", "project-card__meta");
    const actions = createElement("div", "project-card__actions");
  const detailsButton = createElement("button", "button button--primary", "Ver caso");

    card.style.setProperty("--card-accent", project.accent);
    image.onerror = () => {
      image.onerror = null;
      image.src = project.fallbackImage;
    };
    image.src = project.image;
    image.alt = `Vista previa de ${project.title}`;
    detailsButton.type = "button";
    detailsButton.addEventListener("click", () => openProjectModal(project));

    body.append(createElement("span", "project-card__category", project.involvement || project.category));
    body.append(createElement("h3", "", project.title));
    body.append(createElement("p", "", project.description));
    appendTags(meta, project.tags);
    actions.append(detailsButton);
    body.append(meta, actions);
    card.append(image, body);
    projectsContainer.append(card);
  });

  services.forEach((service) => {
    const card = createElement("article", "service-card");
    card.append(createElement("h3", "", service.title));
    card.append(createElement("p", "", service.description));
    servicesContainer.append(card);
  });

  skills.forEach((skill) => {
    const card = createElement("article", "skill-card");
    const tags = createElement("div", "skill-card__tags");

    card.append(createElement("span", "skill-card__icon", skill.icon));
    card.append(createElement("h3", "", skill.title));
    card.append(createElement("p", "", skill.description));
    appendTags(tags, skill.tags);
    card.append(tags);
    skillsContainer.append(card);
  });

  renderContactLinks(contact);

  document.addEventListener("click", (event) => {
    if (event.target.matches("[data-modal-close]")) {
      closeProjectModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeProjectModal();
    }
  });
};
