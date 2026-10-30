/**
 * Helper functions for finding and creating HTML elements.
 * Creates elements safely without parsing text as HTML.
 */

/** Finds the first element matching a selector. */
export const $ = (selector, root = document) => root.querySelector(selector);
/** Finds all elements matching a selector. */
export const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

/** Creates an HTML element with attributes and child elements. */
export function el(tag, props = {}, ...children) {
  const node = document.createElement(tag);

  // Apply attributes, styles, data values, and event listeners.
  for (const [key, value] of Object.entries(props)) {
    if (value == null || value === false) continue;

    if (key === 'class') {
      node.className = value;
    } else if (key === 'style') {
      for (const [prop, val] of Object.entries(value)) node.style.setProperty(prop, String(val));
    } else if (key === 'dataset') {
      Object.assign(node.dataset, value);
    } else if (key.startsWith('on') && typeof value === 'function') {
      node.addEventListener(key.slice(2).toLowerCase(), value);
    } else {
      node.setAttribute(key, value === true ? '' : String(value));
    }
  }
  // Add children while ignoring empty values.
  node.append(...children.flat(Infinity).filter((child) => child != null && child !== false));
  return node;
}

/** Namespace used to create SVG elements. */
const SVG_NS = 'http://www.w3.org/2000/svg';

/** Creates a decorative SVG icon from the website's icon collection. */
export function icon(name, className = '') {
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('class', `icon ${className}`.trim());
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');

  // Reference the matching icon from the SVG sprite.
  const use = document.createElementNS(SVG_NS, 'use');
  use.setAttribute('href', `#i-${name}`);
  svg.append(use);
  return svg;
}
