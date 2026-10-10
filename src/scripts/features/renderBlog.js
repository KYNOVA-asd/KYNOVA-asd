import { createElement, select } from "../core/dom.js";
import { posts } from "../data/posts.js";

const formatDate = (date) =>
  new Intl.DateTimeFormat("es-MX", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`));

const createPostCard = (post) => {
  const article = createElement("article", "blog-card");
  const imageLink = createElement("a", "blog-card__image-link");
  const image = createElement("img", "blog-card__image");
  const body = createElement("div", "blog-card__body");
  const meta = createElement("p", "blog-card__meta", `${post.category} · ${formatDate(post.date)} · ${post.readTime}`);
  const title = createElement("h2", "blog-card__title");
  const titleLink = createElement("a", "", post.title);
  const excerpt = createElement("p", "blog-card__excerpt", post.excerpt);
  const readMore = createElement("a", "blog-card__link", "Leer más");
  const url = `/blog/articulo/index.html?id=${encodeURIComponent(post.id)}`;

  image.src = post.coverImage;
  image.alt = `Portada: ${post.title}`;
  image.loading = "lazy";
  image.width = 720;
  image.height = 420;
  imageLink.href = url;
  imageLink.setAttribute("aria-label", `Leer ${post.title}`);
  imageLink.append(image);
  titleLink.href = url;
  readMore.href = url;
  readMore.setAttribute("aria-label", `Leer más: ${post.title}`);
  title.append(titleLink);
  body.append(meta, title, excerpt, readMore);
  article.append(imageLink, body);
  return article;
};

export const renderBlog = () => {
  const grid = select("#kynova-posts");
  if (!grid) return;
  const orderedPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date));
  grid.replaceChildren(...orderedPosts.map(createPostCard));
};
