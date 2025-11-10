import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createPaymentEscrow,
  fundEscrow,
  releaseEscrow,
  refundEscrow,
  type PaymentEscrow,
} from '@/lib/onchain-supply-chain-payment-escrow-utils';

/**
 * Hook for onchain supply chain payment escrow operations
 * Requires Reown wallet connection via useAccount
 */
export function useOnchainSupplyChainPaymentEscrow() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [escrows, setEscrows] = useState<PaymentEscrow[]>([]);
  const [isCreating, setIsCreating] = useState(false);

  const createEscrow = async (
    payee: Address,
    amount: bigint,
    description: string,
    releaseConditions: string[]
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    setIsCreating(true);
    try {
      const escrow = createPaymentEscrow(address, payee, amount, description, releaseConditions);
      setEscrows((prev) => [...prev, escrow]);
      await writeContract({
        address: '0x0000000000000000000000000000000000000000' as Address,
        abi: [],
        functionName: 'createPaymentEscrow',
        args: [payee, amount, description, releaseConditions],
      });
    } finally {
      setIsCreating(false);
    }
  };

  return {
    escrows,
    createEscrow,
    fundEscrow,
    releaseEscrow,
    refundEscrow,
    isCreating,
    address,
  };
}

