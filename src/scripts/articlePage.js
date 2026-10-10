import { select } from "./core/dom.js";
import { posts } from "./data/posts.js";
import { createNavigation } from "./features/navigation.js";
import { createInteractions } from "./features/interactions.js";

const formatDate = (date) =>
  new Intl.DateTimeFormat("es-MX", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`));

const renderArticle = () => {
  const id = new URLSearchParams(window.location.search).get("id");
  const post = posts.find((item) => item.id === id);
  const article = select("[data-article]");
  const notFound = select("[data-article-not-found]");

  if (!post || !article) {
    if (notFound) notFound.hidden = false;
    document.title = "Artículo no encontrado | KYNOVA";
    return;
  }

  select("[data-post-category]").textContent = post.category;
  select("[data-post-title]").textContent = post.title;
  select("[data-post-date]").textContent = formatDate(post.date);
  select("[data-post-read-time]").textContent = post.readTime;
  const cover = select("[data-post-cover]");
  cover.src = post.coverImage;
  cover.alt = `Portada: ${post.title}`;
  select("[data-post-content]").innerHTML = post.content;
  article.hidden = false;
  document.title = `${post.title} | KYNOVA`;
};

renderArticle();
createNavigation();
createInteractions();
