import { type Address } from 'viem';

export interface LandValuation {
  id: bigint;
  appraiser: Address;
  landId: string;
  value: bigint;
  factors: string[];
  timestamp: bigint;
}

export function createValuation(
  appraiser: Address,
  landId: string,
  value: bigint,
  factors: string[]
): LandValuation {
  return {
    id: BigInt(0),
    appraiser,
    landId,
    value,
    factors,
    timestamp: BigInt(Date.now()),
  };
}
