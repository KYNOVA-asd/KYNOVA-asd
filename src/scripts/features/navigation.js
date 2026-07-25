import { select, selectAll } from "../core/dom.js";

export const createNavigation = () => {
  const header = select("[data-header]");
  const nav = select("[data-nav]");
  const toggle = select("[data-nav-toggle]");
  let lastScrollY = window.scrollY;

  if (header) {
    window.addEventListener(
      "scroll",
      () => {
        const currentScrollY = window.scrollY;
        const isMenuOpen = nav?.classList.contains("is-open");

        if (currentScrollY > lastScrollY && currentScrollY > 120 && !isMenuOpen) {
          header.classList.add("is-hidden");
        } else {
          header.classList.remove("is-hidden");
        }

        lastScrollY = currentScrollY;
      },
      { passive: true },
    );
  }

  if (!nav || !toggle) return;

  const closeMenu = () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    header?.classList.remove("is-hidden");
  };

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    header?.classList.remove("is-hidden");
  });

  selectAll("a", nav).forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
};
