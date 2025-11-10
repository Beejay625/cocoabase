import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createLendingPool,
  lendToPool,
  borrowFromPool,
  type LendingPool,
  type Loan,
} from '@/lib/onchain-lending-pool-utils';

export function useOnchainLendingPool() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [pools, setPools] = useState<LendingPool[]>([]);
  const [loans, setLoans] = useState<Loan[]>([]);
  const [isLending, setIsLending] = useState(false);

  const lend = async (
    poolId: bigint,
    amount: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    setIsLending(true);
    try {
      const pool = pools.find((p) => p.id === poolId);
      if (!pool) throw new Error('Pool not found');
      const updated = lendToPool(pool, address, amount);
      console.log('Lending to pool:', { poolId, amount });
    } finally {
      setIsLending(false);
    }
  };

  return {
    pools,
    loans,
    lend,
    borrowFromPool,
    isLending,
    address,
  };
}

