import { type Address } from 'viem';

export interface SeedQualityRecord {
  id: string;
  seedBatchId: bigint;
  germinationRate: bigint;
  purity: bigint;
  moistureContent: bigint;
  approved: boolean;
  tester: Address;
}

export function createSeedQualityRecord(
  address: Address,
  seedBatchId: bigint,
  germinationRate: bigint,
  purity: bigint,
  moistureContent: bigint
): SeedQualityRecord {
  const approved = germinationRate >= 85n && purity >= 98n && moistureContent <= 8n;
  return {
    id: `${Date.now()}-${Math.random()}`,
    seedBatchId,
    germinationRate,
    purity,
    moistureContent,
    approved,
    tester: address,
  };
}


