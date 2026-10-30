/**
 * Handles English and Greek translations across the website.
 * Updates page text, language settings, and saves the selected language.
 */
import { strings } from '../i18n/strings.js';
import { $, $$ } from '../utils/dom.js';
import { readStorage, writeStorage } from '../utils/storage.js';

/** Key used to save the selected language. */
const STORAGE_KEY = 'portfolio:lang';
/** Languages supported by the website. */
const SUPPORTED = ['en', 'el'];
/** Default language when no preference is found. */
const FALLBACK = 'en';
/** Currently selected language. */
let current = FALLBACK;
/** Functions to notify when the language changes. */
const listeners = new Set();
/** Finds a translation using its key. */
const lookup = (dict, key) => key.split('.').reduce((node, part) => node?.[part], dict);
/** Returns the currently selected language. */
export const getLang = () => current;

/** Returns the locale used for dates and numbers. */
export const getLocale = () => (current === 'el' ? 'el-GR' : 'en-GB');

/** Translates a key and replaces any placeholders with values. */
export function t(key, vars) {
  const value = lookup(strings[current], key) ?? lookup(strings[FALLBACK], key) ?? key;
  if (typeof value !== 'string' || !vars) return value;
  return value.replace(/\{(\w+)\}/g, (match, name) => (name in vars ? String(vars[name]) : match));
}

/** Returns a value in the selected language. */
export function localize(value) {
  if (value == null) return '';
  if (typeof value !== 'object' || Array.isArray(value)) return value;
  return value[current] ?? value[FALLBACK] ?? '';
}

/** Registers a function to run when the language changes. */
export function onLangChange(callback) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

/** Applies translations to page elements and metadata. */
function applyStatic(root = document) {
  // Translate regular text.
  for (const node of $$('[data-i18n]', root)) {
    node.textContent = t(node.dataset.i18n);
  }

  // Translate HTML content from trusted translation strings.
  for (const node of $$('[data-i18n-html]', root)) {
    node.innerHTML = t(node.dataset.i18nHtml);
  }

  // Translate element attributes.
  for (const node of $$('[data-i18n-attr]', root)) {
    for (const pair of node.dataset.i18nAttr.split(';')) {
      const [attr, key] = pair.split(':').map((part) => part.trim());
      if (attr && key) node.setAttribute(attr, t(key));
    }
  }

  // Update page title and description.
  document.title = t('meta.title');
  $('meta[name="description"]')?.setAttribute('content', t('meta.description'));
}

/** Updates the active state of language buttons. */
function syncSwitch() {
  for (const button of $$('[data-lang]')) {
    button.setAttribute('aria-pressed', String(button.dataset.lang === current));
  }
}

/** Announces a message to screen readers. */
function announce(message) {
  const region = $('[data-announcer]');
  if (!region) return;
  // Clear first so repeated identical messages are still announced.
  region.textContent = '';
  window.setTimeout(() => {
    region.textContent = message;
  }, 50);
}

/** Changes the language and updates the website. */
export function setLang(lang, { announceChange = false } = {}) {
  const next = SUPPORTED.includes(lang) ? lang : FALLBACK;
  const changed = next !== current;
  current = next;

  // Update translations, buttons, and saved preference.
  document.documentElement.lang = next;
  applyStatic();
  syncSwitch();
  writeStorage(STORAGE_KEY, next);

  // Notify other components and screen readers.
  if (changed) listeners.forEach((callback) => callback(next));
  if (announceChange) announce(t('a11y.langChanged'));
}

/** Detects the preferred language from storage or browser settings. */
function detectInitialLang() {
  const stored = readStorage(STORAGE_KEY);
  if (SUPPORTED.includes(stored)) return stored;
  // Check the browser's preferred languages.
  const preferred = (navigator.languages ?? [navigator.language]).map((tag) => tag?.slice(0, 2).toLowerCase());
  return preferred.find((code) => SUPPORTED.includes(code)) ?? FALLBACK;
}

/** Initializes translations and language switch buttons. */
export function initI18n() {
  current = detectInitialLang();
  document.documentElement.lang = current;
  applyStatic();
  syncSwitch();

  // Change language when a language button is clicked.
  for (const button of $$('[data-lang]')) {
    button.addEventListener('click', () => {
      if (button.dataset.lang !== current) setLang(button.dataset.lang, { announceChange: true });
    });
  }
}
