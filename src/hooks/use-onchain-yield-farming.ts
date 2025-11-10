import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  calculateFarmRewards,
  type YieldFarm,
} from '@/lib/onchain-yield-farming-utils';

export function useOnchainYieldFarming() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [farms, setFarms] = useState<YieldFarm[]>([]);

  const stake = async (
    farm: Address,
    amount: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    await writeContract({
      address: farm,
      abi: [],
      functionName: 'stake',
      args: [amount],
    });
  };

  return { farms, stake, address };
}
