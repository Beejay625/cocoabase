import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  calculateLPAmount,
  type LiquidityPool,
} from '@/lib/onchain-liquidity-utils';

export function useOnchainLiquidity() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [pools, setPools] = useState<LiquidityPool[]>([]);

  const addLiquidity = async (
    pool: Address,
    amountA: bigint,
    amountB: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    await writeContract({
      address: pool,
      abi: [],
      functionName: 'addLiquidity',
      args: [amountA, amountB],
    });
  };

  return { pools, addLiquidity, address };
}
