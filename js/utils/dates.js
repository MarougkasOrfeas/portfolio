/**
 * Date helpers for formatting dates and calculating durations.
 * Uses YYYY-MM format and includes both start and end months.
 */
import { getLang, getLocale, t } from '../modules/i18n.js';

/** Converts a YYYY-MM string into a year and month. */
const parse = (ym) => {
  const [year, month] = ym.split('-').map(Number);
  return { year, month };
};

/** Returns the current year and month in YYYY-MM format. */
const nowYm = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
};

/** Converts a date into a number for sorting and comparisons. */
export const toKey = (ym) => {
  const { year, month } = parse(ym ?? nowYm());
  return year * 12 + month;
};

/** Calculates the number of months between two dates, including both months. */
export const monthsBetween = (start, end) => toKey(end) - toKey(start) + 1;

/** Formats a date as a short month and year in the selected language. */
export function formatMonth(ym) {
  const { year, month } = parse(ym);
  return new Intl.DateTimeFormat(getLocale(), { month: 'short', year: 'numeric' }).format(new Date(year, month - 1, 1));
}

/** Formats a duration into years and months in the selected language. */
export function formatDuration(totalMonths) {
  const plural = new Intl.PluralRules(getLang());
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const parts = [];

  // Add years and months using the correct singular or plural form.
  if (years) parts.push(t(`duration.year.${plural.select(years) === 'one' ? 'one' : 'other'}`, { n: years }));
  if (months) parts.push(t(`duration.month.${plural.select(months) === 'one' ? 'one' : 'other'}`, { n: months }));

  return parts.join(' ');
}

/** Returns a date in YYYY-MM format for HTML time elements. */
export const isoMonth = (ym) => ym ?? nowYm();
