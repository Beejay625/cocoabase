export const createMockData = <T>(
  generator: (index: number) => T,
  count: number = 10
): T[] => {
  return Array.from({ length: count }, (_, i) => generator(i));
};

export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const mockApiCall = <T>(
  data: T,
  delayMs: number = 500
): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delayMs);
  });
};

export const mockApiError = (
  message: string = "Mock error",
  delayMs: number = 500
): Promise<never> => {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error(message)), delayMs);
  });
};

export const createMockFunction = <Args extends unknown[], Return>(
  returnValue: Return | ((...args: Args) => Return)
) => {
  const calls: Args[] = [];
  const fn = (...args: Args): Return => {
    calls.push(args);
    return typeof returnValue === "function"
      ? (returnValue as (...args: Args) => Return)(...args)
      : returnValue;
  };
  fn.calls = calls;
  return fn;
};

export const waitFor = async (
  condition: () => boolean,
  timeout: number = 5000,
  interval: number = 100
): Promise<void> => {
  const startTime = Date.now();
  while (Date.now() - startTime < timeout) {
    if (condition()) {
      return;
    }
    await delay(interval);
  }
  throw new Error("Condition not met within timeout");
};

export const mockLocalStorage = (): Storage => {
  const store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      Object.keys(store).forEach((key) => delete store[key]);
    },
    get length() {
      return Object.keys(store).length;
    },
    key: (index: number) => {
      const keys = Object.keys(store);
      return keys[index] || null;
    },
  };
};

export const generateId = (prefix: string = "id"): string => {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const createTestPlantation = (overrides?: Partial<unknown>) => {
  return {
    id: generateId("plantation"),
    name: `Test Plantation ${Date.now()}`,
    stage: "seedling",
    createdAt: new Date().toISOString(),
    ...overrides,
  };
};

export const createTestTask = (overrides?: Partial<unknown>) => {
  return {
    id: generateId("task"),
    title: `Test Task ${Date.now()}`,
    status: "pending",
    priority: "medium",
    createdAt: new Date().toISOString(),
    ...overrides,
  };
};

export const mockDate = (dateString: string): void => {
  const mockDate = new Date(dateString);
  jest.spyOn(global, "Date").mockImplementation(() => mockDate as unknown as Date);
};

export const restoreDate = (): void => {
  jest.restoreAllMocks();
};

export const createFormDataMock = (
  data: Record<string, string | File>
): FormData => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value);
  });
  return formData;
};

export const assertEqual = <T>(actual: T, expected: T, message?: string): void => {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(
      message ||
        `Expected ${JSON.stringify(expected)}, but got ${JSON.stringify(actual)}`
    );
  }
};

export const assertTruthy = <T>(value: T, message?: string): asserts value is NonNullable<T> => {
  if (!value) {
    throw new Error(message || `Expected truthy value, but got ${value}`);
  }
};

export const assertFalsy = (value: unknown, message?: string): void => {
  if (value) {
    throw new Error(message || `Expected falsy value, but got ${value}`);
  }
};

export const assertThrows = (
  fn: () => void,
  errorMessage?: string
): void => {
  let threw = false;
  try {
    fn();
  } catch (error) {
    threw = true;
    if (errorMessage && error instanceof Error) {
      if (!error.message.includes(errorMessage)) {
        throw new Error(
          `Expected error message to include "${errorMessage}", but got "${error.message}"`
        );
      }
    }
  }
  if (!threw) {
    throw new Error("Expected function to throw, but it didn't");
  }
};

