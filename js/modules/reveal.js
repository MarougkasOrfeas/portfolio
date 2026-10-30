/**
 * Reveals elements when they appear on screen.
 * Remembers revealed elements to avoid repeating animations.
 */
import { $$ } from '../utils/dom.js';

/** Keeps track of elements that have already been revealed. */
const revealedKeys = new Set();
/** Watches for elements entering the screen. */
let observer = null;

/** Makes an element visible and remembers it. */
const show = (node) => {
  node.classList.add('is-visible');
  if (node.dataset.revealKey) revealedKeys.add(node.dataset.revealKey);
};

/** Initializes the observer for scroll reveal animations. */
export function initReveal() {
  if (!('IntersectionObserver' in window)) return;

  // Watch elements and reveal them when they enter the screen.
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        show(entry.target);
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
  );
}

/** Start watching every not-yet-visible [data-reveal] inside `root`. */
export function observeReveals(root = document) {
  for (const node of $$('[data-reveal]:not(.is-visible)', root)) {
    // Show previously revealed elements without animating again.
    if (!observer || revealedKeys.has(node.dataset.revealKey)) show(node);
    else observer.observe(node);
  }
}
