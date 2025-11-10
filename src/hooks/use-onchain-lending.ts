import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createLoan,
  calculateInterest,
  repayLoan,
  isLoanDefaulted,
  calculateTotalRepayment,
  type Loan,
} from '@/lib/onchain-lending-utils';

export function useOnchainLending() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [loans, setLoans] = useState<Loan[]>([]);
  const [isCreating, setIsCreating] = useState(false);

  const createNewLoan = async (
    lender: Address,
    principal: bigint,
    interestRate: bigint,
    duration: bigint,
    collateral: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected');
    setIsCreating(true);
    try {
      const loan = createLoan(address, lender, principal, interestRate, duration, collateral);
      console.log('Creating loan:', loan);
    } finally {
      setIsCreating(false);
    }
  };

  return {
    loans,
    createNewLoan,
    isCreating,
    calculateInterest,
    repayLoan,
    isLoanDefaulted,
    calculateTotalRepayment,
    address,
  };
}
