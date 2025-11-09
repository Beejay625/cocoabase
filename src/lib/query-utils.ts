export type QueryParams = Record<string, string | number | boolean | null | undefined>;

export const parseQueryString = (queryString: string = ""): QueryParams => {
  const params: QueryParams = {};

  if (!queryString) {
    if (typeof window !== "undefined") {
      queryString = window.location.search.substring(1);
    } else {
      return params;
    }
  }

  const pairs = queryString.split("&");
  pairs.forEach((pair) => {
    const [key, value] = pair.split("=");
    if (key) {
      const decodedKey = decodeURIComponent(key);
      const decodedValue = value ? decodeURIComponent(value) : "";
      params[decodedKey] = decodedValue;
    }
  });

  return params;
};

export const buildQueryString = (params: QueryParams): string => {
  const pairs: string[] = [];

  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      const encodedKey = encodeURIComponent(key);
      const encodedValue = encodeURIComponent(String(value));
      pairs.push(`${encodedKey}=${encodedValue}`);
    }
  });

  return pairs.length > 0 ? `?${pairs.join("&")}` : "";
};

export const getQueryParam = (key: string, defaultValue?: string): string | null => {
  if (typeof window === "undefined") return defaultValue || null;
  const params = parseQueryString();
  return params[key] ? String(params[key]) : defaultValue || null;
};

export const setQueryParam = (key: string, value: string | number | boolean | null): void => {
  if (typeof window === "undefined") return;

  const params = parseQueryString();
  if (value === null || value === undefined) {
    delete params[key];
  } else {
    params[key] = value;
  }

  const newQueryString = buildQueryString(params);
  const newUrl = `${window.location.pathname}${newQueryString}${window.location.hash}`;
  window.history.pushState({}, "", newUrl);
};

export const removeQueryParam = (key: string): void => {
  setQueryParam(key, null);
};

export const getAllQueryParams = (): QueryParams => {
  return parseQueryString();
};

export const clearQueryParams = (): void => {
  if (typeof window === "undefined") return;
  window.history.pushState({}, "", window.location.pathname + window.location.hash);
};

export const updateQueryParams = (updates: QueryParams): void => {
  if (typeof window === "undefined") return;

  const params = parseQueryString();
  Object.entries(updates).forEach(([key, value]) => {
    if (value === null || value === undefined) {
      delete params[key];
    } else {
      params[key] = value;
    }
  });

  const newQueryString = buildQueryString(params);
  const newUrl = `${window.location.pathname}${newQueryString}${window.location.hash}`;
  window.history.pushState({}, "", newUrl);
};

