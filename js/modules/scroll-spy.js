/**
 * Tracks the active section while scrolling.
 * Updates navigation links and the active section indicator.
 */
import { $, $$ } from '../utils/dom.js';

/** Watches page sections and updates the active navigation link. */
export function initScrollSpy(onChange = () => {}) {
  const links = $$('[data-nav-link]');
  const ids = [...new Set(links.map((link) => link.hash.slice(1)))];
  const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
  if (!sections.length || !('IntersectionObserver' in window)) return;

  let activeId = null;

  // Update the active navigation link.
  const setActive = (id) => {
    if (id === activeId) return;
    activeId = id;
    for (const link of links) {
      if (link.hash === `#${id}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
    onChange(id);
  };

  // Detect sections crossing the middle of the screen.
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const hit = entries.find((entry) => entry.isIntersecting);
      if (hit) setActive(hit.target.id);
    },
    { rootMargin: '-45% 0px -50% 0px' },
  );
  sections.forEach((section) => sectionObserver.observe(section));

  // Clear the active section when the hero is visible.
  const hero = $('#top');
  if (hero) {
    new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setActive(null);
      },
      { rootMargin: '-45% 0px -50% 0px' },
    ).observe(hero);
  }

  // Activate the last section when reaching the footer.
  const footer = $('.site-footer');
  const footerObserver = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) setActive(sections[sections.length - 1].id);
    },
    { threshold: 0.6 },
  );
  if (footer) footerObserver.observe(footer);
}
