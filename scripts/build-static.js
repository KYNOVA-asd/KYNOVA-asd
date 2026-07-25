const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "dist");

const entries = [
  "index.html",
  "assets",
  "contacto",
  "costos",
  "llamanos",
  "nosotros",
  "proyectos",
  "src",
];

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

for (const entry of entries) {
  const source = path.join(root, entry);
  if (!fs.existsSync(source)) continue;

  const target = path.join(outDir, entry);
  fs.cpSync(source, target, { recursive: true });
}

console.log("Static site ready in dist/");
