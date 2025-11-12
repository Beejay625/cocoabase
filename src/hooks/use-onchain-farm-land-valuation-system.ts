import { useState } from 'react';
import { useAccount } from 'wagmi';
import type { Address } from 'viem';
import {
  createValuation,
  getValuationByLand,
  calculateTotalValue,
  getRecentValuations,
  type LandValuation,
} from '@/lib/onchain-farm-land-valuation-system-utils';

export function useOnchainFarmLandValuationSystem() {
  const { address } = useAccount();
  const [valuations, setValuations] = useState<LandValuation[]>([]);

  const create = (
    landId: string,
    value: bigint,
    factors: string[]
  ) => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const valuation = createValuation(address, landId, value, factors);
    setValuations((prev) => [...prev, valuation]);
    console.log('Creating valuation:', { landId, value });
  };

  return {
    valuations,
    create,
    getValuationByLand,
    calculateTotalValue,
    getRecentValuations,
    address,
  };
}
