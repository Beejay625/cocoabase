import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createTokenBurn,
  calculateTotalBurned,
  getBurnsByToken,
  getBurnsByBurner,
  type TokenBurn,
} from '@/lib/onchain-token-burn-utils';

export function useOnchainTokenBurn() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [burns, setBurns] = useState<TokenBurn[]>([]);
  const [isBurning, setIsBurning] = useState(false);

  const burn = async (
    token: Address,
    amount: bigint,
    reason: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    setIsBurning(true);
    try {
      const burn = createTokenBurn(token, address, amount, reason);
      setBurns((prev) => [...prev, burn]);
      console.log('Burning tokens:', burn);
    } finally {
      setIsBurning(false);
    }
  };

  return {
    burns,
    burn,
    calculateTotalBurned,
    getBurnsByToken,
    getBurnsByBurner,
    isBurning,
    address,
  };
}

