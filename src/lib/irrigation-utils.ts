export type IrrigationMethod = "sprinkler" | "drip" | "flood" | "manual";

export type SoilMoistureLevel = "dry" | "moist" | "optimal" | "wet" | "waterlogged";

export interface IrrigationRecord {
  id: string;
  plantationId: string;
  date: Date;
  method: IrrigationMethod;
  duration: number;
  waterAmount: number;
  soilMoistureBefore: number;
  soilMoistureAfter: number;
  performedBy?: string;
  notes?: string;
}

export interface SoilMoistureReading {
  id: string;
  plantationId: string;
  date: Date;
  moistureLevel: number;
  depth: number;
  location?: string;
}

export const calculateOptimalWaterAmount = (
  areaHectares: number,
  cropStage: string,
  weatherConditions: { temperature: number; precipitation: number }
): number => {
  const baseWaterPerHectare = 50;
  let multiplier = 1.0;

  if (cropStage === "seedling") {
    multiplier = 0.6;
  } else if (cropStage === "vegetative") {
    multiplier = 0.8;
  } else if (cropStage === "flowering" || cropStage === "fruiting") {
    multiplier = 1.2;
  }

  if (weatherConditions.temperature > 30) {
    multiplier *= 1.3;
  }

  if (weatherConditions.precipitation > 20) {
    multiplier *= 0.5;
  }

  return areaHectares * baseWaterPerHectare * multiplier;
};

export const assessSoilMoistureLevel = (moisture: number): SoilMoistureLevel => {
  if (moisture < 20) return "dry";
  if (moisture < 40) return "moist";
  if (moisture < 70) return "optimal";
  if (moisture < 85) return "wet";
  return "waterlogged";
};

export const shouldIrrigate = (
  currentMoisture: number,
  lastIrrigation?: Date,
  daysSinceRain?: number
): boolean => {
  const level = assessSoilMoistureLevel(currentMoisture);

  if (level === "dry" || level === "moist") {
    return true;
  }

  if (level === "optimal") {
    if (lastIrrigation) {
      const daysSince = Math.floor(
        (Date.now() - lastIrrigation.getTime()) / (1000 * 60 * 60 * 24)
      );
      if (daysSince >= 5) {
        return true;
      }
    }
    if (daysSinceRain !== undefined && daysSinceRain >= 7) {
      return true;
    }
  }

  return false;
};

export const calculateWaterEfficiency = (
  records: IrrigationRecord[]
): number => {
  if (records.length === 0) return 0;

  const totalWater = records.reduce((sum, r) => sum + r.waterAmount, 0);
  const avgMoistureIncrease = records.reduce(
    (sum, r) => sum + (r.soilMoistureAfter - r.soilMoistureBefore),
    0
  ) / records.length;

  return avgMoistureIncrease > 0 ? (avgMoistureIncrease / totalWater) * 100 : 0;
};

export const getIrrigationSchedule = (
  areaHectares: number,
  cropStage: string,
  averageMoisture: number
): { frequency: number; amount: number } => {
  const level = assessSoilMoistureLevel(averageMoisture);
  let frequency = 7;
  let amount = calculateOptimalWaterAmount(areaHectares, cropStage, {
    temperature: 25,
    precipitation: 0,
  });

  if (level === "dry") {
    frequency = 3;
    amount *= 1.2;
  } else if (level === "moist") {
    frequency = 5;
  } else if (level === "optimal") {
    frequency = 7;
  } else if (level === "wet") {
    frequency = 10;
    amount *= 0.7;
  } else {
    frequency = 14;
    amount = 0;
  }

  return { frequency, amount };
};

export const getTotalWaterUsage = (
  records: IrrigationRecord[],
  startDate?: Date,
  endDate?: Date
): number => {
  const filtered = records.filter((r) => {
    if (startDate && r.date < startDate) return false;
    if (endDate && r.date > endDate) return false;
    return true;
  });

  return filtered.reduce((sum, r) => sum + r.waterAmount, 0);
};

export const getAverageMoistureLevel = (
  readings: SoilMoistureReading[]
): number => {
  if (readings.length === 0) return 0;
  const sum = readings.reduce((acc, r) => acc + r.moistureLevel, 0);
  return sum / readings.length;
};

