import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createReplayProtection,
  type ReplayProtection,
} from '@/lib/onchain-farm-livestock-blockchain-replay-protection-utils';

/**
 * Hook for onchain farm livestock blockchain replay protection
 * Uses blockchain wallet for all web3 transactions
 */
export function useOnchainFarmLivestockBlockchainReplayProtection() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [protections, setProtections] = useState<ReplayProtection[]>([]);

  const protect = async (
    animalId: string,
    transactionHash: string,
    protectionDate: bigint,
    chainId: number
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    const protection = createReplayProtection(address, animalId, transactionHash, protectionDate, chainId);
    setProtections([...protections, protection]);
  };

  const verifyProtection = async (
    contractAddress: Address,
    protectionId: string
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'verifyProtection',
      args: [protectionId],
    });
  };

  return { protections, protect, verifyProtection, address };
}

