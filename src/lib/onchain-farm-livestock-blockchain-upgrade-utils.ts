import { type Address } from 'viem';

/**
 * Onchain farm livestock blockchain upgrade utilities
 * Upgrade record creation on blockchain
 */

export interface UpgradeRecord {
  id: string;
  animalId: string;
  upgradedBy: Address;
  oldVersion: string;
  newVersion: string;
  upgradeDate: bigint;
  upgradeReason: string;
  verified: boolean;
  timestamp: bigint;
}

export function createUpgradeRecord(
  address: Address,
  animalId: string,
  oldVersion: string,
  newVersion: string,
  upgradeDate: bigint,
  upgradeReason: string
): UpgradeRecord {
  return {
    id: `${Date.now()}-${Math.random()}`,
    animalId,
    upgradedBy: address,
    oldVersion,
    newVersion,
    upgradeDate,
    upgradeReason,
    verified: false,
    timestamp: BigInt(Date.now()),
  };
}

