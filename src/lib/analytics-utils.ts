export type EfficiencyMetric = 
  | "yield-efficiency"
  | "cost-efficiency"
  | "labor-efficiency"
  | "water-efficiency"
  | "carbon-efficiency";

export interface EfficiencyScore {
  metric: EfficiencyMetric;
  value: number;
  target: number;
  score: number;
  trend: "improving" | "declining" | "stable";
}

export interface ProductivityIndex {
  category: string;
  value: number;
  benchmark: number;
  percentage: number;
}

export interface GrowthMetric {
  period: string;
  value: number;
  previousValue: number;
  growthRate: number;
  growthPercentage: number;
}

export const calculateYieldEfficiency = (
  actualYield: number,
  expectedYield: number
): number => {
  if (expectedYield === 0) return 0;
  return (actualYield / expectedYield) * 100;
};

export const calculateCostEfficiency = (
  revenue: number,
  totalCosts: number
): number => {
  if (totalCosts === 0) return 0;
  return (revenue / totalCosts) * 100;
};

export const calculateLaborEfficiency = (
  output: number,
  laborHours: number
): number => {
  if (laborHours === 0) return 0;
  return output / laborHours;
};

export const calculateWaterEfficiency = (
  yieldAmount: number,
  waterUsed: number
): number => {
  if (waterUsed === 0) return 0;
  return yieldAmount / waterUsed;
};

export const calculateEfficiencyScore = (
  value: number,
  target: number
): number => {
  if (target === 0) return 0;
  const ratio = value / target;
  return Math.min(100, Math.max(0, ratio * 100));
};

export const calculateProductivityIndex = (
  actual: number,
  benchmark: number
): ProductivityIndex => {
  const percentage = benchmark > 0 ? (actual / benchmark) * 100 : 0;
  return {
    category: "productivity",
    value: actual,
    benchmark,
    percentage,
  };
};

export const calculateGrowthRate = (
  currentValue: number,
  previousValue: number
): GrowthMetric => {
  const growthRate = previousValue !== 0 ? (currentValue - previousValue) / previousValue : 0;
  const growthPercentage = growthRate * 100;

  return {
    period: "current",
    value: currentValue,
    previousValue,
    growthRate,
    growthPercentage,
  };
};

export const calculateCompoundGrowthRate = (
  values: number[]
): number => {
  if (values.length < 2) return 0;

  const first = values[0];
  const last = values[values.length - 1];
  const periods = values.length - 1;

  if (first === 0) return 0;

  return (Math.pow(last / first, 1 / periods) - 1) * 100;
};

export const calculateEfficiencyTrend = (
  values: number[]
): "improving" | "declining" | "stable" => {
  if (values.length < 2) return "stable";

  const recent = values.slice(-3);
  const older = values.slice(0, Math.max(0, values.length - 3));

  if (older.length === 0) return "stable";

  const recentAvg = recent.reduce((a, b) => a + b, 0) / recent.length;
  const olderAvg = older.reduce((a, b) => a + b, 0) / older.length;

  const change = ((recentAvg - olderAvg) / olderAvg) * 100;

  if (change > 5) return "improving";
  if (change < -5) return "declining";
  return "stable";
};

export const generateEfficiencyReport = (
  metrics: {
    yield?: { actual: number; expected: number };
    cost?: { revenue: number; totalCosts: number };
    labor?: { output: number; hours: number };
    water?: { yield: number; waterUsed: number };
    carbon?: { offset: number; trees: number; area: number };
  }
): EfficiencyScore[] => {
  const scores: EfficiencyScore[] = [];

  if (metrics.yield) {
    const value = calculateYieldEfficiency(metrics.yield.actual, metrics.yield.expected);
    scores.push({
      metric: "yield-efficiency",
      value,
      target: 100,
      score: calculateEfficiencyScore(value, 100),
      trend: "stable",
    });
  }

  if (metrics.cost) {
    const value = calculateCostEfficiency(metrics.cost.revenue, metrics.cost.totalCosts);
    scores.push({
      metric: "cost-efficiency",
      value,
      target: 150,
      score: calculateEfficiencyScore(value, 150),
      trend: "stable",
    });
  }

  if (metrics.labor) {
    const value = calculateLaborEfficiency(metrics.labor.output, metrics.labor.hours);
    scores.push({
      metric: "labor-efficiency",
      value,
      target: 10,
      score: calculateEfficiencyScore(value, 10),
      trend: "stable",
    });
  }

  if (metrics.water) {
    const value = calculateWaterEfficiency(metrics.water.yield, metrics.water.waterUsed);
    scores.push({
      metric: "water-efficiency",
      value,
      target: 2,
      score: calculateEfficiencyScore(value, 2),
      trend: "stable",
    });
  }

  return scores;
};

export const calculateOverallEfficiency = (scores: EfficiencyScore[]): number => {
  if (scores.length === 0) return 0;
  const sum = scores.reduce((acc, score) => acc + score.score, 0);
  return sum / scores.length;
};

