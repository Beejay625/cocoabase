import { useState } from 'react';
import { useAccount } from 'wagmi';
import {
  createProposal,
  voteOnProposal,
  type GovernanceProposal,
} from '@/lib/onchain-cooperative-governance-utils';

export function useOnchainCooperativeGovernance() {
  const { address } = useAccount();
  const [proposals, setProposals] = useState<GovernanceProposal[]>([]);

  const createNewProposal = async (
    title: string,
    description: string,
    deadline: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected');
    const proposal = createProposal(address, title, description, deadline);
    setProposals([...proposals, proposal]);
  };

  return { proposals, createNewProposal, address };
}
