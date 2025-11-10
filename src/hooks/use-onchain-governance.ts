import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createProposal,
  castVote,
  finalizeProposal,
  hasQuorum,
  type GovernanceProposal,
} from '@/lib/onchain-governance-utils';

export function useOnchainGovernance() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [proposals, setProposals] = useState<GovernanceProposal[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isVoting, setIsVoting] = useState(false);

  const createNewProposal = async (
    title: string,
    description: string,
    duration: bigint,
    quorum: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected');
    setIsCreating(true);
    try {
      const proposal = createProposal(address, title, description, duration, quorum);
      console.log('Creating proposal:', proposal);
    } finally {
      setIsCreating(false);
    }
  };

  const voteOnProposal = async (
    proposalId: bigint,
    support: boolean,
    votingPower: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected');
    setIsVoting(true);
    try {
      const currentTime = BigInt(Date.now());
      const proposal = proposals.find((p) => p.id === proposalId);
      if (!proposal) throw new Error('Proposal not found');
      const updated = castVote(proposal, address, support, votingPower, currentTime);
      if (updated) {
        console.log('Voting on proposal:', { proposalId, support, address });
      }
    } finally {
      setIsVoting(false);
    }
  };

  return {
    proposals,
    createNewProposal,
    voteOnProposal,
    isCreating,
    isVoting,
    finalizeProposal,
    hasQuorum,
    address,
  };
}

