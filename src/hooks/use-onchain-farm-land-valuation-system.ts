import { useState } from 'react';
import { useAccount } from 'wagmi';
import type { Address } from 'viem';
import {
  createValuation,
  getValuationsByLand,
  getRecentValuations,
  calculateAverageValuation,
  type LandValuation,
} from '@/lib/onchain-farm-land-valuation-system-utils';

export function useOnchainFarmLandValuationSystem() {
  const { address } = useAccount();
  const [valuations, setValuations] = useState<LandValuation[]>([]);

  const create = (
    landParcel: Address,
    value: bigint,
    factors: string[]
  ) => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const valuation = createValuation(landParcel, address, value, factors);
    setValuations((prev) => [...prev, valuation]);
    console.log('Creating valuation:', { landParcel, value });
  };

  return {
    valuations,
    create,
    getValuationsByLand,
    getRecentValuations,
    calculateAverageValuation,
    address,
  };
}
