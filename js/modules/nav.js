/**
 * Handles website navigation, scroll progress, and the mobile menu.
 * Updates active sections and manages keyboard accessibility.
 */
import { $, $$ } from '../utils/dom.js';
import { onLangChange } from './i18n.js';

/** Checks if the screen is wide enough for desktop navigation. */
const DESKTOP_QUERY = window.matchMedia('(min-width: 52em)');
/** Checks if the browser supports CSS scroll animations. */
const SUPPORTS_SCROLL_TIMELINE = window.CSS?.supports?.('animation-timeline: scroll()') ?? false;

/** Updates the header appearance and scroll progress. */
function initHeader() {
  const header = $('[data-header]');
  const progressBar = $('.scroll-progress__bar');
  let ticking = false;

  // Update the header and scroll progress based on page position.
  const update = () => {
    ticking = false;
    const { scrollY } = window;
    header?.toggleAttribute('data-scrolled', scrollY > 8);

    // Update progress manually if CSS scroll animations are unsupported.
    if (!SUPPORTS_SCROLL_TIMELINE && progressBar) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progressBar.style.setProperty('--scroll-progress', max > 0 ? (scrollY / max).toFixed(4) : '0');
    }
  };

  // Limit scroll updates to one per animation frame.
  window.addEventListener(
    'scroll',
    () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    },
    { passive: true },
  );
  update();
}

/** Creates and positions the active navigation indicator. */
function createIndicator() {
  const nav = $('[data-primary-nav]');
  const indicator = $('[data-nav-indicator]');
  if (!nav || !indicator) return () => {};

  let activeId = null;

  // Move the indicator to the currently active navigation link.
  const position = () => {
    const link = activeId && $(`.primary-nav__link[href="#${activeId}"]`, nav);
    if (!link) {
      indicator.style.setProperty('--indicator-opacity', '0');
      return;
    }
    indicator.style.setProperty('--indicator-x', `${link.offsetLeft}px`);
    indicator.style.setProperty('--indicator-w', `${link.offsetWidth}px`);
    indicator.style.setProperty('--indicator-opacity', '1');
  };

  // Reposition when the screen, language, or fonts change.
  window.addEventListener('resize', position, { passive: true });
  onLangChange(() => window.requestAnimationFrame(position));
  document.fonts?.ready.then(position);

  // Return a function that updates the active section.
  return (id) => {
    activeId = id;
    position();
  };
}

/** Initializes the mobile menu and its keyboard controls. */
function initMobileMenu() {
  const toggle = $('[data-menu-toggle]');
  const menu = $('[data-mobile-menu]');
  if (!toggle || !menu) return;

  // Page elements disabled while the menu is open.
  const background = [$('#main'), $('.site-footer'), $('.skip-link')].filter(Boolean);
  let isOpen = false;
  // Get elements that can receive keyboard focus.
  const focusables = () => [toggle, ...$$('a[href], button:not([disabled])', menu)];

  // Open or close the menu and manage keyboard focus.
  const setOpen = (open, { restoreFocus = true } = {}) => {
    if (open === isOpen) return;
    isOpen = open;

    toggle.setAttribute('aria-expanded', String(open));
    menu.toggleAttribute('data-open', open);
    document.body.classList.toggle('has-menu-open', open);
    // Disable background interaction while the menu is open.
    background.forEach((node) => {
      node.inert = open;
    });

    // Move focus into the menu or back to its toggle.
    if (open) {
      $('a[href]', menu)?.focus();
    } else if (restoreFocus) {
      toggle.focus();
    }
  };

  // Toggle the menu when the button is clicked.
  toggle.addEventListener('click', () => setOpen(!isOpen));

  // Close the menu when a navigation link is clicked.
  menu.addEventListener('click', (event) => {
    if (event.target.closest('a[href^="#"]')) setOpen(false, { restoreFocus: false });
  });

  // Handle Escape and keep Tab navigation inside the open menu.
  document.addEventListener('keydown', (event) => {
    if (!isOpen) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      setOpen(false);
      return;
    }

    if (event.key !== 'Tab') return;
    const items = focusables();
    const first = items[0];
    const last = items[items.length - 1];

    // Loop keyboard focus between the first and last elements.
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    } else if (!items.includes(document.activeElement)) {
      event.preventDefault();
      first.focus();
    }
  });

  // Close the mobile menu when switching to desktop layout.
  DESKTOP_QUERY.addEventListener('change', (event) => {
    if (event.matches) setOpen(false, { restoreFocus: false });
  });
}

/**
 * Initializes navigation and returns a function to update the active section.
 * @returns {(id: string|null) => void} callback to move the indicator to the active section
 */
export function initNav() {
  initHeader();
  initMobileMenu();
  return createIndicator();
}
