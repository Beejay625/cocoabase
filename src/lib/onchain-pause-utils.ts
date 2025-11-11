import { type Address } from 'viem';

export interface PauseState {
  id: bigint;
  contract: Address;
  paused: boolean;
  pausedBy: Address;
  pausedAt: bigint;
}

export function createPauseState(contract: Address): PauseState {
  return {
    id: BigInt(0),
    contract,
    paused: false,
    pausedBy: '0x0',
    pausedAt: BigInt(0),
  };
}

