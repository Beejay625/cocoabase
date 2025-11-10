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

