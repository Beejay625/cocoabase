import { useState } from 'react';
import { useAccount } from 'wagmi';
import {
  createSubsidy,
  type Subsidy,
} from '@/lib/onchain-agricultural-subsidy-tracking-utils';

export function useOnchainAgriculturalSubsidyTracking() {
  const { address } = useAccount();
  const [subsidies, setSubsidies] = useState<Subsidy[]>([]);

  const create = async (
    amount: bigint,
    type: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const subsidy = createSubsidy(address, amount, type);
    setSubsidies([...subsidies, subsidy]);
  };

  return { subsidies, create, address };
}
