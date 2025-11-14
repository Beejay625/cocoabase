import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createConsensusRecord,
  type ConsensusRecord,
} from '@/lib/onchain-farm-crop-harvest-blockchain-consensus-utils';

/**
 * Hook for onchain farm crop harvest blockchain consensus
 * Uses blockchain wallet for all web3 transactions
 */
export function useOnchainFarmCropHarvestBlockchainConsensus() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [records, setRecords] = useState<ConsensusRecord[]>([]);

  const createConsensus = async (
    harvestId: string,
    proposal: string,
    voters: Address[],
    consensusDate: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    const record = createConsensusRecord(address, harvestId, proposal, voters, consensusDate);
    setRecords([...records, record]);
  };

  const voteOnConsensus = async (
    contractAddress: Address,
    recordId: string,
    vote: boolean
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'voteOnConsensus',
      args: [recordId, vote],
    });
  };

  return { records, createConsensus, voteOnConsensus, address };
}

