import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createCommitment,
  type Commitment,
} from '@/lib/onchain-farm-crop-harvest-blockchain-commitment-utils';

/**
 * Hook for onchain farm crop harvest blockchain commitment
 * Uses blockchain wallet for all web3 transactions
 */
export function useOnchainFarmCropHarvestBlockchainCommitment() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [commitments, setCommitments] = useState<Commitment[]>([]);

  const commit = async (
    harvestId: string,
    commitmentHash: string,
    commitmentDate: bigint,
    revealDate: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    const commitment = createCommitment(address, harvestId, commitmentHash, commitmentDate, revealDate);
    setCommitments([...commitments, commitment]);
  };

  const revealCommitment = async (
    contractAddress: Address,
    commitmentId: string,
    secret: string
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'revealCommitment',
      args: [commitmentId, secret],
    });
  };

  return { commitments, commit, revealCommitment, address };
}

