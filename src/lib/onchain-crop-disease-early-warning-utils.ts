import { type Address } from 'viem';

/**
 * Onchain Crop Disease Early Warning utilities
 * Early warning system for crop diseases onchain with Reown wallet integration
 */

export interface DiseaseWarning {
  id: bigint;
  farmer: Address;
  fieldId: string;
  cropType: string;
  diseaseType: string;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  symptoms: string[];
  detectedAt: bigint;
  recommendedAction: string;
  status: 'monitoring' | 'treating' | 'resolved';
}

export function createDiseaseWarning(
  farmer: Address,
  fieldId: string,
  cropType: string,
  diseaseType: string,
  riskLevel: DiseaseWarning['riskLevel'],
  symptoms: string[],
  recommendedAction: string
): DiseaseWarning {
  const now = BigInt(Date.now());
  return {
    id: BigInt(0),
    farmer,
    fieldId,
    cropType,
    diseaseType,
    riskLevel,
    symptoms,
    detectedAt: now,
    recommendedAction,
    status: 'monitoring',
  };
}

export function escalateWarning(warning: DiseaseWarning): DiseaseWarning {
  const riskLevels: DiseaseWarning['riskLevel'][] = ['low', 'medium', 'high', 'critical'];
  const currentIndex = riskLevels.indexOf(warning.riskLevel);
  const newLevel = currentIndex < riskLevels.length - 1 
    ? riskLevels[currentIndex + 1] 
    : warning.riskLevel;
  return {
    ...warning,
    riskLevel: newLevel,
  };
}

export function isCriticalWarning(warning: DiseaseWarning): boolean {
  return warning.riskLevel === 'critical' || warning.riskLevel === 'high';
}



