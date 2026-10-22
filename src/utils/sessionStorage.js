/**
 * Safe wrapper around window.sessionStorage.
 *
 * Why a wrapper? sessionStorage can throw (Safari private mode, blocked cookies,
 * quota exceeded) and it can contain garbage (old versions, manual edits).
 * Every call is wrapped in try/catch and every read is validated by the caller,
 * so storage problems never crash the app.
 *
 * Keys are namespaced and versioned: bump VERSION to invalidate old data.
 */
const VERSION = 'v1';
const PREFIX = `atlas:${VERSION}:`;

function getStore() {
  try {
    return typeof window !== 'undefined' ? window.sessionStorage : null;
  } catch {
    return null; // even accessing the property can throw
  }
}

export const storage = {
  read(key, fallback = null) {
    const store = getStore();
    if (!store) return fallback;
    try {
      const raw = store.getItem(PREFIX + key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch {
      this.remove(key); // corrupt JSON: drop it
      return fallback;
    }
  },

  write(key, value) {
    const store = getStore();
    if (!store) return false;
    try {
      store.setItem(PREFIX + key, JSON.stringify(value));
      return true;
    } catch {
      return false; // quota exceeded or storage disabled
    }
  },

  remove(key) {
    try {
      getStore()?.removeItem(PREFIX + key);
    } catch {
      /* ignore */
    }
  },
};

/** Cache helpers with a time-to-live. */
export function readCache(key, maxAgeMs) {
  const entry = storage.read(key, null);
  const valid =
    entry && typeof entry === 'object' && typeof entry.savedAt === 'number' && 'data' in entry;
  if (!valid || Date.now() - entry.savedAt > maxAgeMs) return null;
  return entry.data;
}

export function writeCache(key, data) {
  return storage.write(key, { savedAt: Date.now(), data });
}
