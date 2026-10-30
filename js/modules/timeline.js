/**
 * Displays the journey timeline with experience, education, and certifications.
 * Supports filtering, scroll animations, and translations.
 */
import { experience, education, certifications } from '../data/profile.js';
import { $, el, icon } from '../utils/dom.js';
import { formatDuration, formatMonth, isoMonth, monthsBetween, toKey } from '../utils/dates.js';
import { localize, onLangChange, t } from './i18n.js';
import { prefersReducedMotion } from './motion.js';
import { observeReveals } from './reveal.js';

/** Available timeline filters. */
const FILTERS = ['all', 'experience', 'education', 'certification'];
/** Icons used for each timeline entry type. */
const TYPE_ICONS = { experience: 'briefcase', education: 'graduation', certification: 'award' };
/** Checks if the browser supports scroll-driven animations. */
const SUPPORTS_VIEW_TIMELINE = window.CSS?.supports?.('animation-timeline: view()') ?? false;

/** Combines and sorts timeline entries from newest to oldest. */
function buildEntries() {
  // Calculate the start and end dates for each job.
  const jobs = experience.map((job) => {
    const isCurrent = job.roles.some((role) => role.end === null);
    const latestEnd = job.roles.map((role) => role.end).sort((a, b) => toKey(b) - toKey(a))[0];
    return {
      ...job,
      start: job.roles[job.roles.length - 1].start,
      end: isCurrent ? null : latestEnd,
    };
  });
  // Use certification dates as both start and end dates.
  const certs = certifications.map((cert) => ({ ...cert, start: cert.date, end: cert.date }));

  return [...jobs, ...education, ...certs].sort(
    (a, b) => toKey(b.end) - toKey(a.end) || toKey(b.start) - toKey(a.start),
  );
}

/** Creates an accessible hint for links opening in a new tab. */
const newTabHint = () => el('span', { class: 'visually-hidden' }, ` ${t('a11y.newTab')}`);

/** Creates a link that opens in a new tab. */
const externalLink = (href, label, hiddenContext = '') =>
  el(
    'a',
    { class: 'link-arrow', href, target: '_blank', rel: 'noopener noreferrer' },
    label,
    hiddenContext && el('span', { class: 'visually-hidden' }, `: ${hiddenContext}`),
    newTabHint(),
    icon('external', 'icon--sm'),
  );

/** Creates a list of technology labels. */
const chips = (items = []) =>
  items.length
    ? el(
        'ul',
        { class: 'chips', role: 'list', 'aria-label': t('journey.technologies') },
        items.map((item) => el('li', { class: 'chip' }, localize(item))),
      )
    : null;

/** Creates a list of highlights for a timeline entry. */
const highlights = (list) => {
  const items = localize(list) || [];
  return items.length
    ? el('ul', { class: 'timeline-card__highlights', role: 'list' }, items.map((text) => el('li', {}, text)))
    : null;
};

/** Displays a date range and its duration. */
const dateRange = (start, end) =>
  el(
    'p',
    { class: 'timeline-card__date' },
    el('time', { datetime: isoMonth(start) }, formatMonth(start)),
    ' – ',
    end ? el('time', { datetime: isoMonth(end) }, formatMonth(end)) : t('journey.present'),
    ` · ${formatDuration(monthsBetween(start, end))}`,
  );

/** Creates a badge for the timeline entry type. */
const typeBadge = (type) =>
  el('span', { class: `badge badge--${type}` }, icon(TYPE_ICONS[type], 'icon--sm'), t(`journey.types.${type}`));

/** Creates a badge for ongoing experience. */
const currentBadge = () =>
  el('span', { class: 'badge badge--current' }, el('span', { class: 'badge__dot', 'aria-hidden': 'true' }), t('journey.current'));

/** Displays the organization name and location. */
const orgLine = (entry) =>
  el(
    'p',
    { class: 'timeline-card__org' },
    el('span', {}, localize(entry.org)),
    entry.location &&
      el('span', { class: 'timeline-card__location' }, icon('map-pin', 'icon--sm'), localize(entry.location)),
  );

