export const parseUrl = (url: string): {
  protocol: string;
  host: string;
  hostname: string;
  port: string;
  pathname: string;
  search: string;
  hash: string;
} | null => {
  try {
    const parsed = new URL(url);
    return {
      protocol: parsed.protocol,
      host: parsed.host,
      hostname: parsed.hostname,
      port: parsed.port,
      pathname: parsed.pathname,
      search: parsed.search,
      hash: parsed.hash,
    };
  } catch {
    return null;
  }
};

export const buildUrl = (
  base: string,
  params?: Record<string, string | number | boolean | null | undefined>
): string => {
  try {
    const url = new URL(base);
    if (params) {
      Object.keys(params).forEach((key) => {
        const value = params[key];
        if (value !== null && value !== undefined) {
          url.searchParams.set(key, String(value));
        }
      });
    }
    return url.toString();
  } catch {
    return base;
  }
};

export const parseQueryString = (
  queryString: string
): Record<string, string> => {
  const params: Record<string, string> = {};
  const searchParams = new URLSearchParams(queryString);
  searchParams.forEach((value, key) => {
    params[key] = value;
  });
  return params;
};

export const buildQueryString = (
  params: Record<string, string | number | boolean | null | undefined>
): string => {
  const searchParams = new URLSearchParams();
  Object.keys(params).forEach((key) => {
    const value = params[key];
    if (value !== null && value !== undefined) {
      searchParams.set(key, String(value));
    }
  });
  return searchParams.toString();
};

export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const isAbsoluteUrl = (url: string): boolean => {
  return /^https?:\/\//i.test(url);
};

export const isRelativeUrl = (url: string): boolean => {
  return !isAbsoluteUrl(url);
};

export const normalizeUrl = (url: string): string => {
  try {
    const parsed = new URL(url);
    parsed.hash = "";
    parsed.search = "";
    return parsed.toString();
  } catch {
    return url;
  }
};

export const getDomain = (url: string): string | null => {
  try {
    return new URL(url).hostname;
  } catch {
    return null;
  }
};

export const getProtocol = (url: string): string | null => {
  try {
    return new URL(url).protocol.slice(0, -1);
  } catch {
    return null;
  }
};

export const addQueryParam = (
  url: string,
  key: string,
  value: string | number | boolean
): string => {
  try {
    const parsed = new URL(url);
    parsed.searchParams.set(key, String(value));
    return parsed.toString();
  } catch {
    return url;
  }
};

export const removeQueryParam = (url: string, key: string): string => {
  try {
    const parsed = new URL(url);
    parsed.searchParams.delete(key);
    return parsed.toString();
  } catch {
    return url;
  }
};

export const getQueryParam = (url: string, key: string): string | null => {
  try {
    const parsed = new URL(url);
    return parsed.searchParams.get(key);
  } catch {
    return null;
  }
};

export const hasQueryParam = (url: string, key: string): boolean => {
  try {
    const parsed = new URL(url);
    return parsed.searchParams.has(key);
  } catch {
    return false;
  }
};

export const updateQueryParams = (
  url: string,
  params: Record<string, string | number | boolean | null | undefined>
): string => {
  try {
    const parsed = new URL(url);
    Object.keys(params).forEach((key) => {
      const value = params[key];
      if (value === null || value === undefined) {
        parsed.searchParams.delete(key);
      } else {
        parsed.searchParams.set(key, String(value));
      }
    });
    return parsed.toString();
  } catch {
    return url;
  }
};

export const removeAllQueryParams = (url: string): string => {
  try {
    const parsed = new URL(url);
    parsed.search = "";
    return parsed.toString();
  } catch {
    return url;
  }
};

export const encodeUrl = (url: string): string => {
  return encodeURIComponent(url);
};

export const decodeUrl = (url: string): string => {
  try {
    return decodeURIComponent(url);
  } catch {
    return url;
  }
};

export const getPathSegments = (url: string): string[] => {
  try {
    const parsed = new URL(url);
    return parsed.pathname
      .split("/")
      .filter((segment) => segment.length > 0);
  } catch {
    return url.split("/").filter((segment) => segment.length > 0);
  }
};

export const joinPath = (...segments: string[]): string => {
  return segments
    .map((segment) => segment.replace(/^\/+|\/+$/g, ""))
    .filter((segment) => segment.length > 0)
    .join("/");
};

export const resolveUrl = (base: string, relative: string): string => {
  try {
    return new URL(relative, base).toString();
  } catch {
    return relative;
  }
};

export const shortenUrl = (url: string, maxLength: number = 50): string => {
  if (url.length <= maxLength) return url;
  const parsed = parseUrl(url);
  if (!parsed) return truncate(url, maxLength);
  return `${parsed.hostname}...${url.slice(-(maxLength - parsed.hostname.length - 3))}`;
};

const truncate = (str: string, maxLength: number): string => {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 3) + "...";
};

