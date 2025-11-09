export type ChartDataPoint = {
  label: string;
  value: number;
  color?: string;
};

export type ChartDataset = {
  label: string;
  data: number[];
  backgroundColor?: string | string[];
  borderColor?: string | string[];
  borderWidth?: number;
};

export const generateColorPalette = (
  count: number,
  saturation: number = 70,
  lightness: number = 50
): string[] => {
  const colors: string[] = [];
  const hueStep = 360 / count;

  for (let i = 0; i < count; i++) {
    const hue = i * hueStep;
    colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
  }

  return colors;
};

export const generateGradientColors = (
  baseColor: string,
  count: number,
  opacity: number = 1
): string[] => {
  const colors: string[] = [];
  const step = opacity / count;

  for (let i = 0; i < count; i++) {
    const currentOpacity = opacity - i * step;
    colors.push(`${baseColor}${Math.round(currentOpacity * 255).toString(16).padStart(2, '0')}`);
  }

  return colors;
};

export const normalizeChartData = (
  data: number[],
  min: number = 0,
  max: number = 100
): number[] => {
  const dataMin = Math.min(...data);
  const dataMax = Math.max(...data);
  const range = dataMax - dataMin;

  if (range === 0) {
    return data.map(() => (min + max) / 2);
  }

  return data.map((value) => {
    const normalized = ((value - dataMin) / range) * (max - min) + min;
    return Math.round(normalized * 100) / 100;
  });
};

export const calculateChartStatistics = (data: number[]): {
  min: number;
  max: number;
  average: number;
  median: number;
  sum: number;
} => {
  if (data.length === 0) {
    return { min: 0, max: 0, average: 0, median: 0, sum: 0 };
  }

  const sorted = [...data].sort((a, b) => a - b);
  const sum = data.reduce((a, b) => a + b, 0);
  const average = sum / data.length;
  const median =
    sorted.length % 2 === 0
      ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
      : sorted[Math.floor(sorted.length / 2)];

  return {
    min: sorted[0],
    max: sorted[sorted.length - 1],
    average: Math.round(average * 100) / 100,
    median: Math.round(median * 100) / 100,
    sum: Math.round(sum * 100) / 100,
  };
};

export const formatChartLabel = (
  value: number,
  format: "number" | "currency" | "percentage" | "compact" = "number"
): string => {
  switch (format) {
    case "currency":
      return new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value);
    case "percentage":
      return `${value.toFixed(1)}%`;
    case "compact":
      if (value >= 1_000_000) {
        return `${(value / 1_000_000).toFixed(1)}M`;
      }
      if (value >= 1_000) {
        return `${(value / 1_000).toFixed(1)}K`;
      }
      return value.toFixed(0);
    default:
      return value.toLocaleString();
  }
};

export const createTimeSeriesData = (
  data: Array<{ date: string | Date; value: number }>,
  interval: "day" | "week" | "month" = "day"
): ChartDataPoint[] => {
  const grouped = new Map<string, { sum: number; count: number }>();

  data.forEach((item) => {
    const date = typeof item.date === "string" ? new Date(item.date) : item.date;
    let key: string;

    switch (interval) {
      case "week":
        const weekStart = new Date(date);
        weekStart.setDate(date.getDate() - date.getDay());
        key = weekStart.toISOString().split("T")[0];
        break;
      case "month":
        key = `${date.getFullYear()}-${date.getMonth()}`;
        break;
      default:
        key = date.toISOString().split("T")[0];
    }

    const existing = grouped.get(key) || { sum: 0, count: 0 };
    grouped.set(key, {
      sum: existing.sum + item.value,
      count: existing.count + 1,
    });
  });

  return Array.from(grouped.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, { sum, count }]) => ({
      label: key,
      value: Math.round((sum / count) * 100) / 100,
    }));
};

export const calculateTrendLine = (
  data: number[]
): { slope: number; intercept: number; points: number[] } => {
  if (data.length === 0) {
    return { slope: 0, intercept: 0, points: [] };
  }

  const n = data.length;
  const x = Array.from({ length: n }, (_, i) => i);
  const sumX = x.reduce((a, b) => a + b, 0);
  const sumY = data.reduce((a, b) => a + b, 0);
  const sumXY = x.reduce((sum, xi, i) => sum + xi * data[i], 0);
  const sumX2 = x.reduce((sum, xi) => sum + xi * xi, 0);

  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  const points = x.map((xi) => Math.round((slope * xi + intercept) * 100) / 100);

  return {
    slope: Math.round(slope * 1000) / 1000,
    intercept: Math.round(intercept * 100) / 100,
    points,
  };
};

export const smoothData = (
  data: number[],
  windowSize: number = 3
): number[] => {
  if (data.length === 0) return [];
  if (windowSize >= data.length) {
    const avg = data.reduce((a, b) => a + b, 0) / data.length;
    return data.map(() => avg);
  }

  const smoothed: number[] = [];
  for (let i = 0; i < data.length; i++) {
    const start = Math.max(0, i - Math.floor(windowSize / 2));
    const end = Math.min(data.length, i + Math.ceil(windowSize / 2));
    const window = data.slice(start, end);
    const avg = window.reduce((a, b) => a + b, 0) / window.length;
    smoothed.push(Math.round(avg * 100) / 100);
  }

  return smoothed;
};

export const detectAnomalies = (
  data: number[],
  threshold: number = 2
): number[] => {
  if (data.length === 0) return [];

  const mean = data.reduce((a, b) => a + b, 0) / data.length;
  const variance =
    data.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / data.length;
  const stdDev = Math.sqrt(variance);
  const lowerBound = mean - threshold * stdDev;
  const upperBound = mean + threshold * stdDev;

  return data
    .map((value, index) => ({ value, index }))
    .filter(({ value }) => value < lowerBound || value > upperBound)
    .map(({ index }) => index);
};

