export type AchievementType = 
  | "milestone"
  | "harvest"
  | "sustainability"
  | "efficiency"
  | "community"
  | "expertise";

export type AchievementRarity = "common" | "rare" | "epic" | "legendary";

export interface Achievement {
  id: string;
  type: AchievementType;
  name: string;
  description: string;
  rarity: AchievementRarity;
  icon: string;
  unlockedAt?: Date;
  progress: number;
  target: number;
  unlocked: boolean;
}

export const checkAchievements = (
  data: {
    plantations?: unknown[];
    harvests?: unknown[];
    carbonOffset?: number;
    tasksCompleted?: number;
    certifications?: unknown[];
  }
): Achievement[] => {
  const achievements: Achievement[] = [];

  const plantationCount = Array.isArray(data.plantations) ? data.plantations.length : 0;
  const harvestCount = Array.isArray(data.harvests) ? data.harvests.length : 0;
  const carbonOffset = data.carbonOffset || 0;
  const tasksCompleted = data.tasksCompleted || 0;
  const certificationCount = Array.isArray(data.certifications) ? data.certifications.length : 0;

  if (plantationCount >= 1) {
    achievements.push({
      id: "first-plantation",
      type: "milestone",
      name: "First Plantation",
      description: "Created your first plantation",
      rarity: "common",
      icon: "🌱",
      progress: Math.min(plantationCount, 1),
      target: 1,
      unlocked: plantationCount >= 1,
    });
  }

  if (plantationCount >= 10) {
    achievements.push({
      id: "plantation-master",
      type: "milestone",
      name: "Plantation Master",
      description: "Created 10 plantations",
      rarity: "rare",
      icon: "🏆",
      progress: Math.min(plantationCount, 10),
      target: 10,
      unlocked: plantationCount >= 10,
    });
  }

  if (harvestCount >= 1) {
    achievements.push({
      id: "first-harvest",
      type: "harvest",
      name: "First Harvest",
      description: "Completed your first harvest",
      rarity: "common",
      icon: "🌾",
      progress: Math.min(harvestCount, 1),
      target: 1,
      unlocked: harvestCount >= 1,
    });
  }

  if (carbonOffset >= 10) {
    achievements.push({
      id: "carbon-warrior",
      type: "sustainability",
      name: "Carbon Warrior",
      description: "Offset 10 tons of CO₂",
      rarity: "rare",
      icon: "🌍",
      progress: Math.min(carbonOffset, 10),
      target: 10,
      unlocked: carbonOffset >= 10,
    });
  }

  if (tasksCompleted >= 100) {
    achievements.push({
      id: "task-master",
      type: "efficiency",
      name: "Task Master",
      description: "Completed 100 tasks",
      rarity: "epic",
      icon: "✅",
      progress: Math.min(tasksCompleted, 100),
      target: 100,
      unlocked: tasksCompleted >= 100,
    });
  }

  if (certificationCount >= 3) {
    achievements.push({
      id: "certified-farmer",
      type: "expertise",
      name: "Certified Farmer",
      description: "Obtained 3 certifications",
      rarity: "rare",
      icon: "📜",
      progress: Math.min(certificationCount, 3),
      target: 3,
      unlocked: certificationCount >= 3,
    });
  }

  return achievements;
};

export const getUnlockedAchievements = (achievements: Achievement[]): Achievement[] => {
  return achievements.filter((achievement) => achievement.unlocked);
};

export const getAchievementsByType = (
  achievements: Achievement[]
): Record<AchievementType, Achievement[]> => {
  return achievements.reduce(
    (acc, achievement) => {
      if (!acc[achievement.type]) {
        acc[achievement.type] = [];
      }
      acc[achievement.type].push(achievement);
      return acc;
    },
    {
      milestone: [],
      harvest: [],
      sustainability: [],
      efficiency: [],
      community: [],
      expertise: [],
    } as Record<AchievementType, Achievement[]>
  );
};

export const getAchievementsByRarity = (
  achievements: Achievement[]
): Record<AchievementRarity, Achievement[]> => {
  return achievements.reduce(
    (acc, achievement) => {
      if (!acc[achievement.rarity]) {
        acc[achievement.rarity] = [];
      }
      acc[achievement.rarity].push(achievement);
      return acc;
    },
    {
      common: [],
      rare: [],
      epic: [],
      legendary: [],
    } as Record<AchievementRarity, Achievement[]>
  );
};

export const calculateAchievementProgress = (achievement: Achievement): number => {
  if (achievement.target === 0) return 100;
  return Math.min(100, (achievement.progress / achievement.target) * 100);
};

export const getAchievementSummary = (achievements: Achievement[]): {
  total: number;
  unlocked: number;
  locked: number;
  byType: Record<AchievementType, number>;
  byRarity: Record<AchievementRarity, number>;
  completionRate: number;
} => {
  const unlocked = getUnlockedAchievements(achievements);
  const byType = getAchievementsByType(achievements);
  const byRarity = getAchievementsByRarity(achievements);

  return {
    total: achievements.length,
    unlocked: unlocked.length,
    locked: achievements.length - unlocked.length,
    byType: {
      milestone: byType.milestone.length,
      harvest: byType.harvest.length,
      sustainability: byType.sustainability.length,
      efficiency: byType.efficiency.length,
      community: byType.community.length,
      expertise: byType.expertise.length,
    },
    byRarity: {
      common: byRarity.common.length,
      rare: byRarity.rare.length,
      epic: byRarity.epic.length,
      legendary: byRarity.legendary.length,
    },
    completionRate: achievements.length > 0 ? (unlocked.length / achievements.length) * 100 : 0,
  };
};

export const formatAchievementRarity = (rarity: AchievementRarity): string => {
  const labels: Record<AchievementRarity, string> = {
    common: "Common",
    rare: "Rare",
    epic: "Epic",
    legendary: "Legendary",
  };
  return labels[rarity];
};


