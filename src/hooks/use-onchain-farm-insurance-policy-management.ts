import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createInsurancePolicy,
  fileClaim,
  isPolicyExpired,
  calculateClaimAmount,
  type InsurancePolicy,
} from '@/lib/onchain-farm-insurance-policy-management-utils';

/**
 * Hook for onchain farm insurance policy management operations
 * Requires Reown wallet connection via useAccount
 */
export function useOnchainFarmInsurancePolicyManagement() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [policies, setPolicies] = useState<InsurancePolicy[]>([]);
  const [isCreating, setIsCreating] = useState(false);

  const createPolicy = async (
    policyType: InsurancePolicy['policyType'],
    coverageAmount: bigint,
    premium: bigint,
    deductible: bigint,
    startDate: bigint,
    endDate: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    setIsCreating(true);
    try {
      const policy = createInsurancePolicy(
        address,
        policyType,
        coverageAmount,
        premium,
        deductible,
        startDate,
        endDate
      );
      setPolicies((prev) => [...prev, policy]);
      await writeContract({
        address: '0x0000000000000000000000000000000000000000' as Address,
        abi: [],
        functionName: 'createInsurancePolicy',
        args: [policyType, coverageAmount, premium, deductible, startDate, endDate],
      });
    } finally {
      setIsCreating(false);
    }
  };

  return {
    policies,
    createPolicy,
    fileClaim,
    isPolicyExpired,
    calculateClaimAmount,
    isCreating,
    address,
  };
}

