import { type Address } from 'viem';

export interface LandValuation {
  id: bigint;
  landId: bigint;
  appraiser: Address;
  value: bigint;
  factors: string[];
  timestamp: bigint;
}

export function createValuation(
  landId: bigint,
  appraiser: Address,
  value: bigint,
  factors: string[]
): LandValuation {
  return {
    id: BigInt(0),
    landId,
    appraiser,
    value,
    factors,
    timestamp: BigInt(Date.now()),
  };
}
