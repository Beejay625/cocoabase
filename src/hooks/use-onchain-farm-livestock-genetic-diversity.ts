import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createDiversityRecord,
  type DiversityRecord,
} from '@/lib/onchain-farm-livestock-genetic-diversity-utils';

export function useOnchainFarmLivestockGeneticDiversity() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [records, setRecords] = useState<DiversityRecord[]>([]);

  const recordDiversity = async (
    contractAddress: Address,
    populationId: bigint,
    diversityIndex: bigint,
    uniqueGenotypes: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    const record = createDiversityRecord(
      address,
      populationId,
      diversityIndex,
      uniqueGenotypes
    );
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'populationId', type: 'uint256' },
            { name: 'diversityIndex', type: 'uint256' },
            { name: 'uniqueGenotypes', type: 'uint256' }
          ],
          name: 'recordDiversity',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'recordDiversity',
      args: [populationId, diversityIndex, uniqueGenotypes],
    });
    
    setRecords([...records, record]);
  };

  return { 
    records, 
    recordDiversity, 
    address 
  };
}