/** Creates a timeline card for work experience. */
function experienceCard(entry, titleId) {
  const meta = el('div', { class: 'timeline-card__meta' }, typeBadge('experience'), entry.end === null && currentBadge());
  // Display a simple card for jobs with one role.
  if (entry.roles.length === 1) {
    const [role] = entry.roles;
    return [
      meta,
      dateRange(role.start, role.end),
      el('h3', { class: 'timeline-card__title', id: titleId }, localize(role.title)),
      orgLine(entry),
      highlights(role.highlights),
      chips(role.tech),
    ];
  }

  // Show career progression for jobs with multiple roles.
  const steps = el(
    'ol',
    { class: 'role-steps', role: 'list' },
    entry.roles.map((role, index) =>
      el(
        'li',
        { class: 'role-step' },
        index < entry.roles.length - 1 &&
          el('p', { class: 'role-step__promotion' }, icon('trending-up', 'icon--sm'), t('journey.promoted')),
        el('h4', { class: 'role-step__title' }, localize(role.title)),
        dateRange(role.start, role.end),
        highlights(role.highlights),
        chips(role.tech),
      ),
    ),
  );

  return [
    meta,
    dateRange(entry.start, entry.end),
    el('h3', { class: 'timeline-card__title', id: titleId }, localize(entry.org)),
    entry.location &&
      el(
        'p',
        { class: 'timeline-card__location' },
        icon('map-pin', 'icon--sm'),
        `${localize(entry.location)} · ${localize(entry.employment)}`,
      ),
    steps,
  ];
}

/** Creates a timeline card for education. */
function educationCard(entry, titleId) {
  const repos = entry.relatedRepos ?? [];
  return [
    el('div', { class: 'timeline-card__meta' }, typeBadge('education')),
    dateRange(entry.start, entry.end),
    el('h3', { class: 'timeline-card__title', id: titleId }, localize(entry.title)),
    orgLine(entry),
    entry.field && el('p', { class: 'timeline-card__date' }, localize(entry.field)),
    repos.length > 0 && el('p', { class: 'timeline-card__credential' }, t('journey.universityProjects')),
    repos.length > 0 &&
      el(
        'ul',
        { class: 'timeline-card__links', role: 'list', 'aria-label': t('journey.universityProjects') },
        repos.map((repo) => el('li', {}, externalLink(repo.url, repo.name))),
      ),
  ];
}

/** Creates a timeline card for certifications. */
function certificationCard(entry, titleId) {
  const title = localize(entry.title);
  return [
    el('div', { class: 'timeline-card__meta' }, typeBadge('certification')),
    el(
      'p',
      { class: 'timeline-card__date' },
      `${t('journey.issued')} `,
      el('time', { datetime: isoMonth(entry.date) }, formatMonth(entry.date)),
    ),
    el('h3', { class: 'timeline-card__title', id: titleId }, title),
    orgLine(entry),
    entry.credentialId &&
      el('p', { class: 'timeline-card__credential' }, `${t('journey.credentialId')}: ${entry.credentialId}`),
    chips(entry.tech),
    (entry.credentialUrl || entry.relatedRepo) &&
      el(
        'div',
        { class: 'timeline-card__links' },
        entry.credentialUrl && externalLink(entry.credentialUrl, t('journey.viewCredential'), title),
        entry.relatedRepo &&
          externalLink(entry.relatedRepo.url, `${t('journey.relatedProject')}: ${entry.relatedRepo.name}`),
      ),
  ];
}

/** Matches each timeline entry type to its card builder. */
const CARD_BUILDERS = {
  experience: experienceCard,
  education: educationCard,
  certification: certificationCard,
};

/** Creates a timeline item using the correct card type. */
function renderItem(entry) {
  const titleId = `tl-${entry.id}-title`;
  return el(
    'li',
    {
      class: 'timeline__item',
      dataset: { type: entry.type, reveal: 'left', revealKey: `tl-${entry.id}` },
      'data-current': entry.end === null,
      style: { 'view-transition-name': `tl-${entry.id}` },
    },
    el('span', { class: 'timeline__node', 'aria-hidden': 'true' }, icon(entry.icon ?? TYPE_ICONS[entry.type])),
    el('article', { class: 'timeline-card', 'aria-labelledby': titleId }, CARD_BUILDERS[entry.type](entry, titleId)),
  );
}

