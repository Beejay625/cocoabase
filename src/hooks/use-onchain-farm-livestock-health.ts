import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createHealthRecord,
  type HealthRecord,
} from '@/lib/onchain-farm-livestock-health-utils';

export function useOnchainFarmLivestockHealth() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [records, setRecords] = useState<HealthRecord[]>([]);

  const createHealthRecordAction = async (
    contractAddress: Address,
    livestockId: bigint,
    healthStatus: string,
    veterinarian: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    const record = createHealthRecord(address, livestockId, healthStatus, veterinarian);
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'livestockId', type: 'uint256' },
            { name: 'healthStatus', type: 'string' },
            { name: 'veterinarian', type: 'string' }
          ],
          name: 'createHealthRecord',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'createHealthRecord',
      args: [livestockId, healthStatus, veterinarian],
    });
    
    setRecords([...records, record]);
  };

  return { records, createHealthRecordAction, address };
}

