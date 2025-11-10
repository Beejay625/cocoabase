import { type Address } from 'viem';

/**
 * Onchain Agricultural Data Analytics utilities
 * Analyze agricultural data onchain with Reown wallet integration
 */

export interface AnalyticsReport {
  id: bigint;
  farmer: Address;
  reportType: 'yield' | 'cost' | 'profit' | 'efficiency';
  dataPoints: number[];
  metrics: {
    average: number;
    median: number;
    min: number;
    max: number;
    trend: 'increasing' | 'decreasing' | 'stable';
  };
  insights: string[];
  generatedAt: bigint;
}

export function createAnalyticsReport(
  farmer: Address,
  reportType: AnalyticsReport['reportType'],
  dataPoints: number[]
): AnalyticsReport {
  const now = BigInt(Date.now());
  const metrics = calculateMetrics(dataPoints);
  const insights = generateInsights(metrics, reportType);
  return {
    id: BigInt(0),
    farmer,
    reportType,
    dataPoints,
    metrics,
    insights,
    generatedAt: now,
  };
}

export function calculateMetrics(dataPoints: number[]): AnalyticsReport['metrics'] {
  if (dataPoints.length === 0) {
    return { average: 0, median: 0, min: 0, max: 0, trend: 'stable' };
  }
  const sorted = [...dataPoints].sort((a, b) => a - b);
  const sum = dataPoints.reduce((a, b) => a + b, 0);
  const average = sum / dataPoints.length;
  const median = sorted[Math.floor(sorted.length / 2)];
  const min = sorted[0];
  const max = sorted[sorted.length - 1];
  
  let trend: 'increasing' | 'decreasing' | 'stable' = 'stable';
  if (dataPoints.length >= 2) {
    const firstHalf = dataPoints.slice(0, Math.floor(dataPoints.length / 2));
    const secondHalf = dataPoints.slice(Math.floor(dataPoints.length / 2));
    const firstAvg = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length;
    const secondAvg = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length;
    if (secondAvg > firstAvg * 1.1) trend = 'increasing';
    else if (secondAvg < firstAvg * 0.9) trend = 'decreasing';
  }
  
  return { average, median, min, max, trend };
}

export function generateInsights(
  metrics: AnalyticsReport['metrics'],
  reportType: AnalyticsReport['reportType']
): string[] {
  const insights: string[] = [];
  if (metrics.trend === 'increasing') {
    insights.push(`${reportType} is showing positive trend`);
  } else if (metrics.trend === 'decreasing') {
    insights.push(`${reportType} is declining, consider intervention`);
  }
  if (metrics.average > metrics.median * 1.2) {
    insights.push('High variance detected in data');
  }
  return insights;
}

