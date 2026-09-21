const copyButton = document.querySelector('[data-copy]');
const copyLabel = document.querySelector('[data-copy-label]');
const toast = document.querySelector('[data-toast]');
let toastTimer;

copyButton?.addEventListener('click', async () => {
  const username = copyButton.dataset.copy;

  try {
    await navigator.clipboard.writeText(username);
    if (copyLabel) copyLabel.textContent = 'Usuario copiado';
    if (toast) {
      toast.textContent = `Discord: ${username} copiado`;
      toast.classList.add('is-visible');
      window.clearTimeout(toastTimer);
      toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 2400);
    }
  } catch {
    if (copyLabel) copyLabel.textContent = username;
  }
});
