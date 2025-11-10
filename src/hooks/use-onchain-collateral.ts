import { useState } from 'react';
import { useAccount } from 'wagmi';
import type { Address } from 'viem';
import {
  createCollateral,
  type Collateral,
} from '@/lib/onchain-collateral-utils';

export function useOnchainCollateral() {
  const { address } = useAccount();
  const [collaterals, setCollaterals] = useState<Collateral[]>([]);

  const depositCollateral = async (
    asset: Address,
    amount: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected');
    console.log('Depositing collateral:', { asset, amount });
  };

  return { collaterals, depositCollateral, address };
}

