import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createEfficiencyRecord,
  type EfficiencyRecord,
} from '@/lib/onchain-farm-crop-water-efficiency-utils';

export function useOnchainFarmCropWaterEfficiency() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [records, setRecords] = useState<EfficiencyRecord[]>([]);

  const recordEfficiency = async (
    contractAddress: Address,
    plantationId: bigint,
    waterUsed: bigint,
    yieldProduced: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    const record = createEfficiencyRecord(
      address,
      plantationId,
      waterUsed,
      yieldProduced
    );
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'plantationId', type: 'uint256' },
            { name: 'waterUsed', type: 'uint256' },
            { name: 'yieldProduced', type: 'uint256' }
          ],
          name: 'recordEfficiency',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'recordEfficiency',
      args: [plantationId, waterUsed, yieldProduced],
    });
    
    setRecords([...records, record]);
  };

  return { 
    records, 
    recordEfficiency, 
    address 
  };
}


