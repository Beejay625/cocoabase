import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createFeeCollector,
  collectFee,
  withdrawFees,
  calculateAvailableFees,
  type FeeCollector,
} from '@/lib/onchain-fee-collector-utils';

export function useOnchainFeeCollector() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [collectors, setCollectors] = useState<FeeCollector[]>([]);
  const [isWithdrawing, setIsWithdrawing] = useState(false);

  const withdraw = async (
    collectorId: bigint,
    amount: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    setIsWithdrawing(true);
    try {
      const collector = collectors.find((c) => c.id === collectorId);
      if (!collector) throw new Error('Collector not found');
      const updated = withdrawFees(collector, amount);
      if (updated) {
        console.log('Withdrawing fees:', { collectorId, amount });
      }
    } finally {
      setIsWithdrawing(false);
    }
  };

  return {
    collectors,
    withdraw,
    collectFee,
    calculateAvailableFees,
    isWithdrawing,
    address,
  };
}

