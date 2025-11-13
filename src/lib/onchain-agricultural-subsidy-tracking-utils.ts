import { type Address } from 'viem';

export interface Subsidy {
  id: bigint;
  recipient: Address;
  amount: bigint;
  type: string;
  timestamp: bigint;
}

export function createSubsidy(
  recipient: Address,
  amount: bigint,
  type: string
): Subsidy {
  return {
    id: BigInt(Date.now()),
    recipient,
    amount,
    type,
    timestamp: BigInt(Date.now()),
  };
}

export function getTotalSubsidies(
  subsidies: Subsidy[]
): bigint {
  return subsidies.reduce((total, s) => total + s.amount, BigInt(0));
}

export function getSubsidiesByType(
  subsidies: Subsidy[],
  type: string
): Subsidy[] {
  return subsidies.filter((s) => s.type === type);
}
