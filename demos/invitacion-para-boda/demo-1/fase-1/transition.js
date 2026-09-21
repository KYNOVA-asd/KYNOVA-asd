const phaseTwoLinks = document.querySelectorAll('a[href*=fase-2]');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let isNavigating = false;

phaseTwoLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    if (
      isNavigating ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();
    isNavigating = true;

    const destination = link.href;
    const envelopeAction = link.closest('.envelope-action');

    if (envelopeAction) {
      envelopeAction.classList.add('is-open');
    }

    if (prefersReducedMotion.matches) {
      window.location.assign(destination);
      return;
    }

    document.body.classList.add('is-transitioning');
    window.setTimeout(() => window.location.assign(destination), 1200);
  });
});

window.addEventListener('pageshow', () => {
  isNavigating = false;
  document.body.classList.remove('is-transitioning');
});
