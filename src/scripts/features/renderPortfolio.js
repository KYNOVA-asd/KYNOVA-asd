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
  const publicUrl = project.demoUrl || project.siteLink;
  link.href = publicUrl || "#";
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.hidden = !publicUrl;
  link.classList.add("button--with-icon", "button--external");
  link.textContent = project.id === "zazil-events" ? "Ver Plataforma en Vivo" : project.siteLink ? "Ver demo en vivo" : "Ver proyecto";
  site.href = `https://wa.me/529987449856?text=${encodeURIComponent(`Hola, me gustaría cotizar un proyecto similar a ${project.title}.`)}`;
  site.classList.add("button--with-icon", "button--message");
  site.textContent = "Cotizar por WhatsApp";
  site.hidden = false;
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
    {
      label: "Instagram",
      href: contact.instagram,
    },
    {
      label: "Facebook",
      href: contact.facebook,
    },
  ];

  links.forEach((item) => {
    const link = createElement("a", "contact-link", item.label);
    link.href = item.href;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    if (item.label === "Instagram") {
      link.classList.add("social-link", "social-link--instagram");
    }
    if (item.label === "Facebook") {
      link.classList.add("social-link", "social-link--facebook");
    }
    if (item.label === "WhatsApp") {
      link.dataset.copyValue = contact.phoneLabel;
    }
    container.append(link);
  });
};

const categoryCopy = {
  web: ["Desarrollo Web & E-Commerce", "Sitios, tiendas y experiencias digitales pensadas para convertir."],
  marketing: ["Marketing & Estrategia", "Presencia, contenido y comunicación para marcas con intención."],
  events: ["Demos & Eventos", "Experiencias interactivas para momentos que merecen recordarse."],
  systems: ["Sistemas & Herramientas", "Herramientas y aplicaciones que ordenan procesos reales."],
};

const getProjectCategories = (project) => {
  const searchable = [project.title, project.category, project.sector, ...(project.tags || [])].join(" ").toLowerCase();
  const categories = [];

  if (/e-commerce|frontend|\bweb\b|marca personal/.test(searchable)) categories.push("web");
  if (project.owner === "Marketing" || /marketing|marca personal/.test(searchable)) categories.push("marketing");
  if (/boda|invitación|evento/.test(searchable)) categories.push("events");
  if (!categories.length || /sistema|backend|api|app|panel|chatbot|herramienta|tickets|citas/.test(searchable)) {
    categories.push("systems");
  }

  return [...new Set(categories)];
};

const createMenuProjectCard = (project) => {
  const card = createElement("article", "project-card menu-project-card");
  const image = createElement("img", "project-card__image");
  const body = createElement("div", "menu-project-card__body");
  const header = createElement("div", "menu-project-card__header");
  const category = createElement("span", "menu-project-card__category", project.category);
  const trigger = createElement("button", "menu-project-card__trigger", project.title);

  image.onerror = () => {
    image.onerror = null;
    image.src = project.fallbackImage;
  };
  image.src = project.image;
  image.alt = `Vista previa de ${project.title}`;
  trigger.type = "button";
  trigger.setAttribute("aria-label", `Ver detalles de ${project.title}`);
  trigger.addEventListener("click", () => openProjectModal(project));
  card.tabIndex = 0;
  card.setAttribute("role", "button");
  card.setAttribute("aria-label", `Ver ficha técnica de ${project.title}`);
  card.addEventListener("click", (event) => {
    if (event.target === trigger) return;
    openProjectModal(project);
  });
  card.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    openProjectModal(project);
  });

  if (project.isLive) {
    const liveBadge = createElement("span", "badge-live", "Demo disponible");
    header.append(liveBadge);
  }

  header.append(category);
  body.append(header, trigger);
  card.append(image, body);
  return card;
};

export const renderPortfolio = ({ contact, projects, services }) => {
  const projectsContainer = select("[data-projects]");
  const servicesContainer = select("[data-services]");
  const galleryTitle = select("[data-gallery-title]");
  const galleryKicker = select("[data-gallery-kicker]");
  const galleryDescription = select("[data-gallery-description]");

  if (!projectsContainer) return;

  const renderGallery = (items, category = "favorites") => {
    projectsContainer.replaceChildren(...items.map(createMenuProjectCard));

    if (category === "all") {
      galleryKicker.textContent = "Portafolio KYNOVA";
      galleryTitle.textContent = "Nuestros Proyectos";
      galleryDescription.textContent = "Cuatro proyectos seleccionados para conocer nuestro trabajo.";
      return;
    }

    galleryKicker.textContent = "Explorar categoría";
    galleryTitle.textContent = categoryCopy[category][0];
    galleryDescription.textContent = categoryCopy[category][1];
  };

  const featuredProjects = [
    projects.find((project) => project.title.startsWith("Lunéa Intimates")),
    projects.find((project) => project.id === "zazil-events"),
    projects.find((project) => project.company === "Marlen tu coach"),
    projects.find((project) => project.title === "Sistema de citas"),
  ].filter(Boolean);

  renderGallery(featuredProjects, "all");

  servicesContainer?.replaceChildren(
    ...services.map((service) => {
      const card = createElement("article", "service-card");
      card.append(createElement("h3", "", service.title));
      card.append(createElement("p", "", service.description));
      return card;
    }),
  );

  renderContactLinks(contact);

  document.querySelectorAll("[data-home-category]").forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.homeCategory;
      const wasActive = button.classList.contains("is-active");
      const matches = featuredProjects.filter((project) => getProjectCategories(project).includes(category));

      document.querySelectorAll("[data-home-category]").forEach((item) => {
        item.classList.toggle("is-active", !wasActive && item === button);
      });
      renderGallery(wasActive ? featuredProjects : matches.slice(0, 4), wasActive ? "all" : category);
      select("#proyectos")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

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
