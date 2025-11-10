import { useState } from 'react';
import { useAccount } from 'wagmi';
import type { Address } from 'viem';
import {
  createPriceOracle,
  updateOraclePrice,
  isOracleStale,
  calculatePriceDeviation,
  type PriceOracle,
} from '@/lib/onchain-price-oracle-utils';

export function useOnchainPriceOracle() {
  const { address } = useAccount();
  const [oracles, setOracles] = useState<PriceOracle[]>([]);

  const updatePrice = (
    oracleId: bigint,
    newPrice: bigint,
    confidence: number
  ) => {
    const oracle = oracles.find((o) => o.id === oracleId);
    if (!oracle) throw new Error('Oracle not found');
    const updated = updateOraclePrice(oracle, newPrice, confidence);
    setOracles((prev) =>
      prev.map((o) => (o.id === oracleId ? updated : o))
    );
    console.log('Updating oracle price:', updated);
  };

  return {
    oracles,
    updatePrice,
    isOracleStale,
    calculatePriceDeviation,
    address,
  };
}

