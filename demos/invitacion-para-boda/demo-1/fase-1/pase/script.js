const invitation = document.querySelector('[data-invitation]');
const openButton = document.querySelector('[data-open]');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

const wakeInvitation = () => invitation?.classList.add('is-awake');

if (reducedMotion.matches) {
  wakeInvitation();
} else {
  window.setTimeout(wakeInvitation, 3800);
}

openButton?.addEventListener('click', () => {
  openButton.disabled = true;

  if (reducedMotion.matches) {
    window.location.assign('../../fase-2/');
    return;
  }

  document.body.classList.add('is-leaving');
  window.setTimeout(() => window.location.assign('../../fase-2/'), 1350);
});

window.addEventListener('pageshow', () => {
  document.body.classList.remove('is-leaving');
  if (openButton) openButton.disabled = false;
});
