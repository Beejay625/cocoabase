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
