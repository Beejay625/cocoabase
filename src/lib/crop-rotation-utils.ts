export type CropType = "cocoa" | "coffee" | "banana" | "cassava" | "maize" | "fallow";

export interface CropRotationPlan {
  id: string;
  plantationId: string;
  year: number;
  crops: Array<{
    crop: CropType;
    season: string;
    area: number;
    startDate: Date;
    endDate: Date;
  }>;
  notes?: string;
}

export interface RotationRecommendation {
  currentCrop: CropType;
  recommendedCrop: CropType;
  reason: string;
  yearsSinceLast: number;
}

export const getRotationRecommendations = (
  currentCrop: CropType,
  yearsSinceLast: Record<CropType, number>
): RotationRecommendation[] => {
  const recommendations: RotationRecommendation[] = [];

  if (currentCrop === "cocoa") {
    if (yearsSinceLast.fallow === undefined || yearsSinceLast.fallow > 3) {
      recommendations.push({
        currentCrop: "cocoa",
        recommendedCrop: "fallow",
        reason: "Allow soil to rest and recover nutrients",
        yearsSinceLast: yearsSinceLast.fallow || 0,
      });
    }
    if (yearsSinceLast.banana === undefined || yearsSinceLast.banana > 5) {
      recommendations.push({
        currentCrop: "cocoa",
        recommendedCrop: "banana",
        reason: "Banana provides shade and improves soil structure",
        yearsSinceLast: yearsSinceLast.banana || 0,
      });
    }
  }

  if (currentCrop === "fallow") {
    recommendations.push({
      currentCrop: "fallow",
      recommendedCrop: "cocoa",
      reason: "Soil is ready for cocoa planting after fallow period",
      yearsSinceLast: yearsSinceLast.cocoa || 0,
    });
  }

  return recommendations;
};

export const calculateYearsSinceCrop = (
  rotationPlans: CropRotationPlan[],
  cropType: CropType
): number => {
  const now = new Date();
  const cropPlans = rotationPlans
    .flatMap((plan) => plan.crops)
    .filter((crop) => crop.crop === cropType)
    .sort((a, b) => b.endDate.getTime() - a.endDate.getTime());

  if (cropPlans.length === 0) return Infinity;

  const lastCrop = cropPlans[0];
  const yearsSince = (now.getTime() - lastCrop.endDate.getTime()) / (1000 * 60 * 60 * 24 * 365);

  return Math.floor(yearsSince);
};

export const isRotationDue = (
  currentCrop: CropType,
  yearsSinceLast: Record<CropType, number>,
  rotationInterval: number = 5
): boolean => {
  const yearsSinceCurrent = yearsSinceLast[currentCrop] || 0;
  return yearsSinceCurrent >= rotationInterval;
};

export const getOptimalRotationSequence = (): CropType[] => {
  return ["cocoa", "banana", "fallow", "cocoa"];
};

export const calculateRotationBenefits = (
  fromCrop: CropType,
  toCrop: CropType
): {
  soilHealth: number;
  yieldPotential: number;
  pestReduction: number;
  description: string;
} => {
  const benefits: Record<string, { soilHealth: number; yieldPotential: number; pestReduction: number; description: string }> = {
    "cocoa-fallow": {
      soilHealth: 20,
      yieldPotential: 15,
      pestReduction: 30,
      description: "Fallow period allows soil to recover and reduces pest buildup",
    },
    "fallow-cocoa": {
      soilHealth: 25,
      yieldPotential: 20,
      pestReduction: 25,
      description: "Fresh start with improved soil health",
    },
    "cocoa-banana": {
      soilHealth: 15,
      yieldPotential: 10,
      pestReduction: 20,
      description: "Banana provides shade and improves soil structure",
    },
  };

  const key = `${fromCrop}-${toCrop}`;
  return (
    benefits[key] || {
      soilHealth: 5,
      yieldPotential: 5,
      pestReduction: 10,
      description: "Standard rotation benefits",
    }
  );
};

export const generateRotationPlan = (
  plantationId: string,
  currentCrop: CropType,
  area: number,
  startYear: number,
  years: number = 5
): CropRotationPlan[] => {
  const plans: CropRotationPlan[] = [];
  const sequence = getOptimalRotationSequence();
  let currentIndex = sequence.indexOf(currentCrop);

  if (currentIndex === -1) currentIndex = 0;

  for (let i = 0; i < years; i++) {
    const year = startYear + i;
    const crop = sequence[(currentIndex + i) % sequence.length];
    const nextCrop = sequence[(currentIndex + i + 1) % sequence.length];

    plans.push({
      id: `rotation-${plantationId}-${year}`,
      plantationId,
      year,
      crops: [
        {
          crop,
          season: "full-year",
          area,
          startDate: new Date(year, 0, 1),
          endDate: new Date(year, 11, 31),
        },
      ],
    });
  }

  return plans;
};

