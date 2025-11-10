import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createLiquidation,
  executeLiquidation,
  calculateLiquidationBonus,
  isLiquidationProfitable,
  type Liquidation,
} from '@/lib/onchain-liquidation-utils';

export function useOnchainLiquidation() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [liquidations, setLiquidations] = useState<Liquidation[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);

  const executeLiquidationOrder = async (
    liquidationId: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected');
    setIsExecuting(true);
    try {
      const liquidation = liquidations.find((l) => l.id === liquidationId);
      if (!liquidation) throw new Error('Liquidation not found');
      const updated = executeLiquidation(liquidation, address);
      if (updated) {
        console.log('Executing liquidation:', { liquidationId, address });
      }
    } finally {
      setIsExecuting(false);
    }
  };

  return {
    liquidations,
    executeLiquidationOrder,
    calculateLiquidationBonus,
    isLiquidationProfitable,
    isExecuting,
    address,
  };
}
