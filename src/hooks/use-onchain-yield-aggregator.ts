import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createYieldStrategy,
  depositToStrategy,
  calculateYield,
  type YieldStrategy,
  type YieldPosition,
} from '@/lib/onchain-yield-aggregator-utils';

export function useOnchainYieldAggregator() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [strategies, setStrategies] = useState<YieldStrategy[]>([]);
  const [positions, setPositions] = useState<YieldPosition[]>([]);
  const [isDepositing, setIsDepositing] = useState(false);

  const deposit = async (
    strategyId: bigint,
    amount: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    setIsDepositing(true);
    try {
      const strategy = strategies.find((s) => s.id === strategyId);
      if (!strategy) throw new Error('Strategy not found');
      const currentTime = BigInt(Date.now());
      const position = depositToStrategy(strategy, address, amount, currentTime);
      console.log('Depositing to strategy:', position);
    } finally {
      setIsDepositing(false);
    }
  };

  return {
    strategies,
    positions,
    deposit,
    calculateYield,
    isDepositing,
    address,
  };
}

