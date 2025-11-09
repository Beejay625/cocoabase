import type { Plantation } from "@/store/plantations";

export type StatisticsSummary = {
  total: number;
  byStage: {
    planted: number;
    growing: number;
    harvested: number;
  };
  byRegion: Record<string, number>;
  averageAge: number;
  averageHealth: number;
  totalCarbon: number;
  totalTrees: number;
  totalArea: number;
  taskCompletionRate: number;
  collaboratorEngagement: number;
};

export const calculateStatistics = (
  plantations: Plantation[],
  getHealthScore: (plantation: Plantation) => number
): StatisticsSummary => {
  if (plantations.length === 0) {
    return {
      total: 0,
      byStage: { planted: 0, growing: 0, harvested: 0 },
      byRegion: {},
      averageAge: 0,
      averageHealth: 0,
      totalCarbon: 0,
      totalTrees: 0,
      totalArea: 0,
      taskCompletionRate: 0,
      collaboratorEngagement: 0,
    };
  }

  const now = Date.now();
  let totalAge = 0;
  let totalHealth = 0;
  let totalCarbon = 0;
  let totalTrees = 0;
  let totalArea = 0;
  let totalTasks = 0;
  let completedTasks = 0;
  let totalCollaborators = 0;

  const byStage = {
    planted: 0,
    growing: 0,
    harvested: 0,
  };

  const byRegion: Record<string, number> = {};

  plantations.forEach((plantation) => {
    // Stage distribution
    byStage[plantation.stage]++;

    // Region distribution
    if (plantation.location) {
      const region = plantation.location.split(",")[0].trim();
      byRegion[region] = (byRegion[region] || 0) + 1;
    }

    // Age calculation
    const startTime = new Date(plantation.startDate).getTime();
    const age = Math.floor((now - startTime) / (1000 * 60 * 60 * 24));
    totalAge += age;

    // Health score
    const health = getHealthScore(plantation);
    totalHealth += health;

    // Sustainability metrics
    totalCarbon += plantation.carbonOffsetTons;
    totalTrees += plantation.treeCount;
    totalArea += plantation.areaHectares;

    // Task metrics
    totalTasks += plantation.tasks.length;
    completedTasks += plantation.tasks.filter(
      (task) => task.status === "completed"
    ).length;

    // Collaborator metrics
    totalCollaborators += plantation.collaborators.length;
  });

  return {
    total: plantations.length,
    byStage,
    byRegion,
    averageAge: Math.round(totalAge / plantations.length),
    averageHealth: Math.round((totalHealth / plantations.length) * 10) / 10,
    totalCarbon: Math.round(totalCarbon * 100) / 100,
    totalTrees,
    totalArea: Math.round(totalArea * 100) / 100,
    taskCompletionRate:
      totalTasks > 0
        ? Math.round((completedTasks / totalTasks) * 1000) / 10
        : 0,
    collaboratorEngagement:
      plantations.length > 0
        ? Math.round((totalCollaborators / plantations.length) * 10) / 10
        : 0,
  };
};

export const calculateTrend = (
  current: number,
  previous: number
): {
  value: number;
  percentage: number;
  direction: "up" | "down" | "neutral";
} => {
  if (previous === 0) {
    return {
      value: current,
      percentage: current > 0 ? 100 : 0,
      direction: current > 0 ? "up" : "neutral",
    };
  }

  const diff = current - previous;
  const percentage = Math.round((diff / previous) * 1000) / 10;

  return {
    value: diff,
    percentage: Math.abs(percentage),
    direction:
      percentage > 0 ? "up" : percentage < 0 ? "down" : "neutral",
  };
};

export const calculatePercentile = (
  value: number,
  values: number[]
): number => {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const index = sorted.findIndex((v) => v >= value);
  if (index === -1) return 100;
  return Math.round((index / sorted.length) * 100);
};

export const calculateCorrelation = (
  x: number[],
  y: number[]
): number => {
  if (x.length !== y.length || x.length === 0) return 0;

  const n = x.length;
  const sumX = x.reduce((a, b) => a + b, 0);
  const sumY = y.reduce((a, b) => a + b, 0);
  const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0);
  const sumX2 = x.reduce((sum, xi) => sum + xi * xi, 0);
  const sumY2 = y.reduce((sum, yi) => sum + yi * yi, 0);

  const numerator = n * sumXY - sumX * sumY;
  const denominator = Math.sqrt(
    (n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY)
  );

  if (denominator === 0) return 0;
  return Math.round((numerator / denominator) * 1000) / 1000;
};

export const calculateMovingAverage = (
  values: number[],
  window: number
): number[] => {
  if (values.length === 0) return [];
  if (window >= values.length) {
    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    return values.map(() => avg);
  }

  const result: number[] = [];
  for (let i = 0; i < values.length; i++) {
    const start = Math.max(0, i - window + 1);
    const windowValues = values.slice(start, i + 1);
    const avg =
      windowValues.reduce((a, b) => a + b, 0) / windowValues.length;
    result.push(Math.round(avg * 100) / 100);
  }
  return result;
};

export const calculateVariance = (values: number[]): number => {
  if (values.length === 0) return 0;
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const squaredDiffs = values.map((v) => Math.pow(v - mean, 2));
  const variance =
    squaredDiffs.reduce((a, b) => a + b, 0) / values.length;
  return Math.round(variance * 100) / 100;
};

export const calculateStandardDeviation = (values: number[]): number => {
  const variance = calculateVariance(values);
  return Math.round(Math.sqrt(variance) * 100) / 100;
};

export const findOutliers = (
  values: number[],
  threshold: number = 2
): number[] => {
  if (values.length === 0) return [];
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const stdDev = calculateStandardDeviation(values);
  const lowerBound = mean - threshold * stdDev;
  const upperBound = mean + threshold * stdDev;

  return values.filter((v) => v < lowerBound || v > upperBound);
};

export const calculateGrowthRate = (
  current: number,
  previous: number,
  timePeriod: number
): number => {
  if (previous === 0 || timePeriod === 0) return 0;
  const rate = ((current - previous) / previous / timePeriod) * 100;
  return Math.round(rate * 100) / 100;
};

export const calculateCompoundGrowthRate = (
  values: number[]
): number => {
  if (values.length < 2) return 0;
  const first = values[0];
  const last = values[values.length - 1];
  const periods = values.length - 1;
  if (first === 0 || periods === 0) return 0;
  const cagr = (Math.pow(last / first, 1 / periods) - 1) * 100;
  return Math.round(cagr * 100) / 100;
};

