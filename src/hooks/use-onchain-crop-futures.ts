import { useState } from 'react';
import { useAccount } from 'wagmi';
import {
  createCropFuture,
  type CropFuture,
} from '@/lib/onchain-crop-futures-utils';

export function useOnchainCropFutures() {
  const { address } = useAccount();
  const [futures, setFutures] = useState<CropFuture[]>([]);

  const createFuture = async (
    cropType: string,
    quantity: bigint,
    price: bigint,
    deliveryDate: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected');
    const future = createCropFuture(address, cropType, quantity, price, deliveryDate);
    setFutures([...futures, future]);
  };

  return { futures, createFuture, address };
}
