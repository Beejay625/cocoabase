import { type Address } from 'viem';

export interface RiskAssessment {
  id: bigint;
  assessor: Address;
  riskType: 'weather' | 'market' | 'disease' | 'financial';
  level: 'low' | 'medium' | 'high' | 'critical';
  timestamp: bigint;
}

export function createRiskAssessment(
  assessor: Address,
  riskType: 'weather' | 'market' | 'disease' | 'financial',
  level: 'low' | 'medium' | 'high' | 'critical'
): RiskAssessment {
  return {
    id: BigInt(0),
    assessor,
    riskType,
    level,
    timestamp: BigInt(Date.now()),
  };
}
