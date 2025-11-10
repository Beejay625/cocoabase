import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  canLiquidate,
  calculateLiquidationBonus,
  executeLiquidation,
  type Liquidation,
} from '@/lib/onchain-liquidation-utils';

export function useOnchainLiquidation() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [liquidations, setLiquidations] = useState<Liquidation[]>([]);
  const [isLiquidating, setIsLiquidating] = useState(false);

  const liquidatePosition = async (
    liquidatedUser: Address,
    collateral: bigint,
    debt: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected');
    setIsLiquidating(true);
    try {
      const liquidation = executeLiquidation(liquidatedUser, address, collateral, debt);
      console.log('Executing liquidation:', liquidation);
    } finally {
      setIsLiquidating(false);
    }
  };

  return {
    liquidations,
    liquidatePosition,
    isLiquidating,
    canLiquidate,
    calculateLiquidationBonus,
    address,
  };
}
