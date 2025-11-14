import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createWeedingRecord,
  type WeedingRecord,
} from '@/lib/onchain-farm-crop-weeding-utils';

export function useOnchainFarmCropWeeding() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [records, setRecords] = useState<WeedingRecord[]>([]);

  const recordWeeding = async (
    contractAddress: Address,
    plantationId: bigint,
    areaWeeded: bigint,
    method: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    const record = createWeedingRecord(address, plantationId, areaWeeded, method);
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'plantationId', type: 'uint256' },
            { name: 'areaWeeded', type: 'uint256' },
            { name: 'method', type: 'string' }
          ],
          name: 'recordWeeding',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'recordWeeding',
      args: [plantationId, areaWeeded, method],
    });
    
    setRecords([...records, record]);
  };

  return { records, recordWeeding, address };
}

