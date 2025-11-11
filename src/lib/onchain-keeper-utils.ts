import { type Address } from 'viem';

export interface Keeper {
  id: bigint;
  contract: Address;
  functionSelector: string;
  interval: bigint;
  lastExecuted: bigint;
}

export function createKeeper(
  contract: Address,
  functionSelector: string,
  interval: bigint
): Keeper {
  return {
    id: BigInt(0),
    contract,
    functionSelector,
    interval,
    lastExecuted: BigInt(0),
  };
}

