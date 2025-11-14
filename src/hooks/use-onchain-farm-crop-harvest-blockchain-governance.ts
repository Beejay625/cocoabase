import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createGovernanceProposal,
  type GovernanceProposal,
} from '@/lib/onchain-farm-crop-harvest-blockchain-governance-utils';

/**
 * Hook for onchain farm crop harvest blockchain governance
 * Uses blockchain wallet for all web3 transactions
 */
export function useOnchainFarmCropHarvestBlockchainGovernance() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [proposals, setProposals] = useState<GovernanceProposal[]>([]);

  const createProposal = async (
    harvestId: string,
    proposal: string,
    votingPeriod: number,
    proposalDate: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    const governanceProposal = createGovernanceProposal(address, harvestId, proposal, votingPeriod, proposalDate);
    setProposals([...proposals, governanceProposal]);
  };

  const voteOnProposal = async (
    contractAddress: Address,
    proposalId: string,
    vote: boolean
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'voteOnProposal',
      args: [proposalId, vote],
    });
  };

  return { proposals, createProposal, voteOnProposal, address };
}

