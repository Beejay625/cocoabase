import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  type Liquidation,
} from '@/lib/onchain-liquidation-utils';

export function useOnchainLiquidation() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [liquidations, setLiquidations] = useState<Liquidation[]>([]);

  const liquidate = async (
    position: Address
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    await writeContract({
      address: '0x0000000000000000000000000000000000000000' as Address,
      abi: [],
      functionName: 'liquidate',
      args: [position],
    });
  };

  return { liquidations, liquidate, address };
}
