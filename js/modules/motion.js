/**
 * Handles animation preferences across the website.
 * Respects system settings and lets users pause animations.
 */
import { $ } from '../utils/dom.js';
import { readStorage, writeStorage } from '../utils/storage.js';

/** Key used to save the user's motion preference. */
const STORAGE_KEY = 'portfolio:motion-paused';
/** Checks if the system prefers reduced motion. */
const systemQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
/** Functions to notify when motion settings change. */
const listeners = new Set();
/** Whether the user has manually paused animations. */
let userPaused = readStorage(STORAGE_KEY) === 'true';
/** Returns whether animations should be reduced. */
export const prefersReducedMotion = () => systemQuery.matches || userPaused;

/** Registers a function to run when motion settings change. */
export function onMotionChange(callback) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

/** Updates motion settings and notifies other components. */
function sync() {
  const reduced = prefersReducedMotion();
  document.documentElement.dataset.motion = reduced ? 'reduce' : 'full';

  const toggle = $('[data-motion-toggle]');
  if (toggle) {
    // Hide the toggle when the system already disables animations.
    toggle.hidden = systemQuery.matches;
    toggle.setAttribute('aria-pressed', String(userPaused));
  }
  // Notify components about the updated motion preference.
  listeners.forEach((callback) => callback(reduced));
}

/** Initializes motion settings and the animation toggle. */
export function initMotion() {
  sync();
  // Update when the system's motion preference changes.
  systemQuery.addEventListener('change', sync);

  // Save and apply the user's animation preference.
  $('[data-motion-toggle]')?.addEventListener('click', () => {
    userPaused = !userPaused;
    writeStorage(STORAGE_KEY, String(userPaused));
    sync();
  });
}
