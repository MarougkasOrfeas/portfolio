/**
 * Hero section: rotates words with animations.
 * Pauses when the hero is hidden or animations are disabled.
 */
import { $, el } from '../utils/dom.js';
import { onLangChange, t } from './i18n.js';
import { onMotionChange, prefersReducedMotion } from './motion.js';

/** Time between word changes in milliseconds. */
const INTERVAL = 2600;

/** Initializes the rotating words in the Hero section. */
export function initHero() {
  const rotator = $('[data-rotator]');
  const hero = $('#top');
  if (!rotator || !hero) return;

  let words = t('hero.rotator');
  let index = 0;
  let timer = 0;
  let heroVisible = true;

  // Find the currently displayed word.
  const currentWord = () => $('[data-rotator-word]', rotator);

  // Replace the current word with an animated new word.
  const showWord = (word) => {
    const current = currentWord();
    if (!current) return;
    // Change text immediately when animations are disabled.
    if (prefersReducedMotion()) {
      current.textContent = word;
      return;
    }

    current.classList.remove('is-entering');
    current.classList.add('is-leaving');
    // Show the new word after the exit animation finishes.
    current.addEventListener(
      'animationend',
      () => {
        current.replaceWith(el('span', { class: 'hero__rotator-word is-entering', 'data-rotator-word': true }, word));
      },
      { once: true },
    );
  };
  // Move to the next word in the list.
  const tick = () => {
    index = (index + 1) % words.length;
    showWord(words[index]);
  };

  // Start or stop rotation based on visibility and motion settings.
  const update = () => {
    window.clearInterval(timer);
    timer = 0;
    if (heroVisible && !document.hidden && !prefersReducedMotion()) {
      timer = window.setInterval(tick, INTERVAL);
    }
  };
  // Pause rotation when the Hero section leaves the screen.
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      heroVisible = entry.isIntersecting;
      update();
    }).observe(hero);
  }

  // Update rotation when tab visibility or motion settings change.
  document.addEventListener('visibilitychange', update);
  onMotionChange(update);
  // Reset the rotating words when the language changes.
  onLangChange(() => {
    words = t('hero.rotator');
    index = 0;
    const current = currentWord();
    if (current) current.textContent = words[0];
    update();
  });

  update();
}
