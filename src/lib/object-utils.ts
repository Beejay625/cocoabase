export const pick = <T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> => {
  const result = {} as Pick<T, K>;
  keys.forEach((key) => {
    if (key in obj) {
      result[key] = obj[key];
    }
  });
  return result;
};

export const omit = <T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> => {
  const result = { ...obj };
  keys.forEach((key) => {
    delete result[key];
  });
  return result as Omit<T, K>;
};

export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as unknown as T;
  }

  if (obj instanceof Array) {
    return obj.map((item) => deepClone(item)) as unknown as T;
  }

  if (typeof obj === "object") {
    const cloned = {} as T;
    Object.keys(obj).forEach((key) => {
      (cloned as Record<string, unknown>)[key] = deepClone(
        (obj as Record<string, unknown>)[key]
      );
    });
    return cloned;
  }

  return obj;
};

export const deepMerge = <T extends Record<string, unknown>>(
  target: T,
  ...sources: Partial<T>[]
): T => {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(source[key])) {
        if (!target[key] || !isObject(target[key])) {
          (target as Record<string, unknown>)[key] = {};
        }
        deepMerge(
          target[key] as Record<string, unknown>,
          source[key] as Record<string, unknown>
        );
      } else {
        (target as Record<string, unknown>)[key] = source[key];
      }
    });
  }

  return deepMerge(target, ...sources);
};

const isObject = (item: unknown): item is Record<string, unknown> => {
  return item !== null && typeof item === "object" && !Array.isArray(item);
};

export const flattenObject = (
  obj: Record<string, unknown>,
  prefix: string = "",
  separator: string = "."
): Record<string, unknown> => {
  const flattened: Record<string, unknown> = {};

  Object.keys(obj).forEach((key) => {
    const newKey = prefix ? `${prefix}${separator}${key}` : key;
    const value = obj[key];

    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      Object.assign(flattened, flattenObject(value as Record<string, unknown>, newKey, separator));
    } else {
      flattened[newKey] = value;
    }
  });

  return flattened;
};

export const unflattenObject = (
  obj: Record<string, unknown>,
  separator: string = "."
): Record<string, unknown> => {
  const unflattened: Record<string, unknown> = {};

  Object.keys(obj).forEach((key) => {
    const keys = key.split(separator);
    let current = unflattened;

    for (let i = 0; i < keys.length - 1; i++) {
      const k = keys[i];
      if (!(k in current) || typeof current[k] !== "object" || Array.isArray(current[k])) {
        current[k] = {};
      }
      current = current[k] as Record<string, unknown>;
    }

    current[keys[keys.length - 1]] = obj[key];
  });

  return unflattened;
};

export const get = <T>(
  obj: Record<string, unknown>,
  path: string,
  defaultValue?: T
): T | undefined => {
  const keys = path.split(".");
  let current: unknown = obj;

  for (const key of keys) {
    if (current === null || current === undefined || typeof current !== "object") {
      return defaultValue;
    }
    current = (current as Record<string, unknown>)[key];
  }

  return (current as T) ?? defaultValue;
};

export const set = (
  obj: Record<string, unknown>,
  path: string,
  value: unknown
): void => {
  const keys = path.split(".");
  let current = obj;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!(key in current) || typeof current[key] !== "object" || Array.isArray(current[key])) {
      current[key] = {};
    }
    current = current[key] as Record<string, unknown>;
  }

  current[keys[keys.length - 1]] = value;
};

export const has = (obj: Record<string, unknown>, path: string): boolean => {
  const keys = path.split(".");
  let current: unknown = obj;

  for (const key of keys) {
    if (current === null || current === undefined || typeof current !== "object") {
      return false;
    }
    if (!(key in (current as Record<string, unknown>))) {
      return false;
    }
    current = (current as Record<string, unknown>)[key];
  }

  return true;
};

export const isEmpty = (obj: unknown): boolean => {
  if (obj === null || obj === undefined) return true;
  if (typeof obj === "string" || Array.isArray(obj)) return obj.length === 0;
  if (typeof obj === "object") return Object.keys(obj).length === 0;
  return false;
};

export const isEqual = (a: unknown, b: unknown): boolean => {
  if (a === b) return true;
  if (a === null || b === null || a === undefined || b === undefined) return false;
  if (typeof a !== typeof b) return false;

  if (typeof a === "object" && typeof b === "object") {
    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) return false;
      return a.every((item, index) => isEqual(item, b[index]));
    }

    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) return false;

    return keysA.every((key) => {
      return (
        keysB.includes(key) &&
        isEqual(
          (a as Record<string, unknown>)[key],
          (b as Record<string, unknown>)[key]
        )
      );
    });
  }

  return false;
};

export const invert = <T extends Record<string, string>>(obj: T): Record<string, string> => {
  const inverted: Record<string, string> = {};
  Object.keys(obj).forEach((key) => {
    inverted[obj[key]] = key;
  });
  return inverted;
};

export const mapKeys = <T extends Record<string, unknown>>(
  obj: T,
  fn: (key: string) => string
): Record<string, unknown> => {
  const mapped: Record<string, unknown> = {};
  Object.keys(obj).forEach((key) => {
    mapped[fn(key)] = obj[key];
  });
  return mapped;
};

export const mapValues = <T extends Record<string, unknown>, U>(
  obj: T,
  fn: (value: unknown, key: string) => U
): Record<string, U> => {
  const mapped: Record<string, U> = {} as Record<string, U>;
  Object.keys(obj).forEach((key) => {
    mapped[key] = fn(obj[key], key);
  });
  return mapped;
};

export const defaults = <T extends Record<string, unknown>>(
  obj: T,
  ...defaults: Partial<T>[]
): T => {
  const result = { ...obj };
  defaults.forEach((defaultObj) => {
    Object.keys(defaultObj).forEach((key) => {
      if (!(key in result)) {
        (result as Record<string, unknown>)[key] = defaultObj[key];
      }
    });
  });
  return result;
};

export const compact = <T extends Record<string, unknown>>(obj: T): Partial<T> => {
  const compacted: Partial<T> = {};
  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    if (value !== null && value !== undefined && value !== "" && !(Array.isArray(value) && value.length === 0)) {
      (compacted as Record<string, unknown>)[key] = value;
    }
  });
  return compacted;
};

