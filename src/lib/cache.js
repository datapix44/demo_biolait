/** Cache LRU minimaliste en memoire (Map = ordre d'insertion). */
export class LruCache {
  /** @param {number} maxEntries */
  constructor(maxEntries) {
    this.maxEntries = Math.max(0, maxEntries);
    this.store = new Map();
    this.hits = 0;
    this.misses = 0;
  }

  get(key) {
    if (!this.store.has(key)) {
      this.misses += 1;
      return undefined;
    }
    const value = this.store.get(key);
    // Reinsertion : l'entree redevient la plus recemment utilisee.
    this.store.delete(key);
    this.store.set(key, value);
    this.hits += 1;
    return value;
  }

  set(key, value) {
    if (this.maxEntries === 0) return;
    if (this.store.has(key)) this.store.delete(key);
    this.store.set(key, value);
    while (this.store.size > this.maxEntries) {
      this.store.delete(this.store.keys().next().value);
    }
  }

  get size() {
    return this.store.size;
  }

  clear() {
    this.store.clear();
  }
}
