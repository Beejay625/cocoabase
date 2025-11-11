import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createTimelock,
  canExecute,
  executeTimelock,
  getTimeUntilExecution,
  type Timelock,
} from '@/lib/onchain-timelock-utils';

export function useOnchainTimelock() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [timelocks, setTimelocks] = useState<Timelock[]>([]);

  const execute = async (timelockId: bigint): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const currentTime = BigInt(Date.now());
    const timelock = timelocks.find((t) => t.id === timelockId);
    if (!timelock) throw new Error('Timelock not found');
    if (canExecute(timelock, currentTime)) {
      const updated = executeTimelock(timelock);
      console.log('Executing timelock:', { timelockId });
    }
  };

  return {
    timelocks,
    execute,
    canExecute,
    getTimeUntilExecution,
    address,
  };
}
