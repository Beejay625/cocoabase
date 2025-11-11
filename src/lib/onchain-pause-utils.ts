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

export function pauseContract(
  state: PauseState,
  pauser: Address
): PauseState {
  return {
    ...state,
    paused: true,
    pausedBy: pauser,
    pausedAt: BigInt(Date.now()),
  };
}

export function unpauseContract(state: PauseState): PauseState {
  return {
    ...state,
    paused: false,
    pausedBy: '0x0',
    pausedAt: BigInt(0),
  };
}

export function isPaused(state: PauseState): boolean {
  return state.paused;
}
