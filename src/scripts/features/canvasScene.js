import { select } from "../core/dom.js";

const colors = ["#0f766e", "#2563eb", "#f59e0b", "#e11d48"];

const createNode = (width, height, index) => ({
  x: (width / 7) * ((index % 6) + 1),
  y: (height / 6) * ((index % 5) + 1),
  radius: 4 + (index % 3),
  speed: 0.004 + index * 0.0004,
  color: colors[index % colors.length],
});

export const createCanvasScene = (selector) => {
  const canvas = select(selector);

  if (!canvas) {
    return;
  }

  const context = canvas.getContext("2d");
  let nodes = [];
  let frame = 0;
  let animationId = null;

  const resize = () => {
    const { width, height } = canvas.getBoundingClientRect();
    const ratio = window.devicePixelRatio || 1;
    canvas.width = Math.floor(width * ratio);
    canvas.height = Math.floor(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    nodes = Array.from({ length: 18 }, (_, index) => createNode(width, height, index));
  };

  const draw = () => {
    const { width, height } = canvas.getBoundingClientRect();
    context.clearRect(0, 0, width, height);
    frame += 1;

    nodes.forEach((node, index) => {
      node.x += Math.cos(frame * node.speed + index) * 0.55;
      node.y += Math.sin(frame * node.speed + index) * 0.55;
    });

    nodes.forEach((node, index) => {
      nodes.slice(index + 1).forEach((nextNode) => {
        const distance = Math.hypot(node.x - nextNode.x, node.y - nextNode.y);

        if (distance < 150) {
          context.beginPath();
          context.moveTo(node.x, node.y);
          context.lineTo(nextNode.x, nextNode.y);
          context.strokeStyle = `rgba(15, 23, 42, ${1 - distance / 170})`;
          context.lineWidth = 1;
          context.stroke();
        }
      });

      context.beginPath();
      context.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      context.fillStyle = node.color;
      context.fill();
    });

    animationId = requestAnimationFrame(draw);
  };

  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  resize();
  draw();

  if (motionQuery.matches && animationId) {
    cancelAnimationFrame(animationId);
  }

  window.addEventListener("resize", resize);
};
