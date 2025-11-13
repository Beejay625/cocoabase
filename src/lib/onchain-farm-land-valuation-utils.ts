import { type Address } from 'viem';

export interface Valuation {
  id: string;
  valuationId: bigint;
  landOwner: Address;
  landId: bigint;
  value: bigint;
  valuationDate: bigint;
  valuationMethod: string;
  appraiser: Address;
  verified: boolean;
}

export function createValuation(
  landOwner: Address,
  valuationId: bigint,
  landId: bigint,
  value: bigint,
  valuationMethod: string,
  appraiser: Address
): Valuation {
  return {
    id: `${Date.now()}-${Math.random()}`,
    valuationId,
    landOwner,
    landId,
    value,
    valuationDate: BigInt(Date.now()),
    valuationMethod,
    appraiser,
    verified: false,
  };
}

