export type SortDirection = "asc" | "desc";

export type SortConfig<T> = {
  key: keyof T | ((item: T) => unknown);
  direction?: SortDirection;
};

export const sortBy = <T>(
  array: T[],
  key: keyof T | ((item: T) => unknown),
  direction: SortDirection = "asc"
): T[] => {
  return [...array].sort((a, b) => {
    const aVal = typeof key === "function" ? key(a) : a[key];
    const bVal = typeof key === "function" ? key(b) : b[key];

    if (aVal === bVal) return 0;
    if (aVal === null || aVal === undefined) return 1;
    if (bVal === null || bVal === undefined) return -1;

    const comparison = aVal < bVal ? -1 : 1;
    return direction === "asc" ? comparison : -comparison;
  });
};

export const sortByMultiple = <T>(
  array: T[],
  ...configs: SortConfig<T>[]
): T[] => {
  return [...array].sort((a, b) => {
    for (const config of configs) {
      const key = config.key;
      const direction = config.direction || "asc";

      const aVal = typeof key === "function" ? key(a) : a[key];
      const bVal = typeof key === "function" ? key(b) : b[key];

      if (aVal === bVal) continue;
      if (aVal === null || aVal === undefined) return 1;
      if (bVal === null || bVal === undefined) return -1;

      const comparison = aVal < bVal ? -1 : 1;
      const result = direction === "asc" ? comparison : -comparison;
      if (result !== 0) return result;
    }
    return 0;
  });
};

export const sortByString = <T>(
  array: T[],
  key: keyof T | ((item: T) => string),
  direction: SortDirection = "asc",
  locale: string = "en"
): T[] => {
  return [...array].sort((a, b) => {
    const aVal = typeof key === "function" ? key(a) : (a[key] as string);
    const bVal = typeof key === "function" ? key(b) : (b[key] as string);

    const comparison = aVal.localeCompare(bVal, locale, {
      sensitivity: "base",
      numeric: true,
    });

    return direction === "asc" ? comparison : -comparison;
  });
};

export const sortByNumber = <T>(
  array: T[],
  key: keyof T | ((item: T) => number),
  direction: SortDirection = "asc"
): T[] => {
  return [...array].sort((a, b) => {
    const aVal = typeof key === "function" ? key(a) : (a[key] as number);
    const bVal = typeof key === "function" ? key(b) : (b[key] as number);

    const comparison = aVal - bVal;
    return direction === "asc" ? comparison : -comparison;
  });
};

export const sortByDate = <T>(
  array: T[],
  key: keyof T | ((item: T) => string | Date),
  direction: SortDirection = "asc"
): T[] => {
  return [...array].sort((a, b) => {
    const aVal = typeof key === "function" ? key(a) : (a[key] as string | Date);
    const bVal = typeof key === "function" ? key(b) : (b[key] as string | Date);

    const aDate = typeof aVal === "string" ? new Date(aVal).getTime() : aVal.getTime();
    const bDate = typeof bVal === "string" ? new Date(bVal).getTime() : bVal.getTime();

    const comparison = aDate - bDate;
    return direction === "asc" ? comparison : -comparison;
  });
};

export const sortByBoolean = <T>(
  array: T[],
  key: keyof T | ((item: T) => boolean),
  direction: SortDirection = "asc"
): T[] => {
  return [...array].sort((a, b) => {
    const aVal = typeof key === "function" ? key(a) : (a[key] as boolean);
    const bVal = typeof key === "function" ? key(b) : (b[key] as boolean);

    const comparison = aVal === bVal ? 0 : aVal ? 1 : -1;
    return direction === "asc" ? comparison : -comparison;
  });
};

export const sortByArrayLength = <T>(
  array: T[],
  key: keyof T | ((item: T) => unknown[]),
  direction: SortDirection = "asc"
): T[] => {
  return [...array].sort((a, b) => {
    const aVal = typeof key === "function" ? key(a) : (a[key] as unknown[]);
    const bVal = typeof key === "function" ? key(b) : (b[key] as unknown[]);

    const comparison = (aVal?.length || 0) - (bVal?.length || 0);
    return direction === "asc" ? comparison : -comparison;
  });
};

export const naturalSort = <T>(
  array: T[],
  key: keyof T | ((item: T) => string),
  direction: SortDirection = "asc"
): T[] => {
  const collator = new Intl.Collator(undefined, {
    numeric: true,
    sensitivity: "base",
  });

  return [...array].sort((a, b) => {
    const aVal = String(typeof key === "function" ? key(a) : a[key]);
    const bVal = String(typeof key === "function" ? key(b) : b[key]);

    const comparison = collator.compare(aVal, bVal);
    return direction === "asc" ? comparison : -comparison;
  });
};

export const shuffle = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const reverse = <T>(array: T[]): T[] => {
  return [...array].reverse();
};

export const createSortFunction = <T>(
  ...configs: SortConfig<T>[]
): (a: T, b: T) => number => {
  return (a: T, b: T) => {
    for (const config of configs) {
      const key = config.key;
      const direction = config.direction || "asc";

      const aVal = typeof key === "function" ? key(a) : a[key];
      const bVal = typeof key === "function" ? key(b) : b[key];

      if (aVal === bVal) continue;
      if (aVal === null || aVal === undefined) return 1;
      if (bVal === null || bVal === undefined) return -1;

      const comparison = aVal < bVal ? -1 : 1;
      const result = direction === "asc" ? comparison : -comparison;
      if (result !== 0) return result;
    }
    return 0;
  };
};

