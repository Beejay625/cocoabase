import type {
  Plantation,
  PlantationCoordinates,
  PlantationCollaborator,
  YieldCheckpoint,
} from "@/store/plantations";

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

export type RegionSustainabilityStat = {
  region: string;
  treeCount: number;
  carbonOffsetTons: number;
};

export type SustainabilityTotals = {
  treeCount: number;
  areaHectares: number;
  carbonOffsetTons: number;
};

export type CohortPerformance = {
  key: string;
  label: string;
  planted: number;
  harvested: number;
  harvestRate: number;
  averageDaysToHarvest: number | null;
};

export type AnalyticsSnapshot = {
  total: number;
  stageBreakdown: StageBreakdown[];
  monthlyPoints: MonthlyPlantingPoint[];
  averageDaysToHarvest: number | null;
  activeRegions: RegionStat[];
  lastUpdated: string;
  sustainability: {
    totals: SustainabilityTotals;
    perRegion: RegionSustainabilityStat[];
  };
  cohortPerformance: CohortPerformance[];
  geoClusters: GeoPlantationPoint[];
  yieldForecasts: YieldForecast[];
  collaboratorInsights: CollaboratorInsight[];
};

export type GeoPlantationPoint = {
  id: string;
  seedName: string;
  stage: Plantation["stage"];
  coordinates: PlantationCoordinates;
  treeCount: number;
  carbonOffsetTons: number;
  areaHectares: number;
  region?: string;
};

export type YieldForecastConfidence = "low" | "medium" | "high";

export type YieldForecast = {
  id: string;
  seedName: string;
  stage: Plantation["stage"];
  projectedYieldKg: number;
  projectionDate: string;
  confidence: YieldForecastConfidence;
  basis: string;
};

export type CollaboratorInsight = {
  collaboratorId: string;
  name: string;
  role: string;
  plantations: number;
  lastNote?: string;
  lastUpdated?: string;
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

const sortTimelineAsc = (a: YieldCheckpoint, b: YieldCheckpoint) =>
  new Date(a.date).getTime() - new Date(b.date).getTime();

const projectionWindowByStage: Record<Plantation["stage"], number> = {
  planted: 75,
  growing: 45,
  harvested: 30,
};

const determineForecastConfidence = (
  dailyGrowth: number,
  stage: Plantation["stage"]
): YieldForecastConfidence => {
  if (dailyGrowth <= 0) {
    return "low";
  }
  if (stage === "growing" && dailyGrowth > 0.15) {
    return "high";
  }
  if (stage === "harvested" && dailyGrowth > 0.05) {
    return "medium";
  }
  return "medium";
};

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
  const regionSustainability: Record<
    string,
    { treeCount: number; carbonOffsetTons: number }
  > = {};
  let totalTreeCount = 0;
  let totalArea = 0;
  let totalCarbon = 0;
  const cohortMap = new Map<
    string,
    {
      planted: number;
      harvested: number;
      date: Date;
      harvestDurations: number[];
    }
  >();

  plantations.forEach((plantation) => {
    totals[plantation.stage] = (totals[plantation.stage] ?? 0) + 1;
    totalTreeCount += plantation.treeCount;
    totalArea += plantation.areaHectares;
    totalCarbon += plantation.carbonOffsetTons;

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

    const region =
      plantation.location?.split(",")[1]?.trim() ??
      plantation.location ??
      "Unknown";
    regionCounts[region] = (regionCounts[region] ?? 0) + 1;
    const sustainabilityEntry = regionSustainability[region] ?? {
      treeCount: 0,
      carbonOffsetTons: 0,
    };
    sustainabilityEntry.treeCount += plantation.treeCount;
    sustainabilityEntry.carbonOffsetTons += plantation.carbonOffsetTons;
    regionSustainability[region] = sustainabilityEntry;

    const cohortEntry = cohortMap.get(monthKey) ?? {
      planted: 0,
      harvested: 0,
      date: monthDate,
      harvestDurations: [] as number[],
    };
    cohortEntry.planted += 1;
    if (plantation.stage === "harvested") {
      cohortEntry.harvested += 1;
      cohortEntry.harvestDurations.push(
        differenceInDays(plantation.startDate, plantation.updatedAt)
      );
    }
    cohortMap.set(monthKey, cohortEntry);
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

  const perRegion = Object.entries(regionSustainability)
    .map(([region, data]) => ({
      region,
      treeCount: data.treeCount,
      carbonOffsetTons: Number(data.carbonOffsetTons.toFixed(2)),
    }))
    .sort((a, b) => b.carbonOffsetTons - a.carbonOffsetTons)
    .slice(0, 6);

  const cohortPerformance = Array.from(cohortMap.values())
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(-8)
    .map((entry) => {
      const harvestRate = entry.planted
        ? Math.round((entry.harvested / entry.planted) * 100)
        : 0;
      const averageCohortDays = entry.harvestDurations.length
        ? Math.round(
            entry.harvestDurations.reduce((acc, days) => acc + days, 0) /
              entry.harvestDurations.length
          )
        : null;

      return {
        key: `${entry.date.getFullYear()}-${entry.date.getMonth()}`,
        label: monthFormatter.format(entry.date),
        planted: entry.planted,
        harvested: entry.harvested,
        harvestRate,
        averageDaysToHarvest: averageCohortDays,
      };
    });

  return {
    total,
    stageBreakdown,
    monthlyPoints,
    averageDaysToHarvest,
    activeRegions,
    lastUpdated: new Date().toISOString(),
    sustainability: {
      totals: {
        treeCount: totalTreeCount,
        areaHectares: Number(totalArea.toFixed(2)),
        carbonOffsetTons: Number(totalCarbon.toFixed(2)),
      },
      perRegion,
    },
    cohortPerformance,
  };
};

