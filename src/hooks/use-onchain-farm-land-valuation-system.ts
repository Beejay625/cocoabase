import { useState } from 'react';
import { useAccount } from 'wagmi';
import type { Address } from 'viem';
import {
  createValuation,
  type LandValuation,
} from '@/lib/onchain-farm-land-valuation-system-utils';

export function useOnchainFarmLandValuationSystem() {
  const { address } = useAccount();
  const [valuations, setValuations] = useState<LandValuation[]>([]);

  const create = async (
    landParcelId: bigint,
    valuationAmount: bigint,
    appraiser: Address,
    factors: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected');
    const valuation = createValuation(address, landParcelId, valuationAmount, appraiser, factors);
    setValuations([...valuations, valuation]);
  };

  return { valuations, create, address };
}
