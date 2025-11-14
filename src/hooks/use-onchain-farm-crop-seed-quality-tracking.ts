import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createSeedQualityRecord,
  type SeedQualityRecord,
} from '@/lib/onchain-farm-crop-seed-quality-tracking-utils';

export function useOnchainFarmCropSeedQualityTracking() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [qualityRecords, setQualityRecords] = useState<SeedQualityRecord[]>([]);

  const recordQuality = async (
    contractAddress: Address,
    seedBatchId: bigint,
    germinationRate: bigint,
    purity: bigint,
    moistureContent: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    const record = createSeedQualityRecord(
      address,
      seedBatchId,
      germinationRate,
      purity,
      moistureContent
    );
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'seedBatchId', type: 'uint256' },
            { name: 'germinationRate', type: 'uint256' },
            { name: 'purity', type: 'uint256' },
            { name: 'moistureContent', type: 'uint256' }
          ],
          name: 'recordSeedQuality',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'recordSeedQuality',
      args: [seedBatchId, germinationRate, purity, moistureContent],
    });
    
    setQualityRecords([...qualityRecords, record]);
  };

  return { 
    qualityRecords, 
    recordQuality, 
    address 
  };
}

