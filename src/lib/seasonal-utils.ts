export type Season = "planting" | "growing" | "harvest" | "maintenance";

export interface SeasonalActivity {
  id: string;
  season: Season;
  name: string;
  description: string;
  months: number[];
  priority: "high" | "medium" | "low";
}

export const getCurrentSeason = (date: Date = new Date()): Season => {
  const month = date.getMonth() + 1;

  if (month >= 3 && month <= 5) {
    return "planting";
  }
  if (month >= 6 && month <= 8) {
    return "growing";
  }
  if (month >= 9 && month <= 11) {
    return "harvest";
  }
  return "maintenance";
};

export const getSeasonName = (season: Season): string => {
  const names: Record<Season, string> = {
    planting: "Planting Season",
    growing: "Growing Season",
    harvest: "Harvest Season",
    maintenance: "Maintenance Season",
  };
  return names[season];
};

export const getSeasonMonths = (season: Season): number[] => {
  const months: Record<Season, number[]> = {
    planting: [3, 4, 5],
    growing: [6, 7, 8],
    harvest: [9, 10, 11],
    maintenance: [12, 1, 2],
  };
  return months[season];
};

export const getSeasonalActivities = (season: Season): SeasonalActivity[] => {
  const activities: Record<Season, SeasonalActivity[]> = {
    planting: [
      {
        id: "plant-seeds",
        season: "planting",
        name: "Plant Seeds",
        description: "Plant cocoa seeds in prepared soil",
        months: [3, 4, 5],
        priority: "high",
      },
      {
        id: "soil-preparation",
        season: "planting",
        name: "Soil Preparation",
        description: "Prepare soil with proper nutrients and pH levels",
        months: [3, 4],
        priority: "high",
      },
    ],
    growing: [
      {
        id: "irrigation",
        season: "growing",
        name: "Regular Irrigation",
        description: "Maintain consistent watering schedule",
        months: [6, 7, 8],
        priority: "high",
      },
      {
        id: "fertilization",
        season: "growing",
        name: "Fertilization",
        description: "Apply fertilizers for optimal growth",
        months: [6, 7, 8],
        priority: "medium",
      },
      {
        id: "pest-control",
        season: "growing",
        name: "Pest Control",
        description: "Monitor and control pests and diseases",
        months: [6, 7, 8],
        priority: "high",
      },
    ],
    harvest: [
      {
        id: "harvest-cocoa",
        season: "harvest",
        name: "Harvest Cocoa",
        description: "Harvest mature cocoa pods",
        months: [9, 10, 11],
        priority: "high",
      },
      {
        id: "post-harvest",
        season: "harvest",
        name: "Post-Harvest Processing",
        description: "Process and prepare cocoa for market",
        months: [9, 10, 11],
        priority: "medium",
      },
    ],
    maintenance: [
      {
        id: "pruning",
        season: "maintenance",
        name: "Pruning",
        description: "Prune trees for optimal growth",
        months: [12, 1, 2],
        priority: "medium",
      },
      {
        id: "equipment-maintenance",
        season: "maintenance",
        name: "Equipment Maintenance",
        description: "Maintain and repair equipment",
        months: [12, 1, 2],
        priority: "low",
      },
      {
        id: "planning",
        season: "maintenance",
        name: "Planning & Preparation",
        description: "Plan for next planting season",
        months: [1, 2],
        priority: "medium",
      },
    ],
  };

  return activities[season];
};

export const getUpcomingSeason = (currentSeason: Season): Season => {
  const order: Season[] = ["planting", "growing", "harvest", "maintenance"];
  const currentIndex = order.indexOf(currentSeason);
  return order[(currentIndex + 1) % order.length];
};

export const getDaysUntilSeason = (targetSeason: Season, currentDate: Date = new Date()): number => {
  const currentSeason = getCurrentSeason(currentDate);
  if (currentSeason === targetSeason) return 0;

  const targetMonths = getSeasonMonths(targetSeason);
  const currentMonth = currentDate.getMonth() + 1;

  let targetDate = new Date(currentDate);
  let found = false;
  let attempts = 0;

  while (!found && attempts < 12) {
    if (targetMonths.includes(targetDate.getMonth() + 1)) {
      found = true;
      break;
    }
    targetDate.setMonth(targetDate.getMonth() + 1);
    attempts++;
  }

  if (!found) return 0;

  const diff = targetDate.getTime() - currentDate.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

export const isActivityDue = (
  activity: SeasonalActivity,
  currentDate: Date = new Date()
): boolean => {
  const currentMonth = currentDate.getMonth() + 1;
  return activity.months.includes(currentMonth);
};

export const getRecommendedActivities = (
  currentDate: Date = new Date()
): SeasonalActivity[] => {
  const currentSeason = getCurrentSeason(currentDate);
  return getSeasonalActivities(currentSeason);
};

export const formatSeasonalDate = (date: Date): string => {
  return date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
};

