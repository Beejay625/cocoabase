import { type Address } from 'viem';

export interface Timelock {
  id: bigint;
  target: Address;
  value: bigint;
  data: string;
  eta: bigint;
  executed: boolean;
}

export function createTimelock(
  target: Address,
  value: bigint,
  data: string,
  eta: bigint
): Timelock {
  return {
    id: BigInt(0),
    target,
    value,
    data,
    eta,
    executed: false,
  };
}
