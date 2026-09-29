const showToast = (message) => {
  let toast = document.querySelector("[data-toast]");

  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    toast.dataset.toast = "";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    document.body.append(toast);
  }

  toast.textContent = message;
  toast.classList.remove("is-visible");
  window.clearTimeout(showToast.timeoutId);
  requestAnimationFrame(() => toast.classList.add("is-visible"));
  showToast.timeoutId = window.setTimeout(() => toast.classList.remove("is-visible"), 2600);
};

const setupClipboard = () => {
  document.addEventListener("click", async (event) => {
    const target = event.target.closest("[data-copy-value], a[href^='mailto:'], a[href^='tel:']");
    if (!target) return;

    const value = target.dataset.copyValue || target.href.replace(/^(mailto:|tel:)/, "").split("?")[0];

    try {
      await navigator.clipboard.writeText(value);
      showToast("¡Copiado al portapapeles!");
    } catch {
      showToast("No se pudo copiar automáticamente");
    }
  });
};

const setupReveal = () => {
  const targets = document.querySelectorAll(
    "main > section, .simple-page > section, .catalog-heading, .project-card, .team-card, .pricing-card",
  );

  targets.forEach((target, index) => {
    target.classList.add("reveal-up");
    target.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 70}ms`);
  });

  if (!("IntersectionObserver" in window)) {
    targets.forEach((target) => target.classList.add("is-revealed"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px" },
  );

  targets.forEach((target) => observer.observe(target));
};

const setupTilt = () => {
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

  document.querySelectorAll(".project-card:not(.menu-project-card)").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const bounds = card.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      card.style.setProperty("--tilt-x", `${(-y * 3.5).toFixed(2)}deg`);
      card.style.setProperty("--tilt-y", `${(x * 4.5).toFixed(2)}deg`);
      card.style.setProperty("--pointer-x", `${((x + 0.5) * 100).toFixed(1)}%`);
      card.style.setProperty("--pointer-y", `${((y + 0.5) * 100).toFixed(1)}%`);
    });

    card.addEventListener("pointerleave", () => {
      card.style.removeProperty("--tilt-x");
      card.style.removeProperty("--tilt-y");
    });
  });
};

const setupMagneticButtons = () => {
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

  document.querySelectorAll(".button--primary, .btn-primary, .cta-button").forEach((button) => {
    button.addEventListener("pointermove", (event) => {
      const bounds = button.getBoundingClientRect();
      const x = event.clientX - bounds.left - bounds.width / 2;
      const y = event.clientY - bounds.top - bounds.height / 2;
      button.style.transform = `translate(${(x * 0.12).toFixed(1)}px, ${(y * 0.18 - 2).toFixed(1)}px)`;
    });

    button.addEventListener("pointerleave", () => {
      button.style.removeProperty("transform");
    });
  });
};

export const createInteractions = () => {
  setupClipboard();
  setupReveal();
  setupTilt();
  setupMagneticButtons();
};
