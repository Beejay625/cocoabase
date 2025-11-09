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
  regionGeoMetrics: RegionGeoMetric[];
  scenarioForecasts: ScenarioForecast[];
  yieldTimeline: YieldTimelineEntry[];
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

export type RegionGeoMetric = {
  region: string;
  plantationCount: number;
  treeCount: number;
  carbonOffsetTons: number;
  collaboratorCount: number;
  centroid?: PlantationCoordinates;
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

export type ScenarioName = "best" | "base" | "worst";

export type ScenarioForecast = {
  id: string;
  seedName: string;
  stage: Plantation["stage"];
  scenarios: Array<{
    name: ScenarioName;
    projectedYieldKg: number;
    projectionDate: string;
    confidence: YieldForecastConfidence;
    basis: string;
  }>;
};

export type CollaboratorInsight = {
  collaboratorId: string;
  name: string;
  role: string;
  plantations: number;
  lastNote?: string;
  lastUpdated?: string;
};

export type YieldTimelineEntry = {
  plantationId: string;
  seedName: string;
  stage: Plantation["stage"];
  date: string;
  event: string;
  yieldKg: number;
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

const DAY_MS = 1000 * 60 * 60 * 24;

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
  const geoClusters: GeoPlantationPoint[] = [];
  const regionGeoMap = new Map<
    string,
    {
      plantationCount: number;
      treeCount: number;
      carbonOffsetTons: number;
      collaboratorIds: Set<string>;
      latSum: number;
      lonSum: number;
      coordinateCount: number;
    }
  >();
  const collaboratorMap = new Map<
    string,
    { collaborator: PlantationCollaborator; plantations: Set<string> }
  >();
  const forecastInputs: Array<{
    plantation: Plantation;
    timeline: YieldCheckpoint[];
  }> = [];
  const timelineEntries: YieldTimelineEntry[] = [];

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

    const geoRegionEntry =
      regionGeoMap.get(region) ??
      {
        plantationCount: 0,
        treeCount: 0,
        carbonOffsetTons: 0,
        collaboratorIds: new Set<string>(),
        latSum: 0,
        lonSum: 0,
        coordinateCount: 0,
      };
    geoRegionEntry.plantationCount += 1;
    geoRegionEntry.treeCount += plantation.treeCount;
    geoRegionEntry.carbonOffsetTons += plantation.carbonOffsetTons;

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

    if (plantation.coordinates) {
      geoRegionEntry.latSum += plantation.coordinates.latitude;
      geoRegionEntry.lonSum += plantation.coordinates.longitude;
      geoRegionEntry.coordinateCount += 1;
      geoClusters.push({
        id: plantation.id,
        seedName: plantation.seedName,
        stage: plantation.stage,
        coordinates: plantation.coordinates,
        treeCount: plantation.treeCount,
        carbonOffsetTons: plantation.carbonOffsetTons,
        areaHectares: plantation.areaHectares,
        region,
      });
    }

    plantation.collaborators.forEach((collaborator) => {
      const existing = collaboratorMap.get(collaborator.id) ?? {
        collaborator,
        plantations: new Set<string>(),
      };
      existing.plantations.add(plantation.id);
      geoRegionEntry.collaboratorIds.add(collaborator.id);
      if (
        !existing.collaborator.lastUpdated ||
        (collaborator.lastUpdated &&
          new Date(collaborator.lastUpdated).getTime() >
            new Date(existing.collaborator.lastUpdated).getTime())
      ) {
        existing.collaborator = collaborator;
      }
      collaboratorMap.set(collaborator.id, existing);
    });
    regionGeoMap.set(region, geoRegionEntry);

    if (plantation.yieldTimeline.length) {
      const timeline = [...plantation.yieldTimeline].sort(sortTimelineAsc);
      forecastInputs.push({ plantation, timeline });
      timeline.forEach((checkpoint) => {
        timelineEntries.push({
          plantationId: plantation.id,
          seedName: plantation.seedName,
          stage: plantation.stage,
          date: checkpoint.date,
          event: checkpoint.event,
          yieldKg: checkpoint.yieldKg,
        });
      });
    }
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

  const scenarioForecasts: ScenarioForecast[] = [];

  const yieldForecasts = forecastInputs
    .map(({ plantation, timeline }) => {
      const projectionWindow =
        projectionWindowByStage[plantation.stage] ?? 45;
      const lastEntry = timeline[timeline.length - 1];
      const previousEntry =
        timeline.length > 1 ? timeline[timeline.length - 2] : null;
      let projectedYield = lastEntry.yieldKg;
      let basis = "Recent yield checkpoint";
      let confidence: YieldForecastConfidence = "low";

      if (previousEntry) {
        const deltaYield = lastEntry.yieldKg - previousEntry.yieldKg;
        const deltaDays = Math.max(
          1,
          differenceInDays(previousEntry.date, lastEntry.date)
        );
        const dailyGrowth = deltaYield / deltaDays;
        projectedYield = Math.max(
          lastEntry.yieldKg,
          lastEntry.yieldKg + dailyGrowth * projectionWindow
        );
        confidence = determineForecastConfidence(dailyGrowth, plantation.stage);
        basis = `Avg ${dailyGrowth.toFixed(2)} kg/day over last checkpoint`;
      } else if (plantation.stage !== "harvested") {
        const estimatedGrowth = plantation.treeCount * 0.12;
        projectedYield = lastEntry.yieldKg + estimatedGrowth;
        confidence = plantation.stage === "growing" ? "medium" : "low";
        basis = "Heuristic based on tree count";
      } else {
        confidence = "medium";
        basis = "Maintaining harvest plateau";
      }

      const projectionDate = new Date(
        new Date(lastEntry.date).getTime() + projectionWindow * 24 * 60 * 60 * 1000
      ).toISOString();

      const baseForecast: YieldForecast = {
        id: plantation.id,
        seedName: plantation.seedName,
        stage: plantation.stage,
        projectedYieldKg: Number(projectedYield.toFixed(1)),
        projectionDate,
        confidence,
        basis,
      };

      const baseDate = new Date(projectionDate);
      const bestProjectionDate = new Date(
        baseDate.getTime() - 7 * DAY_MS
      ).toISOString();
      const worstProjectionDate = new Date(
        baseDate.getTime() + 7 * DAY_MS
      ).toISOString();

      const bestProjection: YieldForecast = {
        id: plantation.id,
        seedName: plantation.seedName,
        stage: plantation.stage,
        projectedYieldKg: Number(
          Math.max(
            lastEntry.yieldKg,
            baseForecast.projectedYieldKg * 1.15
          ).toFixed(1)
        ),
        projectionDate: bestProjectionDate,
        confidence:
          confidence === "low" ? "medium" : confidence === "medium" ? "high" : "high",
        basis: "Optimistic scenario (+15% yield, 7 days sooner)",
      };

      const worstProjection: YieldForecast = {
        id: plantation.id,
        seedName: plantation.seedName,
        stage: plantation.stage,
        projectedYieldKg: Number(
          Math.max(
            lastEntry.yieldKg,
            baseForecast.projectedYieldKg * 0.85
          ).toFixed(1)
        ),
        projectionDate: worstProjectionDate,
        confidence:
          confidence === "high" ? "medium" : "low",
        basis: "Conservative scenario (-15% yield, 7 days later)",
      };

      scenarioForecasts.push({
        id: plantation.id,
        seedName: plantation.seedName,
        stage: plantation.stage,
        scenarios: [
          { name: "best", ...bestProjection },
          { name: "base", ...baseForecast },
          { name: "worst", ...worstProjection },
        ],
      });

      return baseForecast;
    })
    .sort(
      (a, b) =>
        new Date(a.projectionDate).getTime() -
        new Date(b.projectionDate).getTime()
    );

  const collaboratorInsights = Array.from(collaboratorMap.values())
    .map(({ collaborator, plantations: collaboratorPlantations }) => ({
      collaboratorId: collaborator.id,
      name: collaborator.name,
      role: collaborator.role,
      plantations: collaboratorPlantations.size,
      lastNote: collaborator.lastNote,
      lastUpdated: collaborator.lastUpdated,
    }))
    .sort((a, b) => b.plantations - a.plantations || a.name.localeCompare(b.name))
    .slice(0, 8);

  const regionGeoMetrics = Array.from(regionGeoMap.entries())
    .map(([region, entry]) => {
      let centroid: PlantationCoordinates | undefined;
      if (entry.coordinateCount > 0) {
        centroid = {
          latitude: entry.latSum / entry.coordinateCount,
          longitude: entry.lonSum / entry.coordinateCount,
        };
      }
      return {
        region,
        plantationCount: entry.plantationCount,
        treeCount: entry.treeCount,
        carbonOffsetTons: Number(entry.carbonOffsetTons.toFixed(2)),
        collaboratorCount: entry.collaboratorIds.size,
        centroid,
      };
    })
    .sort((a, b) => b.treeCount - a.treeCount);

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
    geoClusters,
    yieldForecasts,
    collaboratorInsights,
    regionGeoMetrics,
    scenarioForecasts,
    yieldTimeline: timelineEntries.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    ),
  };
};

