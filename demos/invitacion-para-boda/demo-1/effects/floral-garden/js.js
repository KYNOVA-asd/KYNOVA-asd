onload = () => {
  const isEmbedded = new URLSearchParams(location.search).has("embed");

  if (isEmbedded) {
    document.body.classList.add("is-embed");
  }

  requestAnimationFrame(() => document.body.classList.remove("container"));
};
