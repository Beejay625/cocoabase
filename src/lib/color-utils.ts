export type RGB = { r: number; g: number; b: number };
export type HSL = { h: number; s: number; l: number };
export type HEX = string;

export const hexToRgb = (hex: HEX): RGB | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

export const rgbToHex = (r: number, g: number, b: number): HEX => {
  return `#${[r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("")}`;
};

export const rgbToHsl = (r: number, g: number, b: number): HSL => {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
};

export const hslToRgb = (h: number, s: number, l: number): RGB => {
  h /= 360;
  s /= 100;
  l /= 100;

  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
};

export const hexToHsl = (hex: HEX): HSL | null => {
  const rgb = hexToRgb(hex);
  if (!rgb) return null;
  return rgbToHsl(rgb.r, rgb.g, rgb.b);
};

export const hslToHex = (h: number, s: number, l: number): HEX => {
  const rgb = hslToRgb(h, s, l);
  return rgbToHex(rgb.r, rgb.g, rgb.b);
};

export const lighten = (hex: HEX, percent: number): HEX => {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  hsl.l = Math.min(100, hsl.l + percent);
  return hslToHex(hsl.h, hsl.s, hsl.l);
};

export const darken = (hex: HEX, percent: number): HEX => {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  hsl.l = Math.max(0, hsl.l - percent);
  return hslToHex(hsl.h, hsl.s, hsl.l);
};

export const saturate = (hex: HEX, percent: number): HEX => {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  hsl.s = Math.min(100, hsl.s + percent);
  return hslToHex(hsl.h, hsl.s, hsl.l);
};

export const desaturate = (hex: HEX, percent: number): HEX => {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  hsl.s = Math.max(0, hsl.s - percent);
  return hslToHex(hsl.h, hsl.s, hsl.l);
};

export const adjustHue = (hex: HEX, degrees: number): HEX => {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  hsl.h = (hsl.h + degrees) % 360;
  if (hsl.h < 0) hsl.h += 360;
  return hslToHex(hsl.h, hsl.s, hsl.l);
};

export const mix = (color1: HEX, color2: HEX, weight: number = 50): HEX => {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  if (!rgb1 || !rgb2) return color1;

  const w = weight / 100;
  const r = Math.round(rgb1.r * w + rgb2.r * (1 - w));
  const g = Math.round(rgb1.g * w + rgb2.g * (1 - w));
  const b = Math.round(rgb1.b * w + rgb2.b * (1 - w));

  return rgbToHex(r, g, b);
};

export const getContrast = (hex: HEX): "light" | "dark" => {
  const rgb = hexToRgb(hex);
  if (!rgb) return "dark";

  const luminance =
    (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
  return luminance > 0.5 ? "light" : "dark";
};

export const getContrastColor = (hex: HEX): HEX => {
  return getContrast(hex) === "light" ? "#000000" : "#ffffff";
};

export const alpha = (hex: HEX, opacity: number): string => {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
};

export const isValidHex = (hex: string): boolean => {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
};

export const generatePalette = (
  baseColor: HEX,
  count: number = 5
): HEX[] => {
  const rgb = hexToRgb(baseColor);
  if (!rgb) return [];

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const palette: HEX[] = [];

  for (let i = 0; i < count; i++) {
    const lightness = 100 - (i * (100 - hsl.l)) / (count - 1);
    palette.push(hslToHex(hsl.h, hsl.s, lightness));
  }

  return palette;
};

export const getReadableColor = (bgColor: HEX, textColor?: HEX): HEX => {
  if (textColor) {
    const bgRgb = hexToRgb(bgColor);
    const textRgb = hexToRgb(textColor);
    if (!bgRgb || !textRgb) return textColor;

    const bgLum = (0.299 * bgRgb.r + 0.587 * bgRgb.g + 0.114 * bgRgb.b) / 255;
    const textLum =
      (0.299 * textRgb.r + 0.587 * textRgb.g + 0.114 * textRgb.b) / 255;
    const contrast = Math.abs(bgLum - textLum);

    if (contrast < 0.5) {
      return getContrastColor(bgColor);
    }
    return textColor;
  }

  return getContrastColor(bgColor);
};

