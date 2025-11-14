import { type Address } from 'viem';

/**
 * Onchain farm crop harvest inspection utilities
 * Inspection creation and approval
 */

export interface HarvestInspection {
  id: string;
  harvestId: string;
  performedBy: Address;
  inspector: string;
  inspectionType: string;
  findings: string[];
  inspectionDate: bigint;
  approved: boolean;
  timestamp: bigint;
}

export function createInspection(
  address: Address,
  harvestId: string,
  inspector: string,
  inspectionType: string,
  findings: string[],
  inspectionDate: bigint
): HarvestInspection {
  return {
    id: `${Date.now()}-${Math.random()}`,
    harvestId,
    performedBy: address,
    inspector,
    inspectionType,
    findings,
    inspectionDate,
    approved: false,
    timestamp: BigInt(Date.now()),
  };
}

