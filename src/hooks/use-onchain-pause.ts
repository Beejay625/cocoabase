import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createPauseState,
  pauseContract,
  unpauseContract,
  isPaused,
  type PauseState,
} from '@/lib/onchain-pause-utils';

export function useOnchainPause() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [states, setStates] = useState<PauseState[]>([]);

  const pause = async (stateId: bigint) => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const state = states.find((s) => s.id === stateId);
    if (!state) throw new Error('State not found');
    const updated = pauseContract(state, address);
    console.log('Pausing contract:', { stateId });
  };

  return {
    states,
    pause,
    unpauseContract,
    isPaused,
    address,
  };
}

