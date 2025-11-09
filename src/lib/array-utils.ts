export const groupBy = <T>(
  array: T[],
  keyFn: (item: T) => string
): Record<string, T[]> => {
  return array.reduce((groups, item) => {
    const key = keyFn(item);
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(item);
    return groups;
  }, {} as Record<string, T[]>);
};

export const partition = <T>(
  array: T[],
  predicate: (item: T) => boolean
): [T[], T[]] => {
  const truthy: T[] = [];
  const falsy: T[] = [];

  array.forEach((item) => {
    if (predicate(item)) {
      truthy.push(item);
    } else {
      falsy.push(item);
    }
  });

  return [truthy, falsy];
};

export const unique = <T>(array: T[]): T[] => {
  return Array.from(new Set(array));
};

export const uniqueBy = <T>(array: T[], keyFn: (item: T) => unknown): T[] => {
  const seen = new Set<unknown>();
  return array.filter((item) => {
    const key = keyFn(item);
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
};

export const chunk = <T>(array: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

export const flatten = <T>(arrays: T[][]): T[] => {
  return arrays.reduce((acc, arr) => acc.concat(arr), []);
};

export const zip = <T, U>(array1: T[], array2: U[]): Array<[T, U]> => {
  const length = Math.min(array1.length, array2.length);
  const result: Array<[T, U]> = [];
  for (let i = 0; i < length; i++) {
    result.push([array1[i], array2[i]]);
  }
  return result;
};

export const shuffle = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const sortBy = <T>(
  array: T[],
  keyFn: (item: T) => number | string,
  direction: "asc" | "desc" = "asc"
): T[] => {
  return [...array].sort((a, b) => {
    const aVal = keyFn(a);
    const bVal = keyFn(b);

    if (aVal < bVal) return direction === "asc" ? -1 : 1;
    if (aVal > bVal) return direction === "asc" ? 1 : -1;
    return 0;
  });
};

export const sortByMultiple = <T>(
  array: T[],
  ...sortFns: Array<(item: T) => number | string>
): T[] => {
  return [...array].sort((a, b) => {
    for (const sortFn of sortFns) {
      const aVal = sortFn(a);
      const bVal = sortFn(b);

      if (aVal < bVal) return -1;
      if (aVal > bVal) return 1;
    }
    return 0;
  });
};

export const take = <T>(array: T[], count: number): T[] => {
  return array.slice(0, count);
};

export const takeWhile = <T>(
  array: T[],
  predicate: (item: T) => boolean
): T[] => {
  const result: T[] = [];
  for (const item of array) {
    if (!predicate(item)) break;
    result.push(item);
  }
  return result;
};

export const drop = <T>(array: T[], count: number): T[] => {
  return array.slice(count);
};

export const dropWhile = <T>(
  array: T[],
  predicate: (item: T) => boolean
): T[] => {
  let startIndex = 0;
  for (let i = 0; i < array.length; i++) {
    if (!predicate(array[i])) {
      startIndex = i;
      break;
    }
  }
  return array.slice(startIndex);
};

export const intersection = <T>(array1: T[], array2: T[]): T[] => {
  const set2 = new Set(array2);
  return array1.filter((item) => set2.has(item));
};

export const difference = <T>(array1: T[], array2: T[]): T[] => {
  const set2 = new Set(array2);
  return array1.filter((item) => !set2.has(item));
};

export const union = <T>(array1: T[], array2: T[]): T[] => {
  return unique([...array1, ...array2]);
};

export const countBy = <T>(
  array: T[],
  keyFn: (item: T) => string
): Record<string, number> => {
  return array.reduce((counts, item) => {
    const key = keyFn(item);
    counts[key] = (counts[key] || 0) + 1;
    return counts;
  }, {} as Record<string, number>);
};

export const minBy = <T>(
  array: T[],
  keyFn: (item: T) => number
): T | undefined => {
  if (array.length === 0) return undefined;
  return array.reduce((min, item) =>
    keyFn(item) < keyFn(min) ? item : min
  );
};

export const maxBy = <T>(
  array: T[],
  keyFn: (item: T) => number
): T | undefined => {
  if (array.length === 0) return undefined;
  return array.reduce((max, item) =>
    keyFn(item) > keyFn(max) ? item : max
  );
};

export const sum = (array: number[]): number => {
  return array.reduce((acc, val) => acc + val, 0);
};

export const average = (array: number[]): number => {
  if (array.length === 0) return 0;
  return sum(array) / array.length;
};

export const median = (array: number[]): number => {
  if (array.length === 0) return 0;
  const sorted = [...array].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];
};

export const range = (start: number, end: number, step: number = 1): number[] => {
  const result: number[] = [];
  if (step > 0) {
    for (let i = start; i < end; i += step) {
      result.push(i);
    }
  } else if (step < 0) {
    for (let i = start; i > end; i += step) {
      result.push(i);
    }
  }
  return result;
};

