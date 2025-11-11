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

export function shouldExecute(
  keeper: Keeper,
  currentTime: bigint
): boolean {
  return currentTime >= keeper.lastExecuted + keeper.interval;
}

export function markExecuted(keeper: Keeper, currentTime: bigint): Keeper {
  return {
    ...keeper,
    lastExecuted: currentTime,
  };
}

export function getTimeUntilExecution(
  keeper: Keeper,
  currentTime: bigint
): bigint {
  const nextExecution = keeper.lastExecuted + keeper.interval;
  if (currentTime >= nextExecution) return BigInt(0);
  return nextExecution - currentTime;
}
