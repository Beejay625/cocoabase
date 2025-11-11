import { type Address } from 'viem';

export interface RiskAssessment {
  id: bigint;
  owner: Address;
  plantationId: bigint;
  riskType: 'weather' | 'market' | 'disease' | 'financial';
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  assessmentDate: bigint;
  mitigationPlan: string;
  txHash: string;
}

export function createRiskAssessment(
  owner: Address,
  plantationId: bigint,
  riskType: RiskAssessment['riskType'],
  riskLevel: RiskAssessment['riskLevel'],
  mitigationPlan: string
): RiskAssessment {
  return {
    id: BigInt(Date.now()),
    owner,
    plantationId,
    riskType,
    riskLevel,
    assessmentDate: BigInt(Date.now()),
    mitigationPlan,
    txHash: '',
  };
}
