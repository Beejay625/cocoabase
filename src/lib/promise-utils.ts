export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const timeout = <T>(
  promise: Promise<T>,
  ms: number,
  errorMessage?: string
): Promise<T> => {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(
        () => reject(new Error(errorMessage || `Operation timed out after ${ms}ms`)),
        ms
      )
    ),
  ]);
};

export const retry = async <T>(
  fn: () => Promise<T>,
  maxAttempts: number = 3,
  delayMs: number = 1000,
  exponentialBackoff: boolean = true
): Promise<T> => {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      if (attempt < maxAttempts) {
        const waitTime = exponentialBackoff
          ? delayMs * Math.pow(2, attempt - 1)
          : delayMs;
        await delay(waitTime);
      }
    }
  }

  throw lastError || new Error("Retry failed");
};

export const allSettled = async <T>(
  promises: Promise<T>[]
): Promise<Array<{ status: "fulfilled" | "rejected"; value?: T; error?: Error }>> => {
  return Promise.all(
    promises.map((promise) =>
      promise
        .then((value) => ({ status: "fulfilled" as const, value }))
        .catch((error) => ({
          status: "rejected" as const,
          error: error instanceof Error ? error : new Error(String(error)),
        }))
    )
  );
};

export const race = <T>(promises: Promise<T>[]): Promise<T> => {
  return Promise.race(promises);
};

export const sequence = async <T>(
  promises: Array<() => Promise<T>>
): Promise<T[]> => {
  const results: T[] = [];
  for (const promiseFn of promises) {
    results.push(await promiseFn());
  }
  return results;
};

export const parallel = async <T>(
  promises: Array<() => Promise<T>>,
  concurrency: number = 5
): Promise<T[]> => {
  const results: T[] = [];
  const executing: Promise<void>[] = [];

  for (const promiseFn of promises) {
    const promise = promiseFn().then((result) => {
      results.push(result);
      executing.splice(executing.indexOf(promise), 1);
    });
    executing.push(promise);

    if (executing.length >= concurrency) {
      await Promise.race(executing);
    }
  }

  await Promise.all(executing);
  return results;
};

export const debounce = <T extends (...args: unknown[]) => Promise<unknown>>(
  fn: T,
  delayMs: number
): ((...args: Parameters<T>) => Promise<ReturnType<T>>) => {
  let timeoutId: NodeJS.Timeout | null = null;
  let lastPromise: Promise<ReturnType<T>> | null = null;

  return async (...args: Parameters<T>): Promise<ReturnType<T>> => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    return new Promise((resolve) => {
      timeoutId = setTimeout(async () => {
        const result = await fn(...args);
        resolve(result as ReturnType<T>);
        timeoutId = null;
      }, delayMs);
    });
  };
};

export const throttle = <T extends (...args: unknown[]) => Promise<unknown>>(
  fn: T,
  delayMs: number
): ((...args: Parameters<T>) => Promise<ReturnType<T>>) => {
  let lastCall = 0;
  let lastPromise: Promise<ReturnType<T>> | null = null;

  return async (...args: Parameters<T>): Promise<ReturnType<T>> => {
    const now = Date.now();
    const timeSinceLastCall = now - lastCall;

    if (timeSinceLastCall >= delayMs) {
      lastCall = now;
      lastPromise = fn(...args) as Promise<ReturnType<T>>;
      return lastPromise;
    }

    if (lastPromise) {
      return lastPromise;
    }

    lastCall = now;
    lastPromise = fn(...args) as Promise<ReturnType<T>>;
    return lastPromise;
  };
};

export const createPromise = <T>(): {
  promise: Promise<T>;
  resolve: (value: T) => void;
  reject: (error: Error) => void;
} => {
  let resolve!: (value: T) => void;
  let reject!: (error: Error) => void;

  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });

  return { promise, resolve, reject };
};

export const waitFor = async (
  condition: () => boolean,
  timeoutMs: number = 5000,
  intervalMs: number = 100
): Promise<void> => {
  const startTime = Date.now();

  return new Promise((resolve, reject) => {
    const check = () => {
      if (condition()) {
        resolve();
      } else if (Date.now() - startTime > timeoutMs) {
        reject(new Error("Condition not met within timeout"));
      } else {
        setTimeout(check, intervalMs);
      }
    };
    check();
  });
};

export const mapAsync = async <T, U>(
  array: T[],
  fn: (item: T, index: number) => Promise<U>
): Promise<U[]> => {
  return Promise.all(array.map(fn));
};

export const filterAsync = async <T>(
  array: T[],
  fn: (item: T, index: number) => Promise<boolean>
): Promise<T[]> => {
  const results = await Promise.all(array.map(fn));
  return array.filter((_, index) => results[index]);
};

export const reduceAsync = async <T, U>(
  array: T[],
  fn: (acc: U, item: T, index: number) => Promise<U>,
  initial: U
): Promise<U> => {
  let acc = initial;
  for (let i = 0; i < array.length; i++) {
    acc = await fn(acc, array[i], i);
  }
  return acc;
};

