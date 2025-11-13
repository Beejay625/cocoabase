import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createQualityGrade,
  type QualityGrade,
} from '@/lib/onchain-farm-harvest-quality-grading-utils';

/**
 * Hook for onchain farm harvest quality grading
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmHarvestQualityGrading() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [grades, setGrades] = useState<QualityGrade[]>([]);

  const gradeHarvest = async (
    harvestId: string,
    grade: string,
    qualityScore: number,
    inspectorNotes: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const qualityGrade = createQualityGrade(address, harvestId, grade, qualityScore, inspectorNotes);
    setGrades([...grades, qualityGrade]);
  };

  const verifyGrade = async (
    contractAddress: Address,
    gradeId: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'verifyGrade',
      args: [gradeId],
    });
  };

  return { grades, gradeHarvest, verifyGrade, address };
}

