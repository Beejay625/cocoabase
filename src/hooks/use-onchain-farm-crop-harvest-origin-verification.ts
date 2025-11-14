import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createOriginVerification,
  type OriginVerification,
} from '@/lib/onchain-farm-crop-harvest-origin-verification-utils';

/**
 * Hook for onchain farm crop harvest origin verification
 * Uses blockchain wallet for all web3 transactions
 */
export function useOnchainFarmCropHarvestOriginVerification() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [verifications, setVerifications] = useState<OriginVerification[]>([]);

  const verifyOrigin = async (
    harvestId: string,
    originLocation: string,
    verificationMethod: string,
    verificationDate: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    const verification = createOriginVerification(address, harvestId, originLocation, verificationMethod, verificationDate);
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

  return { verifications, verifyOrigin, confirmVerification, address };
}

