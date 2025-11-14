import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createNotarization,
  type Notarization,
} from '@/lib/onchain-farm-crop-harvest-blockchain-notarization-utils';

/**
 * Hook for onchain farm crop harvest blockchain notarization
 * Uses blockchain wallet for all web3 transactions
 */
export function useOnchainFarmCropHarvestBlockchainNotarization() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [notarizations, setNotarizations] = useState<Notarization[]>([]);

  const notarize = async (
    harvestId: string,
    documentHash: string,
    notary: string,
    notarizationDate: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    const notarization = createNotarization(address, harvestId, documentHash, notary, notarizationDate);
    setNotarizations([...notarizations, notarization]);
  };

  const verifyNotarization = async (
    contractAddress: Address,
    notarizationId: string
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'verifyNotarization',
      args: [notarizationId],
    });
  };

  return { notarizations, notarize, verifyNotarization, address };
}

