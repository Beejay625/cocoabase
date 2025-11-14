import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createWeightRecord,
  type WeightRecord,
} from '@/lib/onchain-farm-livestock-weight-utils';

export function useOnchainFarmLivestockWeight() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [records, setRecords] = useState<WeightRecord[]>([]);

  const recordWeight = async (
    contractAddress: Address,
    livestockId: bigint,
    weight: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    const record = createWeightRecord(address, livestockId, weight);
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'livestockId', type: 'uint256' },
            { name: 'weight', type: 'uint256' }
          ],
          name: 'recordWeight',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'recordWeight',
      args: [livestockId, weight],
    });
    
    setRecords([...records, record]);
  };

  return { records, recordWeight, address };
}

