import { useState } from 'react';
import { useAccount } from 'wagmi';
import {
  recordRotationHistory,
  type CropRotationHistory,
} from '@/lib/onchain-crop-rotation-history-utils';

export function useOnchainCropRotationHistory() {
  const { address } = useAccount();
  const [history, setHistory] = useState<CropRotationHistory[]>([]);

  const record = async (
    plantationId: bigint,
    previousCrop: string,
    currentCrop: string,
    rotationReason: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected');
    const rotation = recordRotationHistory(address, plantationId, previousCrop, currentCrop, rotationReason);
    setHistory([...history, rotation]);
  };

  return { history, record, address };
}
