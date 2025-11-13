import { type Address } from 'viem';

export interface RiskAssessment {
  id: string;
  assessmentId: bigint;
  farmOwner: Address;
  riskType: string;
  riskLevel: bigint;
  description: string;
  mitigation: string;
  date: bigint;
  mitigated: boolean;
}

export function createRiskAssessment(
  farmOwner: Address,
  assessmentId: bigint,
  riskType: string,
  riskLevel: bigint,
  description: string,
  mitigation: string
): RiskAssessment {
  return {
    id: `${Date.now()}-${Math.random()}`,
    assessmentId,
    farmOwner,
    riskType,
    riskLevel,
    description,
    mitigation,
    date: BigInt(Date.now()),
    mitigated: false,
  };
}

