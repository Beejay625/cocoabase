import { useState } from 'react';
import { useAccount } from 'wagmi';
import type { Address } from 'viem';
import {
  createTimelock,
  type Timelock,
} from '@/lib/onchain-timelock-utils';

export function useOnchainTimelock() {
  const { address } = useAccount();
  const [timelocks, setTimelocks] = useState<Timelock[]>([]);

  const createLock = async (
    to: Address,
    amount: bigint,
    unlockTime: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected');
    console.log('Creating timelock:', { to, amount, unlockTime });
  };

  return { timelocks, createLock, address };
}

