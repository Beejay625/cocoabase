import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createRotationHistory,
  type CropRotationHistory,
} from '@/lib/onchain-farm-crop-rotation-history-utils';

/**
 * Hook for onchain farm crop rotation history
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmCropRotationHistory() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [histories, setHistories] = useState<CropRotationHistory[]>([]);

  const recordRotation = async (
    fieldId: string,
    previousCrop: string,
    currentCrop: string,
    rotationDate: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const history = createRotationHistory(address, fieldId, previousCrop, currentCrop, rotationDate);
    setHistories([...histories, history]);
  };

  const verifyRotation = async (
    contractAddress: Address,
    historyId: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'verifyRotation',
      args: [historyId],
    });
  };

  return { histories, recordRotation, verifyRotation, address };
}

