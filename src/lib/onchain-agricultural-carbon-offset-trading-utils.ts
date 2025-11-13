import { type Address } from 'viem';

export interface CarbonOffset {
  id: bigint;
  owner: Address;
  amount: bigint;
  price: bigint;
  timestamp: bigint;
}

export function createCarbonOffset(
  owner: Address,
  amount: bigint,
  price: bigint
): CarbonOffset {
  return {
    id: BigInt(Date.now()),
    owner,
    amount,
    price,
    timestamp: BigInt(Date.now()),
  };
}

export function calculateTotalValue(
  offsets: CarbonOffset[]
): bigint {
  return offsets.reduce((total, o) => total + o.amount * o.price, BigInt(0));
}

export function getOffsetsByOwner(
  offsets: CarbonOffset[],
  owner: Address
): CarbonOffset[] {
  return offsets.filter((o) => o.owner.toLowerCase() === owner.toLowerCase());
}
