import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createInsurancePolicy,
  type InsurancePolicy,
} from '@/lib/onchain-farm-livestock-insurance-utils';

/**
 * Hook for onchain farm livestock insurance
 * Uses blockchain wallet for all web3 transactions
 */
export function useOnchainFarmLivestockInsurance() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [policies, setPolicies] = useState<InsurancePolicy[]>([]);

  const createPolicy = async (
    animalId: string,
    coverageAmount: bigint,
    premium: bigint,
    policyStartDate: bigint,
    policyEndDate: bigint,
    insurer: string
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    const policy = createInsurancePolicy(address, animalId, coverageAmount, premium, policyStartDate, policyEndDate, insurer);
    setPolicies([...policies, policy]);
  };

  const fileClaim = async (
    contractAddress: Address,
    policyId: string,
    claimAmount: bigint,
    claimReason: string
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'fileClaim',
      args: [policyId, claimAmount, claimReason],
    });
  };

  return { policies, createPolicy, fileClaim, address };
}

