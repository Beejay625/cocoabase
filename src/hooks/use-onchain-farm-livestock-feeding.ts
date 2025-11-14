import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createFeedingRecord,
  type FeedingRecord,
} from '@/lib/onchain-farm-livestock-feeding-utils';

export function useOnchainFarmLivestockFeeding() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [records, setRecords] = useState<FeedingRecord[]>([]);

  const recordFeeding = async (
    contractAddress: Address,
    livestockId: bigint,
    feedType: string,
    quantity: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    const record = createFeedingRecord(address, livestockId, feedType, quantity);
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'livestockId', type: 'uint256' },
            { name: 'feedType', type: 'string' },
            { name: 'quantity', type: 'uint256' }
          ],
          name: 'recordFeeding',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'recordFeeding',
      args: [livestockId, feedType, quantity],
    });
    
    setRecords([...records, record]);
  };

  return { records, recordFeeding, address };
}
