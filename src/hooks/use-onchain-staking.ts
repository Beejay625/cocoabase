import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  type StakingPool,
} from '@/lib/onchain-staking-utils';

export function useOnchainStaking() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [pools, setPools] = useState<StakingPool[]>([]);

  const stake = async (
    pool: Address,
    amount: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    await writeContract({
      address: pool,
      abi: [],
      functionName: 'stake',
      args: [amount],
    });
  };

  return { pools, stake, address };
}

