import { useState } from 'react';
import { useAccount } from 'wagmi';
import type { Address } from 'viem';
import {
  calculateFarmRewards,
  type YieldFarm,
} from '@/lib/onchain-yield-farming-utils';

export function useOnchainYieldFarming() {
  const { address } = useAccount();
  const [farms, setFarms] = useState<YieldFarm[]>([]);

  const stake = async (
    farm: Address,
    amount: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected');
    console.log('Staking in farm:', { farm, amount });
  };

  return { farms, stake, address };
}

