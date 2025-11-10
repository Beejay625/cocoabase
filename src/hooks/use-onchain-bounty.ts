import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createBounty,
  claimBounty,
  isBountyExpired,
  cancelBounty,
  calculateBountyFee,
  type Bounty,
} from '@/lib/onchain-bounty-utils';

/**
 * Hook for onchain bounty operations
 */
export function useOnchainBounty() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [bounties, setBounties] = useState<Bounty[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);

  const createNewBounty = async (
    title: string,
    description: string,
    reward: bigint,
    token: Address,
    expiresAt?: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected');
    setIsCreating(true);
    try {
      const bounty = createBounty(
        address,
        title,
        description,
        reward,
        token,
        expiresAt
      );
      console.log('Creating bounty:', bounty);
      // Onchain bounty creation via smart contract
    } finally {
      setIsCreating(false);
    }
  };

  const claimBountyReward = async (bountyId: bigint): Promise<void> => {
    if (!address) throw new Error('Wallet not connected');
    setIsClaiming(true);
    try {
      const currentTime = BigInt(Date.now());
      const bounty = bounties.find((b) => b.id === bountyId);
      if (!bounty) throw new Error('Bounty not found');
      const updated = claimBounty(bounty, address, currentTime);
      if (updated) {
        console.log('Claiming bounty:', { bountyId, address });
        // Onchain claim via smart contract
      }
    } finally {
      setIsClaiming(false);
    }
  };

  return {
    bounties,
    createNewBounty,
    claimBountyReward,
    isCreating,
    isClaiming,
    isBountyExpired,
    cancelBounty,
    calculateBountyFee,
    address,
  };
}

