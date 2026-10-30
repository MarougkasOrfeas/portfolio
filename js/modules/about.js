/**
 * About section: displays animated statistics and skill groups.
 */
import { experience, certifications, projects, skills } from '../data/profile.js';
import { $, el, icon } from '../utils/dom.js';
import { monthsBetween } from '../utils/dates.js';
import { localize, onLangChange, t } from './i18n.js';
import { prefersReducedMotion } from './motion.js';
import { observeReveals } from './reveal.js';

/** Duration of the number animation in milliseconds. */
const COUNT_DURATION = 1400;
/** Makes an animation slow down near the end. */
const easeOutCubic = (x) => 1 - (1 - x) ** 3;

/** Calculates full years of professional development experience. */
function professionalYears() {
  const devRoles = experience.find((job) => job.id === 'european-dynamics')?.roles ?? [];
  const firstStart = devRoles[devRoles.length - 1]?.start;
  return firstStart ? Math.floor(monthsBetween(firstStart, null) / 12) : 0;
}

/** Gets the statistics displayed in the About section. */
function getStats() {
  return [
    { id: 'years', value: professionalYears(), suffix: '+' },
    { id: 'certifications', value: certifications.length },
    { id: 'projects', value: projects.length },
  ];
}

/** Keeps track of statistics that have already animated. */
const counted = new Set();

/** Animates a number from zero to its final value. */
function countUp(node, target) {
  if (prefersReducedMotion() || counted.has(node.dataset.stat)) {
    node.textContent = String(target);
    return;
  }
  counted.add(node.dataset.stat);

  const start = performance.now();
  const frame = (now) => {
    // Current animation progress from 0 to 1.
    const progress = Math.min((now - start) / COUNT_DURATION, 1);
    node.textContent = String(Math.round(easeOutCubic(progress) * target));
    if (progress < 1) window.requestAnimationFrame(frame);
  };
  node.textContent = '0';
  window.requestAnimationFrame(frame);
}

/** Displays statistics and animates them when visible. */
function renderStats(container) {
  const stats = getStats();

  container.replaceChildren(
    ...stats.map((stat, index) =>
      el(
        'div',
        { class: 'stat', dataset: { reveal: 'up', revealKey: `stat-${stat.id}` }, style: { '--i': index } },
        el('dt', {}, t(`about.stats.${stat.id}`)),
        el(
          'dd',
          {},
            // Screen readers read the final value instead of the animation.
          el('span', { 'aria-hidden': 'true', dataset: { stat: stat.id } }, String(stat.value)),
          stat.suffix && el('span', { class: 'stat__suffix', 'aria-hidden': 'true' }, stat.suffix),
          el('span', { class: 'visually-hidden' }, `${stat.value}${stat.suffix ?? ''}`),
        ),
      ),
    ),
  );

  if (!('IntersectionObserver' in window)) return;
  // Watcher for the statistics to become visible.
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.disconnect();
        stats.forEach((stat) => countUp($(`[data-stat="${stat.id}"]`, container), stat.value));
      }
    },
    { threshold: 0.5 },
  );
  observer.observe(container);
}

/** Displays skill groups with their technologies. */
function renderSkills(container) {
  container.replaceChildren(
    ...skills.map((group, index) =>
      el(
        'section',
        {
          class: 'skill-group',
          'aria-labelledby': `skills-${group.id}`,
          dataset: { reveal: 'up', revealKey: `skills-${group.id}` },
          style: { '--i': index },
        },
        el('h4', { class: 'skill-group__title', id: `skills-${group.id}` }, icon(group.icon, 'icon--sm'), localize(group.title)),
        el(
          'ul',
          { class: 'chips', role: 'list' },
          group.items.map((item) => el('li', { class: 'chip' }, localize(item))),
        ),
      ),
    ),
  );
  observeReveals(container);
}

/** Initializes the About section and updates it when the language changes. */
export function initAbout() {
  const statsContainer = $('[data-stats]');
  const skillsContainer = $('[data-skills]');
  // Display
  const render = () => {
    if (statsContainer) {
      renderStats(statsContainer);
      observeReveals(statsContainer);
    }
    if (skillsContainer) renderSkills(skillsContainer);
  };

  render();
  onLangChange(render);
}
