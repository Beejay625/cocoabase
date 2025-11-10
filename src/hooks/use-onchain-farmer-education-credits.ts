import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createEducationCredit,
  verifyEducationCredit,
  calculateTotalCredits,
  getEducationLevel,
  isCreditExpired,
  type EducationCredit,
} from '@/lib/onchain-farmer-education-credits-utils';

/**
 * Hook for onchain farmer education credits operations
 * Requires Reown wallet connection via useAccount
 */
export function useOnchainFarmerEducationCredits() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [credits, setCredits] = useState<EducationCredit[]>([]);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const registerEducationCredit = async (
    courseTitle: string,
    provider: string,
    credits: number,
    certificationHash: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    setIsRegistering(true);
    try {
      const credit = createEducationCredit(
        address,
        courseTitle,
        provider,
        credits,
        certificationHash
      );
      setCredits((prev) => [...prev, credit]);
      console.log('Registering education credit:', credit);
      // Onchain credit registration via smart contract
      await writeContract({
        address: '0x0000000000000000000000000000000000000000' as Address,
        abi: [],
        functionName: 'registerEducationCredit',
        args: [courseTitle, provider, credits, certificationHash],
      });
    } finally {
      setIsRegistering(false);
    }
  };

  const verifyCredit = async (creditId: bigint): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    setIsVerifying(true);
    try {
      const credit = credits.find((c) => c.id === creditId);
      if (!credit) throw new Error('Credit not found');
      const verified = verifyEducationCredit(credit);
      setCredits((prev) =>
        prev.map((c) => (c.id === creditId ? verified : c))
      );
      console.log('Verifying education credit:', { creditId });
      // Onchain verification via smart contract
      await writeContract({
        address: '0x0000000000000000000000000000000000000000' as Address,
        abi: [],
        functionName: 'verifyEducationCredit',
        args: [creditId],
      });
    } finally {
      setIsVerifying(false);
    }
  };

  return {
    credits,
    registerEducationCredit,
    verifyCredit,
    calculateTotalCredits,
    getEducationLevel,
    isCreditExpired,
    isRegistering,
    isVerifying,
    address,
  };
}

