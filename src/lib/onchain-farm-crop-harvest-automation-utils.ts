import { type Address } from 'viem';

export interface AutomationRule {
  id: string;
  plantationId: bigint;
  cropType: string;
  maturityThreshold: bigint;
  harvestWindow: bigint;
  owner: Address;
  enabled: boolean;
}

export function createAutomationRule(
  address: Address,
  plantationId: bigint,
  cropType: string,
  maturityThreshold: bigint,
  harvestWindow: bigint
): AutomationRule {
  return {
    id: `${Date.now()}-${Math.random()}`,
    plantationId,
    cropType,
    maturityThreshold,
    harvestWindow,
    owner: address,
    enabled: true,
  };
}

