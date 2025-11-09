import type { Plantation, GrowthStage, PlantationTask } from "@/store/plantations";

export const getPlantationAge = (plantation: Plantation): number => {
  const start = new Date(plantation.startDate).getTime();
  const now = Date.now();
  return Math.floor((now - start) / (1000 * 60 * 60 * 24));
};

export const getDaysSinceUpdate = (plantation: Plantation): number => {
  const updated = new Date(plantation.updatedAt).getTime();
  const now = Date.now();
  return Math.floor((now - updated) / (1000 * 60 * 60 * 24));
};

export const getStageProgress = (stage: GrowthStage): number => {
  const progressMap: Record<GrowthStage, number> = {
    planted: 25,
    growing: 60,
    harvested: 100,
  };
  return progressMap[stage];
};

export const getNextStageETA = (
  plantation: Plantation,
  averageDaysToHarvest: number | null
): number | null => {
  if (plantation.stage === "harvested") {
    return null;
  }

  if (!averageDaysToHarvest) {
    return null;
  }

  const age = getPlantationAge(plantation);
  const stageETAs: Record<GrowthStage, number> = {
    planted: Math.floor(averageDaysToHarvest * 0.3),
    growing: Math.floor(averageDaysToHarvest * 0.7),
    harvested: 0,
  };

  const eta = stageETAs[plantation.stage] - age;
  return Math.max(0, eta);
};

export const getUrgentTasks = (plantation: Plantation): PlantationTask[] => {
  const now = Date.now();
  const urgentThreshold = now + 3 * 24 * 60 * 60 * 1000; // 3 days

  return plantation.tasks.filter((task) => {
    if (task.status === "completed") {
      return false;
    }
    const dueTime = new Date(task.dueDate).getTime();
    return dueTime <= urgentThreshold;
  });
};

export const getPlantationHealthScore = (
  plantation: Plantation,
  averageDaysToHarvest: number | null
): number => {
  let score = 50; // Base score

  // Stage progress bonus
  score += getStageProgress(plantation.stage) * 0.3;

  // Task completion bonus
  const totalTasks = plantation.tasks.length;
  if (totalTasks > 0) {
    const completedTasks = plantation.tasks.filter(
      (task) => task.status === "completed"
    ).length;
    score += (completedTasks / totalTasks) * 20;
  }

  // Urgency penalty
  const urgentTasks = getUrgentTasks(plantation);
  score -= urgentTasks.length * 10;

  // Update recency bonus
  const daysSinceUpdate = getDaysSinceUpdate(plantation);
  if (daysSinceUpdate <= 7) {
    score += 10;
  } else if (daysSinceUpdate > 30) {
    score -= 15;
  }

  // Yield timeline bonus
  if (plantation.yieldTimeline.length > 0) {
    score += Math.min(plantation.yieldTimeline.length * 2, 10);
  }

  // Collaborator engagement bonus
  if (plantation.collaborators.length > 0) {
    score += Math.min(plantation.collaborators.length * 3, 15);
  }

  return Math.max(0, Math.min(100, Math.round(score)));
};

export const formatPlantationAge = (days: number): string => {
  if (days < 30) {
    return `${days} day${days !== 1 ? "s" : ""}`;
  }
  if (days < 365) {
    const months = Math.floor(days / 30);
    const remainingDays = days % 30;
    if (remainingDays === 0) {
      return `${months} month${months !== 1 ? "s" : ""}`;
    }
    return `${months} month${months !== 1 ? "s" : ""}, ${remainingDays} day${remainingDays !== 1 ? "s" : ""}`;
  }
  const years = Math.floor(days / 365);
  const remainingMonths = Math.floor((days % 365) / 30);
  if (remainingMonths === 0) {
    return `${years} year${years !== 1 ? "s" : ""}`;
  }
  return `${years} year${years !== 1 ? "s" : ""}, ${remainingMonths} month${remainingMonths !== 1 ? "s" : ""}`;
};

export const getPlantationSummary = (plantation: Plantation): string => {
  const age = getPlantationAge(plantation);
  const urgentTasks = getUrgentTasks(plantation);
  const parts: string[] = [];

  parts.push(`${plantation.stage} stage`);
  parts.push(`${formatPlantationAge(age)} old`);

  if (plantation.yieldTimeline.length > 0) {
    const latestYield = plantation.yieldTimeline[plantation.yieldTimeline.length - 1];
    parts.push(`${latestYield.yieldKg.toFixed(1)} kg yield`);
  }

  if (urgentTasks.length > 0) {
    parts.push(`${urgentTasks.length} urgent task${urgentTasks.length !== 1 ? "s" : ""}`);
  }

  return parts.join(" • ");
};

export const comparePlantations = (
  a: Plantation,
  b: Plantation,
  sortBy: "age" | "yield" | "health" | "tasks" | "carbon"
): number => {
  switch (sortBy) {
    case "age":
      return (
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
      );
    case "yield": {
      const aYield =
        a.yieldTimeline.length > 0
          ? a.yieldTimeline[a.yieldTimeline.length - 1].yieldKg
          : 0;
      const bYield =
        b.yieldTimeline.length > 0
          ? b.yieldTimeline[b.yieldTimeline.length - 1].yieldKg
          : 0;
      return bYield - aYield;
    }
    case "health": {
      const aHealth = getPlantationHealthScore(a, null);
      const bHealth = getPlantationHealthScore(b, null);
      return bHealth - aHealth;
    }
    case "tasks": {
      const aTasks = a.tasks.filter((t) => t.status !== "completed").length;
      const bTasks = b.tasks.filter((t) => t.status !== "completed").length;
      return bTasks - aTasks;
    }
    case "carbon":
      return b.carbonOffsetTons - a.carbonOffsetTons;
    default:
      return 0;
  }
};

export const getPlantationInsights = (
  plantation: Plantation,
  averageDaysToHarvest: number | null
): Array<{ type: "info" | "warning" | "success"; message: string }> => {
  const insights: Array<{ type: "info" | "warning" | "success"; message: string }> = [];
  const age = getPlantationAge(plantation);
  const daysSinceUpdate = getDaysSinceUpdate(plantation);
  const urgentTasks = getUrgentTasks(plantation);
  const healthScore = getPlantationHealthScore(plantation, averageDaysToHarvest);

  if (urgentTasks.length > 0) {
    insights.push({
      type: "warning",
      message: `${urgentTasks.length} task${urgentTasks.length !== 1 ? "s" : ""} due soon or overdue`,
    });
  }

  if (daysSinceUpdate > 30) {
    insights.push({
      type: "warning",
      message: `No updates in ${daysSinceUpdate} days - consider checking in`,
    });
  }

  if (plantation.stage === "growing" && age > 60) {
    insights.push({
      type: "info",
      message: "Growing stage extended - harvest may be approaching",
    });
  }

  if (healthScore >= 80) {
    insights.push({
      type: "success",
      message: "Excellent health score - plantation is thriving",
    });
  }

  if (plantation.yieldTimeline.length >= 3) {
    insights.push({
      type: "success",
      message: "Strong yield tracking with multiple checkpoints",
    });
  }

  if (plantation.collaborators.length === 0) {
    insights.push({
      type: "info",
      message: "Consider adding collaborators for better oversight",
    });
  }

  return insights;
};

