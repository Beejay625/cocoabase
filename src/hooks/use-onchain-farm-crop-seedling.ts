import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createSeedlingRecord,
  type SeedlingRecord,
} from '@/lib/onchain-farm-crop-seedling-utils';

export function useOnchainFarmCropSeedling() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [records, setRecords] = useState<SeedlingRecord[]>([]);

  const recordSeedling = async (
    contractAddress: Address,
    plantationId: bigint,
    seedlingsPlanted: bigint,
    seedlingType: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    const record = createSeedlingRecord(address, plantationId, seedlingsPlanted, seedlingType);
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'plantationId', type: 'uint256' },
            { name: 'seedlingsPlanted', type: 'uint256' },
            { name: 'seedlingType', type: 'string' }
          ],
          name: 'recordSeedling',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'recordSeedling',
      args: [plantationId, seedlingsPlanted, seedlingType],
    });
    
    setRecords([...records, record]);
  };

  return { records, recordSeedling, address };
}
