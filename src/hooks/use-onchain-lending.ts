import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  type LendingPool,
} from '@/lib/onchain-lending-utils';

export function useOnchainLending() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [pools, setPools] = useState<LendingPool[]>([]);

  const lend = async (
    pool: Address,
    amount: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    await writeContract({
      address: pool,
      abi: [],
      functionName: 'lend',
      args: [amount],
    });
  };

  return { pools, lend, address };
}
