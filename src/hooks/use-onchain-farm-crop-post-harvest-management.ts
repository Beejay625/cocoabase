import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createPostHarvestRecord,
  type PostHarvestRecord,
} from '@/lib/onchain-farm-crop-post-harvest-management-utils';

export function useOnchainFarmCropPostHarvestManagement() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [records, setRecords] = useState<PostHarvestRecord[]>([]);

  const createRecord = async (
    contractAddress: Address,
    harvestId: bigint,
    handlingMethod: string,
    storageDuration: bigint,
    qualityMaintained: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    const record = createPostHarvestRecord(
      address,
      harvestId,
      handlingMethod,
      storageDuration,
      qualityMaintained
    );
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'harvestId', type: 'uint256' },
            { name: 'handlingMethod', type: 'string' },
            { name: 'storageDuration', type: 'uint256' },
            { name: 'qualityMaintained', type: 'uint256' }
          ],
          name: 'createRecord',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'createRecord',
      args: [harvestId, handlingMethod, storageDuration, qualityMaintained],
    });
    
    setRecords([...records, record]);
  };

  return { 
    records, 
    createRecord, 
    address 
  };
}

