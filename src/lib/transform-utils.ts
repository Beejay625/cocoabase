export const map = <T, U>(
  array: T[],
  fn: (item: T, index: number) => U
): U[] => {
  return array.map(fn);
};

export const flatMap = <T, U>(
  array: T[],
  fn: (item: T, index: number) => U | U[]
): U[] => {
  return array.flatMap(fn);
};

export const groupBy = <T, K extends string | number>(
  array: T[],
  keyFn: (item: T) => K
): Record<K, T[]> => {
  return array.reduce((groups, item) => {
    const key = keyFn(item);
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(item);
    return groups;
  }, {} as Record<K, T[]>);
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

export const chunk = <T>(array: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

export const zip = <T, U>(array1: T[], array2: U[]): Array<[T, U]> => {
  const length = Math.min(array1.length, array2.length);
  const result: Array<[T, U]> = [];
  for (let i = 0; i < length; i++) {
    result.push([array1[i], array2[i]]);
  }
  return result;
};

export const unzip = <T, U>(zipped: Array<[T, U]>): [T[], U[]] => {
  const array1: T[] = [];
  const array2: U[] = [];
  zipped.forEach(([item1, item2]) => {
    array1.push(item1);
    array2.push(item2);
  });
  return [array1, array2];
};

export const transpose = <T>(matrix: T[][]): T[][] => {
  if (matrix.length === 0) return [];
  const rows = matrix.length;
  const cols = matrix[0].length;
  const transposed: T[][] = [];

  for (let j = 0; j < cols; j++) {
    transposed[j] = [];
    for (let i = 0; i < rows; i++) {
      transposed[j][i] = matrix[i][j];
    }
  }

  return transposed;
};

export const flatten = <T>(arrays: T[][]): T[] => {
  return arrays.reduce((acc, arr) => acc.concat(arr), []);
};

export const flattenDeep = <T>(arrays: unknown[]): T[] => {
  const result: T[] = [];
  arrays.forEach((item) => {
    if (Array.isArray(item)) {
      result.push(...flattenDeep<T>(item));
    } else {
      result.push(item as T);
    }
  });
  return result;
};

export const rotate = <T>(array: T[], positions: number): T[] => {
  const len = array.length;
  if (len === 0) return array;
  const normalizedPositions = ((positions % len) + len) % len;
  return [...array.slice(normalizedPositions), ...array.slice(0, normalizedPositions)];
};

export const shuffle = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const sample = <T>(array: T[], count: number = 1): T[] => {
  const shuffled = shuffle(array);
  return shuffled.slice(0, Math.min(count, array.length));
};

export const sampleOne = <T>(array: T[]): T | undefined => {
  if (array.length === 0) return undefined;
  return array[Math.floor(Math.random() * array.length)];
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

export const symmetricDifference = <T>(array1: T[], array2: T[]): T[] => {
  return union(difference(array1, array2), difference(array2, array1));
};

export const compact = <T>(array: Array<T | null | undefined | false | 0 | "">): T[] => {
  return array.filter((item) => Boolean(item)) as T[];
};

export const fill = <T>(array: T[], value: T, start: number = 0, end?: number): T[] => {
  const filled = [...array];
  filled.fill(value, start, end);
  return filled;
};

export const repeat = <T>(item: T, count: number): T[] => {
  return Array(count).fill(item);
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

export const countBy = <T>(
  array: T[],
  keyFn: (item: T) => string | number
): Record<string | number, number> => {
  return array.reduce((counts, item) => {
    const key = keyFn(item);
    counts[key] = (counts[key] || 0) + 1;
    return counts;
  }, {} as Record<string | number, number>);
};

export const keyBy = <T, K extends string | number>(
  array: T[],
  keyFn: (item: T) => K
): Record<K, T> => {
  return array.reduce((obj, item) => {
    const key = keyFn(item);
    obj[key] = item;
    return obj;
  }, {} as Record<K, T>);
};

export const indexBy = <T, K extends string | number>(
  array: T[],
  keyFn: (item: T) => K
): Map<K, T> => {
  const map = new Map<K, T>();
  array.forEach((item) => {
    map.set(keyFn(item), item);
  });
  return map;
};

export const pluck = <T, K extends keyof T>(
  array: T[],
  key: K
): Array<T[K]> => {
  return array.map((item) => item[key]);
};

export const omit = <T, K extends keyof T>(
  array: T[],
  keys: K[]
): Array<Omit<T, K>> => {
  return array.map((item) => {
    const result = { ...item };
    keys.forEach((key) => {
      delete result[key];
    });
    return result as Omit<T, K>;
  });
};

export const pick = <T, K extends keyof T>(
  array: T[],
  keys: K[]
): Array<Pick<T, K>> => {
  return array.map((item) => {
    const result = {} as Pick<T, K>;
    keys.forEach((key) => {
      result[key] = item[key];
    });
    return result;
  });
};

