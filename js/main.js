/**
 * Main entry point for the portfolio website.
 * Initializes each module separately to prevent one failure from affecting others.
 */
import { initMotion } from './modules/motion.js';
import { initI18n } from './modules/i18n.js';
import { initReveal, observeReveals } from './modules/reveal.js';
import { initNav } from './modules/nav.js';
import { initScrollSpy } from './modules/scroll-spy.js';
import { initHero } from './modules/hero.js';
import { initAbout } from './modules/about.js';
import { initTimeline } from './modules/timeline.js';
import { initProjects } from './modules/projects.js';
import { initContact } from './modules/contact.js';

// Mark the application as initialized and JavaScript as enabled.
document.documentElement.setAttribute('data-app', '');
document.documentElement.classList.replace('no-js', 'js');

/** Initializes a module and handles errors without stopping the website. */
function boot(name, init) {
  try {
    return init();
  } catch (error) {
    console.error(`[portfolio] "${name}" failed to initialise`, error);
    return undefined;
  }
}
// Initialize settings and shared features first.
boot('motion', initMotion);
boot('i18n', initI18n);
boot('reveal', initReveal);

// Initialize navigation and active section tracking.
/** Function used to move the active navigation indicator. */
const moveIndicator = boot('nav', initNav);
boot('scroll-spy', () => initScrollSpy(moveIndicator));

// Initialize website sections.
boot('hero', initHero);
boot('about', initAbout);
boot('timeline', initTimeline);
boot('projects', initProjects);
boot('contact', initContact);

// Initialize scroll reveals for elements already in the HTML.
boot('reveal:static', () => observeReveals(document));

// Display the current year in the footer.
boot('footer', () => {
  const year = document.querySelector('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());
});
