import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createResistanceRecord,
  type ResistanceRecord,
} from '@/lib/onchain-farm-crop-drought-resistance-utils';

export function useOnchainFarmCropDroughtResistance() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [records, setRecords] = useState<ResistanceRecord[]>([]);

  const recordResistance = async (
    contractAddress: Address,
    plantationId: bigint,
    cropType: string,
    resistanceLevel: bigint,
    testDuration: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    const record = createResistanceRecord(
      address,
      plantationId,
      cropType,
      resistanceLevel,
      testDuration
    );
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'plantationId', type: 'uint256' },
            { name: 'cropType', type: 'string' },
            { name: 'resistanceLevel', type: 'uint256' },
            { name: 'testDuration', type: 'uint256' }
          ],
          name: 'recordResistance',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'recordResistance',
      args: [plantationId, cropType, resistanceLevel, testDuration],
    });
    
    setRecords([...records, record]);
  };

  return { 
    records, 
    recordResistance, 
    address 
  };
}

