/**
 * localStorage access that never throws (private mode, blocked storage).
 * Used only for per-visitor conveniences: language and motion preference.
 */

export function readStorage(key) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function writeStorage(key, value) {
  try {
    if (value == null) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, value);
  } catch {
    /* storage unavailable: the preference simply won't persist */
  }
}
