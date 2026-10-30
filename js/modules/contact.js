/**
 * Contact section: handles email links, copying email, and toast messages.
 */
import { profile } from '../data/profile.js';
import { $ } from '../utils/dom.js';
import { t } from './i18n.js';

/** Duration of toast messages in milliseconds. */
const TOAST_DURATION = 3200;

/** Displays a temporary notification message. */
function showToast(message) {
  const toast = $('[data-toast]');
  if (!toast) return;
  // Reset the timer when a new message appears.
  window.clearTimeout(showToast.timer);
  toast.textContent = message;
  toast.setAttribute('data-visible', '');
  // Hide the toast after the specified duration.
  showToast.timer = window.setTimeout(() => {
    toast.removeAttribute('data-visible');
    // Clear the message after the fade-out animation.
    showToast.timer = window.setTimeout(() => {
      toast.textContent = '';
    }, 600);
  }, TOAST_DURATION);
}

/** Initializes email contact and copy-to-clipboard actions. */
export function initContact() {
  const { email } = profile;
  if (!email) return;
  // Set up the email link.
  const mailLink = $('[data-email-link]');
  if (mailLink) {
    mailLink.href = `mailto:${email}`;
    mailLink.hidden = false;
  }
  // Enable copying if the browser supports it.
  const copyButton = $('[data-copy-email]');
  if (!copyButton || !navigator.clipboard) return;

  copyButton.hidden = false;
  copyButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(email);
      showToast(t('contact.copied'));
    } catch {
      showToast(t('contact.copyFailed', { email }));
    }
  });
}
