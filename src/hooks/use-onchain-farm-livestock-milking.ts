import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createMilkingRecord,
  type MilkingRecord,
} from '@/lib/onchain-farm-livestock-milking-utils';

export function useOnchainFarmLivestockMilking() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [records, setRecords] = useState<MilkingRecord[]>([]);

  const recordMilking = async (
    contractAddress: Address,
    livestockId: bigint,
    milkQuantity: bigint,
    quality: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    const record = createMilkingRecord(address, livestockId, milkQuantity, quality);
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'livestockId', type: 'uint256' },
            { name: 'milkQuantity', type: 'uint256' },
            { name: 'quality', type: 'string' }
          ],
          name: 'recordMilking',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'recordMilking',
      args: [livestockId, milkQuantity, quality],
    });
    
    setRecords([...records, record]);
  };

  return { records, recordMilking, address };
}
