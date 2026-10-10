import { renderBlog } from "./features/renderBlog.js";
import { renderRSS } from "./features/renderRSS.js";
import { createNavigation } from "./features/navigation.js";
import { createInteractions } from "./features/interactions.js";

renderBlog();
renderRSS();
createNavigation();
createInteractions();
