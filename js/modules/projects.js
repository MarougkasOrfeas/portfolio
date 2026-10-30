/**
 * Displays project cards, interactive effects, and case-study dialogs.
 * Supports translations, animations, and accessibility.
 */
import { projects } from '../data/profile.js';
import { $, el, icon } from '../utils/dom.js';
import { localize, onLangChange, t } from './i18n.js';
import { prefersReducedMotion } from './motion.js';
import { observeReveals } from './reveal.js';

/** Maximum rotation angle for project cards. */
const MAX_TILT_DEG = 4;
/** Icons used for different project types. */
const KIND_ICONS = { professional: 'layers', thesis: 'graduation' };
/** Checks if the device supports precise pointer interactions. */
const FINE_POINTER = window.matchMedia('(hover: hover) and (pointer: fine)');

/** Creates an accessible hint for links opening in a new tab. */
const newTabHint = () => el('span', { class: 'visually-hidden' }, ` ${t('a11y.newTab')}`);
/** Creates a list of technology labels. */
const chipList = (items) =>
  el(
    'ul',
    { class: 'chips', role: 'list', 'aria-label': t('projects.technologies') },
    items.map((item) => el('li', { class: 'chip' }, item)),
  );

/** Creates a breakdown of the technologies used in a project. */
const stackBreakdown = (stack) =>
  el(
    'dl',
    { class: 'stack' },
    Object.entries(stack).map(([layer, items]) =>
      el(
        'div',
        { class: 'stack__row' },
        el('dt', { class: 'stack__label' }, t(`projects.stack.${layer}`)),
        el('dd', {}, chipList(items)),
      ),
    ),
  );

/** Creates project buttons and links for details, source code, and downloads. */
function actions(project, titleId, { withCaseStudy = true } = {}) {
    const { source, live, download } = project.links ?? {};

  return el(
    'div',
    { class: 'project-card__actions' },
    withCaseStudy &&
      project.caseStudy &&
      el(
        'button',
        { class: 'btn btn--sm', type: 'button', 'aria-haspopup': 'dialog', dataset: { caseStudyOpen: project.id } },
        t('projects.caseStudy'),
        el('span', { class: 'visually-hidden' }, `: ${project.title}`),
        icon('arrow-right', 'icon--arrow-right'),
      ),
    source &&
      el(
        'a',
        { class: 'link-arrow', href: source, target: '_blank', rel: 'noopener noreferrer', 'aria-describedby': titleId },
        icon('github', 'icon--sm'),
        t('projects.source'),
        newTabHint(),
      ),
    download &&
      el(
          'a',
          {
              class: 'link-arrow',
              href: download,
              target: '_blank',
              rel: 'noopener noreferrer',
              'aria-describedby': titleId,
          },
          icon('download', 'icon--sm'),
          t('projects.download'),
          newTabHint(),
      ),
    live &&
      el(
        'a',
        { class: 'link-arrow', href: live, target: '_blank', rel: 'noopener noreferrer', 'aria-describedby': titleId },
        t('projects.live'),
        newTabHint(),
        icon('external', 'icon--sm'),
      ),
    !source && project.kind === 'professional' && el('p', { class: 'project-card__note' }, t('projects.privateSource')),
  );
}

/** Creates a featured or regular project card. */
function renderCard(project, index) {
  const titleId = `project-${project.id}-title`;
  const tech = project.tech ?? Object.values(project.stack ?? {}).flat();
  // Create the project icon and type.
  const top = el(
    'div',
    { class: 'project-card__top' },
    icon(KIND_ICONS[project.kind] ?? 'folder', 'project-card__icon'),
    el('p', { class: 'project-card__kind' }, t(`projects.kinds.${project.kind}`)),
  );
  // Build the project title and description.
  const title = el('h4', { class: 'project-card__title', id: titleId }, project.title);
  const description = el('p', { class: 'project-card__desc' }, localize(project.description));

  // Featured projects show a detailed technology breakdown.
  const content = project.featured
    ? el(
        'div',
        { class: 'project-card__body' },
        el('div', { class: 'project-card__main' }, title, description, actions(project, titleId)),
        project.stack && stackBreakdown(project.stack),
      )
    : [title, description, el('div', { class: 'project-card__footer' }, chipList(tech), actions(project, titleId))];

  return el(
    'li',
    {
      class: `project-card-wrap${project.featured ? ' project-card-wrap--featured' : ''}`,
      dataset: { reveal: 'up', revealKey: `project-${project.id}` },
      style: { '--i': project.featured ? 0 : index % 3 },
    },
    el(
      'article',
      { class: `project-card${project.featured ? ' project-card--featured' : ''}`, 'aria-labelledby': titleId },
      top,
      content,
    ),
  );
}

