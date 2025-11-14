import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createQualityGrade,
  type QualityGrade,
} from '@/lib/onchain-farm-harvest-quality-utils';

/**
 * Hook for onchain farm harvest quality
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmHarvestQuality() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [qualityGrades, setQualityGrades] = useState<QualityGrade[]>([]);

  const gradeHarvest = async (
    contractAddress: Address,
    harvestId: bigint,
    grade: string,
    score: bigint,
    characteristics: string,
    inspector: string,
    isCertified: boolean
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    const qualityGrade = createQualityGrade(address, harvestId, grade, score, characteristics, inspector, isCertified);
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'harvestId', type: 'uint256' },
            { name: 'grade', type: 'string' },
            { name: 'score', type: 'uint256' },
            { name: 'characteristics', type: 'string' },
            { name: 'inspector', type: 'string' },
            { name: 'isCertified', type: 'bool' }
          ],
          name: 'gradeHarvest',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'gradeHarvest',
      args: [harvestId, grade, score, characteristics, inspector, isCertified],
    });
    
    setQualityGrades([...qualityGrades, qualityGrade]);
  };

  const updateGrade = async (
    contractAddress: Address,
    gradeId: bigint,
    score: bigint,
    characteristics: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'gradeId', type: 'uint256' },
            { name: 'score', type: 'uint256' },
            { name: 'characteristics', type: 'string' }
          ],
          name: 'updateGrade',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'updateGrade',
      args: [gradeId, score, characteristics],
    });
  };

  return { 
    qualityGrades, 
    gradeHarvest,
    updateGrade,
    address 
  };
}

