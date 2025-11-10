import { type Address } from 'viem';

export interface CarbonCredit {
  id: bigint;
  owner: Address;
  amount: bigint;
  plantationId: bigint;
  createdAt: bigint;
  txHash: string;
}

export function mintCarbonCredit(
  owner: Address,
  amount: bigint,
  plantationId: bigint
): CarbonCredit {
  return {
    id: BigInt(Date.now()),
    owner,
    amount,
    plantationId,
    createdAt: BigInt(Date.now()),
    txHash: '',
  };
}

export function tradeCarbonCredit(
  credit: CarbonCredit,
  from: Address,
  to: Address,
  price: bigint
): CarbonCredit | null {
  if (credit.owner.toLowerCase() !== from.toLowerCase()) return null;
  return {
    ...credit,
    owner: to,
  };
}
