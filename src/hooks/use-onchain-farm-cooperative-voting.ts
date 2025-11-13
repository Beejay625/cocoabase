import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createVote,
  type Vote,
} from '@/lib/onchain-farm-cooperative-voting-utils';

/**
 * Hook for onchain farm cooperative voting
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmCooperativeVoting() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [votes, setVotes] = useState<Vote[]>([]);

  const createProposal = async (
    proposalTitle: string,
    description: string,
    votingPeriod: number
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const vote = createVote(address, proposalTitle, description, votingPeriod);
    setVotes([...votes, vote]);
  };

  const castVote = async (
    contractAddress: Address,
    proposalId: string,
    support: boolean
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'castVote',
      args: [proposalId, support],
    });
  };

  return { votes, createProposal, castVote, address };
}

