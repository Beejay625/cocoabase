export type OptimizationTipImpact = "high" | "medium" | "low";

export interface YieldOptimizationTip {
  id: string;
  category: string;
  title: string;
  description: string;
  impact: OptimizationTipImpact;
  estimatedIncrease: number;
  implementation: string[];
  cost?: number;
  difficulty: "easy" | "medium" | "hard";
  timeframe: string;
}

export interface YieldAnalysis {
  currentYield: number;
  potentialYield: number;
  yieldGap: number;
  optimizationTips: YieldOptimizationTip[];
  priorityActions: YieldOptimizationTip[];
}

export const generateOptimizationTips = (
  plantationData: {
    stage: string;
    healthScore: number;
    soilMoisture: number;
    nutrientLevels: { nitrogen: number; phosphorus: number; potassium: number };
    pestIssues: number;
    irrigationFrequency: number;
    fertilizationFrequency: number;
  }
): YieldOptimizationTip[] => {
  const tips: YieldOptimizationTip[] = [];

  if (plantationData.healthScore < 70) {
    tips.push({
      id: "tip-health-improvement",
      category: "Health",
      title: "Improve Plantation Health",
      description: "Plantation health score is below optimal. Focus on improving overall health.",
      impact: "high",
      estimatedIncrease: 15,
      implementation: [
        "Conduct soil test and address nutrient deficiencies",
        "Implement integrated pest management",
        "Improve irrigation scheduling",
      ],
      difficulty: "medium",
      timeframe: "2-3 months",
    });
  }

  if (plantationData.soilMoisture < 40) {
    tips.push({
      id: "tip-irrigation",
      category: "Irrigation",
      title: "Optimize Irrigation",
      description: "Soil moisture is below optimal levels. Improve irrigation practices.",
      impact: "high",
      estimatedIncrease: 20,
      implementation: [
        "Increase irrigation frequency",
        "Implement drip irrigation system",
        "Monitor soil moisture regularly",
      ],
      cost: 500,
      difficulty: "medium",
      timeframe: "1-2 months",
    });
  }

  if (
    plantationData.nutrientLevels.nitrogen < 20 ||
    plantationData.nutrientLevels.phosphorus < 15 ||
    plantationData.nutrientLevels.potassium < 150
  ) {
    tips.push({
      id: "tip-fertilization",
      category: "Fertilization",
      title: "Improve Nutrient Management",
      description: "Nutrient levels are below optimal. Apply appropriate fertilizers.",
      impact: "high",
      estimatedIncrease: 25,
      implementation: [
        "Apply nitrogen fertilizer",
        "Apply phosphorus fertilizer",
        "Apply potassium fertilizer",
        "Follow recommended application rates",
      ],
      cost: 300,
      difficulty: "easy",
      timeframe: "2-4 weeks",
    });
  }

  if (plantationData.pestIssues > 0) {
    tips.push({
      id: "tip-pest-control",
      category: "Pest Control",
      title: "Implement Pest Control",
      description: "Pest issues detected. Implement effective pest control measures.",
      impact: "high",
      estimatedIncrease: 18,
      implementation: [
        "Identify pest species",
        "Apply appropriate pesticides",
        "Implement biological controls",
        "Monitor regularly",
      ],
      cost: 200,
      difficulty: "medium",
      timeframe: "1-2 weeks",
    });
  }

  if (plantationData.irrigationFrequency < 2) {
    tips.push({
      id: "tip-irrigation-frequency",
      category: "Irrigation",
      title: "Increase Irrigation Frequency",
      description: "Irrigation frequency is low. Increase frequency for better growth.",
      impact: "medium",
      estimatedIncrease: 10,
      implementation: [
        "Water 2-3 times per week",
        "Monitor soil moisture",
        "Adjust based on weather",
      ],
      difficulty: "easy",
      timeframe: "Immediate",
    });
  }

  if (plantationData.fertilizationFrequency < 1) {
    tips.push({
      id: "tip-fertilization-frequency",
      category: "Fertilization",
      title: "Regular Fertilization",
      description: "Implement regular fertilization schedule for optimal growth.",
      impact: "medium",
      estimatedIncrease: 12,
      implementation: [
        "Fertilize every 3 months",
        "Use balanced fertilizer",
        "Follow application guidelines",
      ],
      cost: 150,
      difficulty: "easy",
      timeframe: "Ongoing",
    });
  }

  return tips;
};

export const analyzeYieldPotential = (
  currentYield: number,
  plantationData: {
    stage: string;
    healthScore: number;
    soilMoisture: number;
    nutrientLevels: { nitrogen: number; phosphorus: number; potassium: number };
    pestIssues: number;
    irrigationFrequency: number;
    fertilizationFrequency: number;
  }
): YieldAnalysis => {
  const tips = generateOptimizationTips(plantationData);
  const highImpactTips = tips.filter((tip) => tip.impact === "high");
  const estimatedIncrease = tips.reduce(
    (sum, tip) => sum + tip.estimatedIncrease,
    0
  );
  const potentialYield = currentYield * (1 + estimatedIncrease / 100);
  const yieldGap = potentialYield - currentYield;

  return {
    currentYield,
    potentialYield,
    yieldGap,
    optimizationTips: tips,
    priorityActions: highImpactTips,
  };
};

export const prioritizeTips = (
  tips: YieldOptimizationTip[]
): YieldOptimizationTip[] => {
  return [...tips].sort((a, b) => {
    const impactOrder = { high: 3, medium: 2, low: 1 };
    const difficultyOrder = { easy: 1, medium: 2, hard: 3 };

    if (impactOrder[a.impact] !== impactOrder[b.impact]) {
      return impactOrder[b.impact] - impactOrder[a.impact];
    }

    return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
  });
};

export const calculateROI = (
  tip: YieldOptimizationTip,
  currentYield: number,
  pricePerKg: number
): number => {
  if (!tip.cost || tip.cost === 0) return Infinity;

  const additionalYield = currentYield * (tip.estimatedIncrease / 100);
  const additionalRevenue = additionalYield * pricePerKg;
  const roi = ((additionalRevenue - tip.cost) / tip.cost) * 100;

  return roi;
};

