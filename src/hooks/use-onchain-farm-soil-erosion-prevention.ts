import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createErosionAssessment,
  type ErosionAssessment,
} from '@/lib/onchain-farm-soil-erosion-prevention-utils';

export function useOnchainFarmSoilErosionPrevention() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [erosionAssessments, setErosionAssessments] = useState<ErosionAssessment[]>([]);

  const assessErosion = async (
    contractAddress: Address,
    fieldId: bigint,
    erosionRate: bigint,
    soilLoss: bigint,
    slopeAngle: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    const assessment = createErosionAssessment(
      address,
      fieldId,
      erosionRate,
      soilLoss,
      slopeAngle
    );
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'fieldId', type: 'uint256' },
            { name: 'erosionRate', type: 'uint256' },
            { name: 'soilLoss', type: 'uint256' },
            { name: 'slopeAngle', type: 'uint256' }
          ],
          name: 'assessErosion',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'assessErosion',
      args: [fieldId, erosionRate, soilLoss, slopeAngle],
    });
    
    setErosionAssessments([...erosionAssessments, assessment]);
  };

  const implementPreventionMeasure = async (
    contractAddress: Address,
    assessmentId: bigint,
    measureType: string,
    expectedReduction: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'assessmentId', type: 'uint256' },
            { name: 'measureType', type: 'string' },
            { name: 'expectedReduction', type: 'uint256' }
          ],
          name: 'implementPreventionMeasure',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'implementPreventionMeasure',
      args: [assessmentId, measureType, expectedReduction],
    });
  };

  return { 
    erosionAssessments, 
    assessErosion, 
    implementPreventionMeasure, 
    address 
  };
}


