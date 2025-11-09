type StorageOptions = {
  prefix?: string;
  ttl?: number; // Time to live in milliseconds
};

class StorageManager {
  private prefix: string;
  private ttl?: number;

  constructor(options: StorageOptions = {}) {
    this.prefix = options.prefix || "cocoa";
    this.ttl = options.ttl;
  }

  private getKey(key: string): string {
    return `${this.prefix}:${key}`;
  }

  set<T>(key: string, value: T): void {
    if (typeof window === "undefined") return;

    try {
      const item = {
        value,
        timestamp: Date.now(),
        ttl: this.ttl,
      };
      localStorage.setItem(this.getKey(key), JSON.stringify(item));
    } catch (error) {
      console.warn(`[storage] Failed to set ${key}`, error);
    }
  }

  get<T>(key: string): T | null {
    if (typeof window === "undefined") return null;

    try {
      const itemStr = localStorage.getItem(this.getKey(key));
      if (!itemStr) return null;

      const item = JSON.parse(itemStr) as {
        value: T;
        timestamp: number;
        ttl?: number;
      };

      // Check TTL
      if (item.ttl) {
        const age = Date.now() - item.timestamp;
        if (age > item.ttl) {
          this.remove(key);
          return null;
        }
      }

      return item.value;
    } catch (error) {
      console.warn(`[storage] Failed to get ${key}`, error);
      return null;
    }
  }

  remove(key: string): void {
    if (typeof window === "undefined") return;

    try {
      localStorage.removeItem(this.getKey(key));
    } catch (error) {
      console.warn(`[storage] Failed to remove ${key}`, error);
    }
  }

  clear(pattern?: string): void {
    if (typeof window === "undefined") return;

    try {
      if (pattern) {
        const keys = Object.keys(localStorage);
        keys.forEach((key) => {
          if (key.startsWith(this.getKey(pattern))) {
            localStorage.removeItem(key);
          }
        });
      } else {
        const keys = Object.keys(localStorage);
        keys.forEach((key) => {
          if (key.startsWith(`${this.prefix}:`)) {
            localStorage.removeItem(key);
          }
        });
      }
    } catch (error) {
      console.warn(`[storage] Failed to clear`, error);
    }
  }

  has(key: string): boolean {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(this.getKey(key)) !== null;
  }

  getAllKeys(): string[] {
    if (typeof window === "undefined") return [];

    try {
      const keys = Object.keys(localStorage);
      const prefix = `${this.prefix}:`;
      return keys
        .filter((key) => key.startsWith(prefix))
        .map((key) => key.slice(prefix.length));
    } catch (error) {
      console.warn(`[storage] Failed to get all keys`, error);
      return [];
    }
  }
}

export const storage = new StorageManager({ prefix: "cocoa" });

export const createStorageManager = (options: StorageOptions) => {
  return new StorageManager(options);
};

export const getStorageSize = (): number => {
  if (typeof window === "undefined") return 0;

  let total = 0;
  for (const key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      total += localStorage[key].length + key.length;
    }
  }
  return total;
};

export const getStorageUsage = (): {
  used: number;
  available: number;
  percentage: number;
} => {
  if (typeof window === "undefined") {
    return { used: 0, available: 0, percentage: 0 };
  }

  // Most browsers have ~5-10MB limit
  const limit = 5 * 1024 * 1024; // 5MB
  const used = getStorageSize();

  return {
    used,
    available: limit - used,
    percentage: Math.round((used / limit) * 100),
  };
};

export const clearExpiredItems = (): number => {
  if (typeof window === "undefined") return 0;

  let cleared = 0;
  const now = Date.now();

  try {
    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
      try {
        const itemStr = localStorage.getItem(key);
        if (!itemStr) return;

        const item = JSON.parse(itemStr) as {
          timestamp: number;
          ttl?: number;
        };

        if (item.ttl && now - item.timestamp > item.ttl) {
          localStorage.removeItem(key);
          cleared++;
        }
      } catch {
        // Skip invalid items
      }
    });
  } catch (error) {
    console.warn(`[storage] Failed to clear expired items`, error);
  }

  return cleared;
};

