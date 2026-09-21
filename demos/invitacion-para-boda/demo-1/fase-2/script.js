const weddingDate = new Date('2026-11-28T13:00:00-06:00');
const countdown = document.querySelector('[data-countdown]');

function updateCountdown() {
  const remaining = Math.max(0, weddingDate.getTime() - Date.now());
  const totalSeconds = Math.floor(remaining / 1000);
  const values = {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };

  Object.entries(values).forEach(([unit, value]) => {
    const output = countdown?.querySelector(`[data-${unit}]`);
    if (output) output.textContent = String(value).padStart(2, '0');
  });
}

updateCountdown();
window.setInterval(updateCountdown, 1000);

const musicButton = document.querySelector('[data-music]');
const audio = document.querySelector('[data-audio]');
const musicLabel = document.querySelector('[data-music-label]');

musicButton?.addEventListener('click', async () => {
  if (!audio) return;

  if (audio.paused) {
    try {
      await audio.play();
      musicButton.setAttribute('aria-pressed', 'true');
      if (musicLabel) musicLabel.textContent = 'Pausar nuestra canción';
    } catch {
      if (musicLabel) musicLabel.textContent = 'Toca nuevamente para reproducir';
    }
  } else {
    audio.pause();
    musicButton.setAttribute('aria-pressed', 'false');
    if (musicLabel) musicLabel.textContent = 'Continuar nuestra canción';
  }
});

audio?.addEventListener('ended', () => {
  musicButton?.setAttribute('aria-pressed', 'false');
  if (musicLabel) musicLabel.textContent = 'Reproducir nuestra canción';
});

const observer = new IntersectionObserver(
  (entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  }),
  { threshold: 0.12 },
);

document.querySelectorAll('.reveal').forEach((section) => observer.observe(section));
