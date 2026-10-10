import { defineConfig } from "vite";
import { resolve } from "node:path";
import { cpSync, mkdirSync, readFileSync } from "node:fs";
import { services } from "./src/scripts/data/services.js";

const root = process.cwd();
const readPartial = (name) => readFileSync(resolve(root, `src/templates/partials/${name}.html`), "utf8");
const escapeHtml = (value) => String(value).replace(/[&<>"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[character]);

const serviceMarkup = (service) => `
<main class="service-page" id="contenido">
  <section class="service-hero">
    <p class="eyebrow">${escapeHtml(service.eyebrow)}</p>
    <h1>${escapeHtml(service.title)}</h1>
    <p class="service-hero__lead">${escapeHtml(service.description)}</p>
    <div class="hero__actions">
      <a class="button button--primary" href="/contacto/">Cuéntanos tu proyecto</a>
      <a class="button button--ghost" href="#proceso">Conocer el proceso</a>
    </div>
  </section>
  <section class="service-outcomes" aria-label="Resultados esperados">
    ${service.outcomes.map((item) => `<article><svg class="icon-svg service-outcomes__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="m5 12 4 4L19 6" /></svg><p>${escapeHtml(item)}</p></article>`).join("")}
  </section>
  <section class="service-section" id="proceso">
    <div class="section-heading"><p class="eyebrow">Cómo trabajamos</p><h2>Un proceso visible de principio a fin.</h2></div>
    <div class="process-grid">${service.process.map((step) => `<article class="process-card"><h3>${escapeHtml(step.title)}</h3><p>${escapeHtml(step.description)}</p></article>`).join("")}</div>
  </section>
  <section class="service-section service-scope">
    <div><p class="eyebrow">Qué incluye</p><h2>Alcance que podemos adaptar.</h2><p>${escapeHtml(service.idealFor)}</p></div>
    <ul>${service.deliverables.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
  </section>
  <!-- @include:contact -->
</main>`;

const htmlArchitecture = () => ({
  name: "kynova-static-architecture",
  transformIndexHtml: {
    order: "pre",
    handler(html) {
      const sharedHead = readPartial("head");
      const sharedHeader = readPartial("header");
      const sharedFooter = readPartial("footer");
      const sharedContact = readPartial("contact");
      let output = html
        .replace("<!-- @include:head -->", readPartial("head"))
        .replace("<!-- @include:header -->", readPartial("header"))
        .replace("<!-- @include:footer -->", readPartial("footer"));
      if (!output.includes(sharedHead.trim())) output = output.replace("</head>", `${sharedHead}</head>`);
      output = output.replace(/<header class="site-header"[\s\S]*?<\/header>/, sharedHeader.trim());
      output = output.replace(/<footer class="site-footer"[\s\S]*?<\/footer>/, sharedFooter.trim());
      output = output.replace(/<!-- @service:([\w-]+) -->/, (_, slug) => {
        const service = services[slug];
        if (!service) throw new Error(`Servicio no definido: ${slug}`);
        return serviceMarkup(service);
      });
      return output.replaceAll("<!-- @include:contact -->", sharedContact);
    },
  },
});

const preserveStaticAssets = () => ({
  name: "kynova-static-assets",
  closeBundle() {
    mkdirSync(resolve(root, "dist"), { recursive: true });
    cpSync(resolve(root, "assets"), resolve(root, "dist/assets"), { recursive: true });
    cpSync(resolve(root, "llamanos"), resolve(root, "dist/llamanos"), { recursive: true });
    for (const file of ["robots.txt", "llms.txt", "sitemap.xml"]) {
      cpSync(resolve(root, file), resolve(root, `dist/${file}`));
    }
    for (const file of ["angel.couoh.html", "jazmin.b.html", "yadira.h.html", "script.js", "styles.css"]) {
      cpSync(resolve(root, `linktree/${file}`), resolve(root, `dist/linktree/${file}`));
    }
  },
});

const pages = ["index.html", "404.html", "500.html", "nosotros/index.html", "proyectos/index.html", "costos/index.html", "contacto/index.html", "privacidad/index.html", "linktree/index.html", "dev-web/index.html", "gestion-redes-sociales/index.html", "creacion-contenido/index.html", "campanas-meta/index.html", "blog/index.html", "blog/articulo/index.html"];

export default defineConfig({
  plugins: [htmlArchitecture(), preserveStaticAssets()],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    cssMinify: "lightningcss",
    rollupOptions: { input: Object.fromEntries(pages.map((page) => [page.replace(/\/index\.html$/, "") || "home", resolve(root, page)])) },
  },
});
