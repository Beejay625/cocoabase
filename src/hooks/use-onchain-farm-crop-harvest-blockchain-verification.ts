import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createBlockchainVerification,
  type BlockchainVerification,
} from '@/lib/onchain-farm-crop-harvest-blockchain-verification-utils';

/**
 * Hook for onchain farm crop harvest blockchain verification
 * Uses blockchain wallet for all web3 transactions
 */
export function useOnchainFarmCropHarvestBlockchainVerification() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [verifications, setVerifications] = useState<BlockchainVerification[]>([]);

  const verifyOnBlockchain = async (
    harvestId: string,
    verificationHash: string,
    verificationDate: bigint,
    verifier: string
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    const verification = createBlockchainVerification(address, harvestId, verificationHash, verificationDate, verifier);
    setVerifications([...verifications, verification]);
  };

  const confirmVerification = async (
    contractAddress: Address,
    verificationId: string
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'confirmVerification',
      args: [verificationId],
    });
  };

  return { verifications, verifyOnBlockchain, confirmVerification, address };
}

