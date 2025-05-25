interface CacheItem<T> {
  value: T;
  timestamp: number;
}

interface CacheOptions {
  ttl: number; // Time to live in seconds
}

const DEFAULT_TTL = 60; // 60 seconds default TTL

// In-memory cache for server-side
const memoryCache = new Map<string, CacheItem<any>>();

export class Cache {
  private static isClient = typeof window !== 'undefined';

  static set<T>(key: string, value: T, options: CacheOptions = { ttl: DEFAULT_TTL }): void {
    const item: CacheItem<T> = {
      value,
      timestamp: Date.now() + (options.ttl * 1000)
    };

    if (this.isClient) {
      localStorage.setItem(key, JSON.stringify(item));
    } else {
      memoryCache.set(key, item);
    }
  }

  static get<T>(key: string): T | null {
    const now = Date.now();

    if (this.isClient) {
      const item = localStorage.getItem(key);
      if (!item) return null;

      const cacheItem: CacheItem<T> = JSON.parse(item);
      if (now > cacheItem.timestamp) {
        localStorage.removeItem(key);
        return null;
      }
      return cacheItem.value;
    } else {
      const cacheItem = memoryCache.get(key);
      if (!cacheItem) return null;

      if (now > cacheItem.timestamp) {
        memoryCache.delete(key);
        return null;
      }
      return cacheItem.value;
    }
  }

  static remove(key: string): void {
    if (this.isClient) {
      localStorage.removeItem(key);
    } else {
      memoryCache.delete(key);
    }
  }

  static clear(): void {
    if (this.isClient) {
      localStorage.clear();
    } else {
      memoryCache.clear();
    }
  }
}