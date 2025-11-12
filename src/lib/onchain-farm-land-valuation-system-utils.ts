import { type Address } from 'viem';

export interface LandValuation {
  id: bigint;
  landParcel: Address;
  appraiser: Address;
  value: bigint;
  factors: string[];
  timestamp: bigint;
}

export function createValuation(
  landParcel: Address,
  appraiser: Address,
  value: bigint,
  factors: string[]
): LandValuation {
  return {
    id: BigInt(0),
    landParcel,
    appraiser,
    value,
    factors,
    timestamp: BigInt(Date.now()),
  };
}
