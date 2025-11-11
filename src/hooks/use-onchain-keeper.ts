import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createKeeper,
  shouldExecute,
  markExecuted,
  getTimeUntilExecution,
  type Keeper,
} from '@/lib/onchain-keeper-utils';

export function useOnchainKeeper() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [keepers, setKeepers] = useState<Keeper[]>([]);

  const execute = async (keeperId: bigint): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const currentTime = BigInt(Date.now());
    const keeper = keepers.find((k) => k.id === keeperId);
    if (!keeper) throw new Error('Keeper not found');
    if (shouldExecute(keeper, currentTime)) {
      const updated = markExecuted(keeper, currentTime);
      console.log('Executing keeper:', { keeperId });
    }
  };

  return {
    keepers,
    execute,
    shouldExecute,
    getTimeUntilExecution,
    address,
  };
}

