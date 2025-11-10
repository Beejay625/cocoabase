import { useState } from 'react';
import { useAccount } from 'wagmi';
import type { Address } from 'viem';
import {
  createLoanApplication,
  type LoanApplication,
} from '@/lib/onchain-agricultural-loan-application-utils';

export function useOnchainAgriculturalLoanApplication() {
  const { address } = useAccount();
  const [applications, setApplications] = useState<LoanApplication[]>([]);

  const createApplication = async (
    lender: Address,
    amount: bigint,
    interestRate: bigint,
    term: bigint,
    purpose: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected');
    const application = createLoanApplication(address, lender, amount, interestRate, term, purpose);
    setApplications([...applications, application]);
  };

  return { applications, createApplication, address };
}
