import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createBondingCurve,
  buyTokens,
  sellTokens,
  type BondingCurve,
} from '@/lib/onchain-bonding-curve-utils';

export function useOnchainBondingCurve() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [curves, setCurves] = useState<BondingCurve[]>([]);
  const [isTrading, setIsTrading] = useState(false);

  const buy = async (
    curveId: bigint,
    reserveAmount: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    setIsTrading(true);
    try {
      const curve = curves.find((c) => c.id === curveId);
      if (!curve) throw new Error('Curve not found');
      const result = buyTokens(curve, reserveAmount);
      console.log('Buying tokens:', result);
    } finally {
      setIsTrading(false);
    }
  };

  return {
    curves,
    buy,
    sellTokens,
    isTrading,
    address,
  };
}

