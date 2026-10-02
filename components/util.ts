import { getSection } from "@/lib/sections";

/**
 * Move to a section of the single-page site.
 *
 * Three things have to happen together, which is why they live here rather than
 * in each caller: the page scrolls, the address bar updates so the section can
 * be linked to and Back works, and keyboard focus follows so the next Tab press
 * continues from the new section instead of the navbar.
 *
 * Scrolling deliberately uses the default `behavior`, which defers to the CSS
 * `scroll-behavior` — that way `prefers-reduced-motion` is honoured in one
 * place (globals.css) instead of being re-checked at every call site.
 */
export function scrollToId(id: string) {
  const element = document.getElementById(id);
  if (!element) return;

  const section = getSection(id);
  if (section && window.location.pathname !== section.path) {
    // pushState, not replaceState: a click is an intentional navigation, so
    // Back should return to the section the visitor came from. Passive
    // scrolling uses replaceState instead, to avoid flooding the history.
    window.history.pushState(null, "", section.path);
  }

  element.scrollIntoView({ block: "start" });
  element.focus({ preventScroll: true });
}
