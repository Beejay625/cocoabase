import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createResearchGrant,
  approveGrant,
  activateGrant,
  completeMilestone,
  calculateGrantProgress,
  type ResearchGrant,
  type GrantMilestone,
} from '@/lib/onchain-agricultural-research-grants-utils';

/**
 * Hook for onchain agricultural research grants operations
 * Requires Reown wallet connection via useAccount
 */
export function useOnchainAgriculturalResearchGrants() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [grants, setGrants] = useState<ResearchGrant[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isApproving, setIsApproving] = useState(false);

  const createGrant = async (
    grantee: Address,
    title: string,
    description: string,
    amount: bigint,
    duration: bigint,
    milestones: GrantMilestone[]
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    setIsCreating(true);
    try {
      const grant = createResearchGrant(
        address,
        grantee,
        title,
        description,
        amount,
        duration,
        milestones
      );
      setGrants((prev) => [...prev, grant]);
      console.log('Creating research grant:', grant);
      // Onchain grant creation via smart contract
      await writeContract({
        address: '0x0000000000000000000000000000000000000000' as Address,
        abi: [],
        functionName: 'createResearchGrant',
        args: [grantee, title, description, amount, duration, milestones],
      });
    } finally {
      setIsCreating(false);
    }
  };

  const approveGrantRequest = async (
    grantId: bigint,
    startDate: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    setIsApproving(true);
    try {
      const grant = grants.find((g) => g.id === grantId);
      if (!grant) throw new Error('Grant not found');
      const approved = approveGrant(grant, startDate);
      setGrants((prev) =>
        prev.map((g) => (g.id === grantId ? approved : g))
      );
      console.log('Approving research grant:', { grantId, startDate });
      // Onchain grant approval via smart contract
      await writeContract({
        address: '0x0000000000000000000000000000000000000000' as Address,
        abi: [],
        functionName: 'approveGrant',
        args: [grantId, startDate],
      });
    } finally {
      setIsApproving(false);
    }
  };

  const completeGrantMilestone = async (
    grantId: bigint,
    milestoneId: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    try {
      const grant = grants.find((g) => g.id === grantId);
      if (!grant) throw new Error('Grant not found');
      const updated = completeMilestone(grant, milestoneId);
      setGrants((prev) =>
        prev.map((g) => (g.id === grantId ? updated : g))
      );
      console.log('Completing milestone:', { grantId, milestoneId });
      // Onchain milestone completion via smart contract
      await writeContract({
        address: '0x0000000000000000000000000000000000000000' as Address,
        abi: [],
        functionName: 'completeMilestone',
        args: [grantId, milestoneId],
      });
    } finally {
      // Milestone completion complete
    }
  };

  return {
    grants,
    createGrant,
    approveGrantRequest,
    completeGrantMilestone,
    activateGrant,
    calculateGrantProgress,
    isCreating,
    isApproving,
    address,
  };
}