/** Initializes the timeline, filters, and scroll effects. */
export function initTimeline() {
  const root = $('[data-timeline]');
  const list = $('[data-timeline-list]');
  const filterGroup = $('[data-timeline-filters]');
  const status = $('[data-timeline-status]');
  if (!root || !list || !filterGroup) return;

  // Prepare timeline entries and filter counts.
  const entries = buildEntries();
  const counts = Object.fromEntries(
    FILTERS.map((filter) => [filter, filter === 'all' ? entries.length : entries.filter((e) => e.type === filter).length]),
  );

  // Remember timeline nodes that have already been reached.
  const reached = new Set();
  let activeFilter = 'all';

  // Highlight timeline nodes when they enter the screen.
  const reachObserver =
    'IntersectionObserver' in window
      ? new IntersectionObserver(
          (records) => {
            for (const record of records) {
              if (!record.isIntersecting) continue;
              record.target.classList.add('is-reached');
              reached.add(record.target.dataset.revealKey);
              reachObserver.unobserve(record.target);
            }
          },
          { rootMargin: '0px 0px -40% 0px' },
        )
      : null;

  // Create filter buttons with their entry counts.
  const renderFilters = () => {
    filterGroup.replaceChildren(
      ...FILTERS.map((filter) =>
        el(
          'button',
          {
            class: 'filter-btn',
            type: 'button',
            'aria-pressed': String(filter === activeFilter),
            dataset: { filter },
          },
          t(`journey.filters.${filter}`),
          el('span', { class: 'filter-btn__count' }, String(counts[filter])),
        ),
      ),
    );
  };

  // Show matching entries and update the filter state.
  const applyFilter = () => {
    let visibleIndex = 0;
    for (const item of list.children) {
      const visible = activeFilter === 'all' || item.dataset.type === activeFilter;
      item.hidden = !visible;
      if (visible) {
        // Alternate visible cards between left and right.
        const side = visibleIndex % 2 === 0 ? 'left' : 'right';
        item.dataset.side = side;
        item.dataset.reveal = side;
        visibleIndex += 1;
      }
    }

    // Update selected buttons and visible entry count.
    for (const button of filterGroup.children) {
      button.setAttribute('aria-pressed', String(button.dataset.filter === activeFilter));
    }

    if (status) status.textContent = t('journey.status', { count: visibleIndex, total: entries.length });
  };

  // Apply the selected filter when a button is clicked.
  filterGroup.addEventListener('click', (event) => {
    const button = event.target.closest('[data-filter]');
    if (!button || button.dataset.filter === activeFilter) return;
    activeFilter = button.dataset.filter;

    // Animate filtering when supported and motion is allowed.
    if (document.startViewTransition && !prefersReducedMotion()) {
      document.startViewTransition(applyFilter);
    } else {
      applyFilter();
    }
  });

  // Display timeline entries and restore reached nodes.
  const renderList = () => {
    list.replaceChildren(...entries.map(renderItem));
    applyFilter();
    observeReveals(list);

    for (const item of list.children) {
      if (reached.has(item.dataset.revealKey) || !reachObserver) item.classList.add('is-reached');
      else reachObserver.observe(item);
    }
  };

  // Update timeline progress manually if CSS animations are unsupported.
  if (!SUPPORTS_VIEW_TIMELINE) {
    let ticking = false;
    // Calculate how far the user has scrolled through the timeline.
    const updateSpine = () => {
      ticking = false;
      const rect = root.getBoundingClientRect();
      const progress = Math.min(Math.max((window.innerHeight / 2 - rect.top) / rect.height, 0), 1);
      root.style.setProperty('--timeline-progress', progress.toFixed(4));
    };
    // Limit scroll updates to one per animation frame.
    window.addEventListener(
      'scroll',
      () => {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(updateSpine);
      },
      { passive: true },
    );
    updateSpine();
  }

  renderFilters();
  renderList();
  // Refresh translated content when the language changes.
  onLangChange(() => {
    renderFilters();
    renderList();
  });
}
