import { renderBlog } from "./features/renderBlog.js";
import { renderRSS } from "./features/renderRSS.js";
import { renderShorts } from "./features/renderShorts.js";
import { renderWeeklyTool } from "./features/renderWeeklyTool.js";
import { createNavigation } from "./features/navigation.js";
import { createInteractions } from "./features/interactions.js";

renderBlog();
renderRSS();
renderShorts();
renderWeeklyTool();
createNavigation();
createInteractions();
