export type Theme = "light" | "dark" | "auto";

export const getSystemTheme = (): "light" | "dark" => {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

export const getStoredTheme = (): Theme | null => {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem("theme");
    return (stored as Theme) || null;
  } catch {
    return null;
  }
};

export const setStoredTheme = (theme: Theme): void => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("theme", theme);
  } catch (error) {
    console.error("Failed to save theme:", error);
  }
};

export const getEffectiveTheme = (theme: Theme): "light" | "dark" => {
  if (theme === "auto") {
    return getSystemTheme();
  }
  return theme;
};

export const applyTheme = (theme: Theme): void => {
  if (typeof window === "undefined") return;

  const effectiveTheme = getEffectiveTheme(theme);
  const root = document.documentElement;

  if (effectiveTheme === "dark") {
    root.classList.add("dark");
    root.classList.remove("light");
  } else {
    root.classList.add("light");
    root.classList.remove("dark");
  }
};

export const watchSystemTheme = (
  callback: (theme: "light" | "dark") => void
): (() => void) => {
  if (typeof window === "undefined") {
    return () => {};
  }

  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const handler = (e: MediaQueryListEvent) => {
    callback(e.matches ? "dark" : "light");
  };

  mediaQuery.addEventListener("change", handler);
  callback(getSystemTheme());

  return () => {
    mediaQuery.removeEventListener("change", handler);
  };
};

export const initializeTheme = (): Theme => {
  const storedTheme = getStoredTheme();
  const theme = storedTheme || "auto";
  applyTheme(theme);
  return theme;
};

