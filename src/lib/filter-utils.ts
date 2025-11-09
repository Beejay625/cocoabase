export type FilterOperator = "eq" | "ne" | "gt" | "gte" | "lt" | "lte" | "in" | "notIn" | "contains" | "startsWith" | "endsWith" | "between";

export type FilterCondition<T> = {
  field: keyof T | ((item: T) => unknown);
  operator: FilterOperator;
  value: unknown | unknown[];
};

export const filterBy = <T>(
  array: T[],
  condition: FilterCondition<T>
): T[] => {
  return array.filter((item) => {
    const fieldValue = typeof condition.field === "function"
      ? condition.field(item)
      : item[condition.field];

    return evaluateCondition(fieldValue, condition.operator, condition.value);
  });
};

export const filterByMultiple = <T>(
  array: T[],
  conditions: FilterCondition<T>[],
  logic: "AND" | "OR" = "AND"
): T[] => {
  return array.filter((item) => {
    if (logic === "AND") {
      return conditions.every((condition) => {
        const fieldValue = typeof condition.field === "function"
          ? condition.field(item)
          : item[condition.field];
        return evaluateCondition(fieldValue, condition.operator, condition.value);
      });
    } else {
      return conditions.some((condition) => {
        const fieldValue = typeof condition.field === "function"
          ? condition.field(item)
          : item[condition.field];
        return evaluateCondition(fieldValue, condition.operator, condition.value);
      });
    }
  });
};

const evaluateCondition = (
  fieldValue: unknown,
  operator: FilterOperator,
  filterValue: unknown | unknown[]
): boolean => {
  switch (operator) {
    case "eq":
      return fieldValue === filterValue;
    case "ne":
      return fieldValue !== filterValue;
    case "gt":
      return (fieldValue as number) > (filterValue as number);
    case "gte":
      return (fieldValue as number) >= (filterValue as number);
    case "lt":
      return (fieldValue as number) < (filterValue as number);
    case "lte":
      return (fieldValue as number) <= (filterValue as number);
    case "in":
      return Array.isArray(filterValue) && filterValue.includes(fieldValue);
    case "notIn":
      return Array.isArray(filterValue) && !filterValue.includes(fieldValue);
    case "contains":
      return String(fieldValue).toLowerCase().includes(String(filterValue).toLowerCase());
    case "startsWith":
      return String(fieldValue).toLowerCase().startsWith(String(filterValue).toLowerCase());
    case "endsWith":
      return String(fieldValue).toLowerCase().endsWith(String(filterValue).toLowerCase());
    case "between":
      if (!Array.isArray(filterValue) || filterValue.length !== 2) return false;
      const [min, max] = filterValue as [number, number];
      return (fieldValue as number) >= min && (fieldValue as number) <= max;
    default:
      return false;
  }
};

export const filterByRange = <T>(
  array: T[],
  key: keyof T | ((item: T) => number),
  min: number,
  max: number
): T[] => {
  return array.filter((item) => {
    const value = typeof key === "function" ? key(item) : (item[key] as number);
    return value >= min && value <= max;
  });
};

export const filterByDateRange = <T>(
  array: T[],
  key: keyof T | ((item: T) => string | Date),
  start: Date,
  end: Date
): T[] => {
  return array.filter((item) => {
    const value = typeof key === "function" ? key(item) : (item[key] as string | Date);
    const date = typeof value === "string" ? new Date(value) : value;
    return date >= start && date <= end;
  });
};

export const filterByText = <T>(
  array: T[],
  searchText: string,
  keys: Array<keyof T | ((item: T) => string)>
): T[] => {
  if (!searchText.trim()) return array;
  const lowerSearch = searchText.toLowerCase();

  return array.filter((item) => {
    return keys.some((key) => {
      const value = typeof key === "function" ? key(item) : String(item[key]);
      return value.toLowerCase().includes(lowerSearch);
    });
  });
};

export const filterByTruthy = <T>(
  array: T[],
  key: keyof T | ((item: T) => unknown)
): T[] => {
  return array.filter((item) => {
    const value = typeof key === "function" ? key(item) : item[key];
    return Boolean(value);
  });
};

export const filterByFalsy = <T>(
  array: T[],
  key: keyof T | ((item: T) => unknown)
): T[] => {
  return array.filter((item) => {
    const value = typeof key === "function" ? key(item) : item[key];
    return !Boolean(value);
  });
};

export const filterByNull = <T>(
  array: T[],
  key: keyof T | ((item: T) => unknown)
): T[] => {
  return array.filter((item) => {
    const value = typeof key === "function" ? key(item) : item[key];
    return value === null || value === undefined;
  });
};

export const filterByNotNull = <T>(
  array: T[],
  key: keyof T | ((item: T) => unknown)
): T[] => {
  return array.filter((item) => {
    const value = typeof key === "function" ? key(item) : item[key];
    return value !== null && value !== undefined;
  });
};

export const filterUnique = <T>(
  array: T[],
  key?: keyof T | ((item: T) => unknown)
): T[] => {
  if (!key) {
    return Array.from(new Set(array));
  }

  const seen = new Set<unknown>();
  return array.filter((item) => {
    const value = typeof key === "function" ? key(item) : item[key];
    if (seen.has(value)) {
      return false;
    }
    seen.add(value);
    return true;
  });
};

export const filterDuplicates = <T>(
  array: T[],
  key?: keyof T | ((item: T) => unknown)
): T[] => {
  if (!key) {
    const seen = new Set<T>();
    const duplicates: T[] = [];
    array.forEach((item) => {
      if (seen.has(item)) {
        duplicates.push(item);
      } else {
        seen.add(item);
      }
    });
    return duplicates;
  }

  const seen = new Map<unknown, T[]>();
  array.forEach((item) => {
    const value = typeof key === "function" ? key(item) : item[key];
    if (!seen.has(value)) {
      seen.set(value, []);
    }
    seen.get(value)!.push(item);
  });

  return Array.from(seen.values())
    .filter((group) => group.length > 1)
    .flat();
};

export const createFilterFunction = <T>(
  condition: FilterCondition<T>
): (item: T) => boolean => {
  return (item: T) => {
    const fieldValue = typeof condition.field === "function"
      ? condition.field(item)
      : item[condition.field];
    return evaluateCondition(fieldValue, condition.operator, condition.value);
  };
};

