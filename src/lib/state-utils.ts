export type StateUpdate<T> = T | ((prev: T) => T);

export const createState = <T>(initialValue: T) => {
  let state = initialValue;
  const listeners = new Set<(value: T) => void>();

  return {
    get(): T {
      return state;
    },
    set(newValue: StateUpdate<T>): void {
      state = typeof newValue === "function" ? (newValue as (prev: T) => T)(state) : newValue;
      listeners.forEach((listener) => listener(state));
    },
    subscribe(listener: (value: T) => void): () => void {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    reset(): void {
      state = initialValue;
      listeners.forEach((listener) => listener(state));
    },
  };
};

export const createReducer = <State, Action>(
  reducer: (state: State, action: Action) => State,
  initialState: State
) => {
  let state = initialState;
  const listeners = new Set<(state: State) => void>();

  return {
    getState(): State {
      return state;
    },
    dispatch(action: Action): void {
      state = reducer(state, action);
      listeners.forEach((listener) => listener(state));
    },
    subscribe(listener: (state: State) => void): () => void {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    reset(): void {
      state = initialState;
      listeners.forEach((listener) => listener(state));
    },
  };
};

export const createSelector = <State, Result>(
  select: (state: State) => Result
) => {
  return select;
};

export const createComputed = <State, Result>(
  selectors: Array<(state: State) => unknown>,
  compute: (...values: unknown[]) => Result
) => {
  return (state: State): Result => {
    const values = selectors.map((selector) => selector(state));
    return compute(...values);
  };
};

export const combineStates = <States extends Record<string, unknown>>(
  states: { [K in keyof States]: ReturnType<typeof createState<States[K]>> }
) => {
  const listeners = new Set<() => void>();
  const unsubscribeFunctions: Array<() => void> = [];

  const getState = (): States => {
    const result = {} as States;
    for (const key in states) {
      result[key] = states[key].get();
    }
    return result;
  };

  const subscribe = (listener: () => void): () => void => {
    listeners.add(listener);

    unsubscribeFunctions.push(
      ...Object.values(states).map((state) =>
        state.subscribe(() => {
          listeners.forEach((l) => l());
        })
      )
    );

    return () => {
      listeners.delete(listener);
      unsubscribeFunctions.forEach((unsub) => unsub());
      unsubscribeFunctions.length = 0;
    };
  };

  return {
    getState,
    subscribe,
  };
};

export const shallowEqual = <T>(a: T, b: T): boolean => {
  if (Object.is(a, b)) return true;

  if (
    typeof a !== "object" ||
    a === null ||
    typeof b !== "object" ||
    b === null
  ) {
    return false;
  }

  const keysA = Object.keys(a) as Array<keyof T>;
  const keysB = Object.keys(b) as Array<keyof T>;

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (let i = 0; i < keysA.length; i++) {
    const key = keysA[i];
    if (!Object.prototype.hasOwnProperty.call(b, key) || !Object.is(a[key], b[key])) {
      return false;
    }
  }

  return true;
};

export const deepEqual = <T>(a: T, b: T): boolean => {
  if (Object.is(a, b)) return true;

  if (
    typeof a !== "object" ||
    a === null ||
    typeof b !== "object" ||
    b === null
  ) {
    return false;
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((item, index) => deepEqual(item, b[index]));
  }

  const keysA = Object.keys(a) as Array<keyof T>;
  const keysB = Object.keys(b) as Array<keyof T>;

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (let i = 0; i < keysA.length; i++) {
    const key = keysA[i];
    if (
      !Object.prototype.hasOwnProperty.call(b, key) ||
      !deepEqual(a[key], b[key])
    ) {
      return false;
    }
  }

  return true;
};

