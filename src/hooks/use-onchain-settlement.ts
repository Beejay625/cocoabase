import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  type Settlement,
} from '@/lib/onchain-settlement-utils';

export function useOnchainSettlement() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [settlements, setSettlements] = useState<Settlement[]>([]);

  const createSettlement = async (
    payee: Address,
    amount: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    await writeContract({
      address: '0x0000000000000000000000000000000000000000' as Address,
      abi: [],
      functionName: 'createSettlement',
      args: [payee, amount],
    });
  };

  return { settlements, createSettlement, address };
}
