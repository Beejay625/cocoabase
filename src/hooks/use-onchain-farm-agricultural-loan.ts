import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createLoan,
  type AgriculturalLoan,
} from '@/lib/onchain-farm-agricultural-loan-utils';

/**
 * Hook for onchain farm agricultural loan
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmAgriculturalLoan() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [loans, setLoans] = useState<AgriculturalLoan[]>([]);

  const applyForLoan = async (
    plantationId: string,
    amount: bigint,
    interestRate: bigint,
    duration: number,
    purpose: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const loan = createLoan(address, plantationId, amount, interestRate, duration, purpose);
    setLoans([...loans, loan]);
  };

  const approveLoan = async (
    contractAddress: Address,
    loanId: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'approveLoan',
      args: [loanId],
    });
  };

  return { loans, applyForLoan, approveLoan, address };
}

