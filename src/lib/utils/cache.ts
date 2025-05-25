interface CacheItem<T> {
  value: T;
  timestamp: number;
}

interface CacheOptions {
  ttl: number; // Time to live in seconds
}

const DEFAULT_TTL = 60; // 60 seconds default TTL

export class Cache {
  static set<T>(key: string, value: T, options: CacheOptions = { ttl: DEFAULT_TTL }): void {
    const item: CacheItem<T> = {
      value,
      timestamp: Date.now() + (options.ttl * 1000)
    };
    localStorage.setItem(key, JSON.stringify(item));
  }

  static get<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    if (!item) return null;

    const cacheItem: CacheItem<T> = JSON.parse(item);
    const now = Date.now();

    if (now > cacheItem.timestamp) {
      localStorage.removeItem(key);
      return null;
    }

    return cacheItem.value;
  }

  static remove(key: string): void {
    localStorage.removeItem(key);
  }

  static clear(): void {
    localStorage.clear();
  }
}