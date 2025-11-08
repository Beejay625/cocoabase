import type { Plantation } from "@/store/plantations";

export type StageBreakdown = {
  stage: string;
  count: number;
  percentage: number;
};

export type MonthlyPlantingPoint = {
  label: string;
  planted: number;
  harvested: number;
};

export type RegionStat = {
  region: string;
  count: number;
};

type AnalyticsSnapshot = {
  total: number;
  stageBreakdown: StageBreakdown[];
  monthlyPoints: MonthlyPlantingPoint[];
  averageDaysToHarvest: number | null;
  activeRegions: RegionStat[];
  lastUpdated: string;
};

const monthFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "2-digit",
});

const differenceInDays = (start: string, end: string) => {
  const ms = new Date(end).getTime() - new Date(start).getTime();
  return Math.max(0, Math.round(ms / (1000 * 60 * 60 * 24)));
};

const getMonthKey = (date: string) => {
  const d = new Date(date);
  return `${d.getFullYear()}-${d.getMonth()}`;
};

const sortDescending = (a: RegionStat, b: RegionStat) =>
  b.count - a.count || a.region.localeCompare(b.region);

export const buildAnalyticsSnapshot = (
  plantations: Plantation[],
  monthsBack = 6
): AnalyticsSnapshot => {
  const totals: Record<string, number> = {};
  const monthlyMap = new Map<
    string,
    { planted: number; harvested: number; date: Date }
  >();
  const harvestDurations: number[] = [];
  const regionCounts: Record<string, number> = {};

  plantations.forEach((plantation) => {
    totals[plantation.stage] = (totals[plantation.stage] ?? 0) + 1;

    const monthKey = getMonthKey(plantation.startDate);
    const monthDate = new Date(plantation.startDate);
    const monthEntry = monthlyMap.get(monthKey) ?? {
      planted: 0,
      harvested: 0,
      date: monthDate,
    };
    monthEntry.planted += 1;

    if (plantation.stage === "harvested") {
      monthEntry.harvested += 1;
      harvestDurations.push(
        differenceInDays(plantation.startDate, plantation.updatedAt)
      );
    }

    monthlyMap.set(monthKey, monthEntry);

    const region = plantation.location?.split(",")[1]?.trim() ??
      plantation.location ??
      "Unknown";
    regionCounts[region] = (regionCounts[region] ?? 0) + 1;
  });

  const total = plantations.length || 1;

  const stageBreakdown = Object.entries(totals).map(([stage, count]) => ({
    stage,
    count,
    percentage: Math.round((count / total) * 100),
  }));

  const now = new Date();
  const monthlyPoints: MonthlyPlantingPoint[] = [];
  for (let i = monthsBack - 1; i >= 0; i -= 1) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${date.getFullYear()}-${date.getMonth()}`;
    const entry = monthlyMap.get(key);
    monthlyPoints.push({
      label: monthFormatter.format(date),
      planted: entry?.planted ?? 0,
      harvested: entry?.harvested ?? 0,
    });
  }

  const averageDaysToHarvest = harvestDurations.length
    ? Math.round(
        harvestDurations.reduce((acc, days) => acc + days, 0) /
          harvestDurations.length
      )
    : null;

  const activeRegions = Object.entries(regionCounts)
    .map(([region, count]) => ({ region, count }))
    .sort(sortDescending)
    .slice(0, 6);

  return {
    total,
    stageBreakdown,
    monthlyPoints,
    averageDaysToHarvest,
    activeRegions,
    lastUpdated: new Date().toISOString(),
  };
};