/** Adds spotlight and 3D tilt effects to project cards. */
function enablePointerEffects(grid) {
  let frame = 0;

  grid.addEventListener('pointermove', (event) => {
    if (!FINE_POINTER.matches) return;
    const card = event.target.closest('.project-card');
    if (!card) return;

    // Update card effects once per animation frame.
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      // Position the spotlight under the pointer.
      card.style.setProperty('--mx', `${(x * 100).toFixed(1)}%`);
      card.style.setProperty('--my', `${(y * 100).toFixed(1)}%`);

      if (prefersReducedMotion()) return;
      // Featured cards are wide, so they tilt less.
      const strength = card.classList.contains('project-card--featured') ? 0.35 : 1;
      card.style.setProperty('--rx', `${((0.5 - y) * MAX_TILT_DEG * strength).toFixed(2)}deg`);
      card.style.setProperty('--ry', `${((x - 0.5) * MAX_TILT_DEG * strength).toFixed(2)}deg`);
      card.setAttribute('data-tilting', '');
    });
  });

  // pointerleave doesn't bubble, so listen in the capture phase and react only to cards.
  grid.addEventListener(
    'pointerleave',
    (event) => {
      const card = event.target;
      if (!(card instanceof HTMLElement) || !card.classList.contains('project-card')) return;
      cancelAnimationFrame(frame);
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
      card.removeAttribute('data-tilting');
    },
    true,
  );
}

/** Initializes the case-study dialog and its interactions. */
function initDialog(grid) {
  const dialog = $('[data-case-study]');
  if (!dialog || typeof dialog.showModal !== 'function') return;

  const titleNode = $('[data-case-study-title]', dialog);
  const body = $('[data-case-study-body]', dialog);
  let trigger = null;

  // Create a section inside the case-study dialog.
  const section = (key, ...content) =>
    el('section', { class: 'case-study__section' }, el('h3', {}, t(`projects.sections.${key}`)), content);

  // Fill the dialog with the selected project's information.
  const fill = (project) => {
    const study = project.caseStudy;
    const points = localize(study.highlights) || [];

    titleNode.textContent = project.title;
    body.replaceChildren(
      el('p', { class: 'project-card__kind' }, t(`projects.kinds.${project.kind}`)),
      section('overview', el('p', {}, localize(study.overview))),
      study.role && section('role', el('p', {}, localize(study.role))),
      points.length > 0 &&
        section('highlights', el('ul', { class: 'case-study__list' }, points.map((point) => el('li', {}, point)))),
      project.stack && section('stack', stackBreakdown(project.stack)),
      actions(project, 'case-study-title', { withCaseStudy: false }),
    );
  };

  // Open the dialog for the selected project.
  grid.addEventListener('click', (event) => {
    const button = event.target.closest('[data-case-study-open]');
    if (!button) return;
    const project = projects.find((item) => item.id === button.dataset.caseStudyOpen);
    if (!project?.caseStudy) return;

    trigger = button;
    fill(project);
    dialog.showModal();
    dialog.scrollTop = 0;
  });

  $('[data-case-study-close]', dialog)?.addEventListener('click', () => dialog.close());

  // A click whose target is the <dialog> itself landed on the backdrop.
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });

  // Return keyboard focus to the button that opened the dialog.
  dialog.addEventListener('close', () => {
    if (trigger?.isConnected) trigger.focus();
    trigger = null;
  });
}

/** Groups projects into professional and personal/university work. */
const GROUPS = {
  team: (project) => project.kind === 'professional',
  built: (project) => project.kind !== 'professional',
};

/** Initializes project cards, effects, dialogs, and translations. */
export function initProjects() {
  const section = $('#projects');
  if (!section) return;

  // Find the containers for each project group.
  const grids = Object.keys(GROUPS)
    .map((group) => [group, $(`[data-projects="${group}"]`, section)])
    .filter(([, grid]) => grid);

  // Render projects in their groups.
  const render = () => {
    for (const [group, grid] of grids) {
      grid.replaceChildren(...projects.filter(GROUPS[group]).map(renderCard));
      observeReveals(grid);
    }
  };

  render();
  // Delegated listeners on the section cover both grids and survive re-renders.
  enablePointerEffects(section);
  initDialog(section);
  onLangChange(render);
}
