import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createGeneticProfile,
  type GeneticProfile,
} from '@/lib/onchain-farm-livestock-genetics-tracking-utils';

/**
 * Hook for onchain livestock genetics tracking
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmLivestockGeneticsTracking() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [geneticProfiles, setGeneticProfiles] = useState<GeneticProfile[]>([]);

  const createProfile = async (
    contractAddress: Address,
    livestockId: bigint,
    breed: string,
    geneticMarkers: string[],
    parent1Id: bigint,
    parent2Id: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    const profile = createGeneticProfile(
      address,
      livestockId,
      breed,
      geneticMarkers,
      parent1Id,
      parent2Id
    );
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'livestockId', type: 'uint256' },
            { name: 'breed', type: 'string' },
            { name: 'geneticMarkers', type: 'string[]' },
            { name: 'parent1Id', type: 'uint256' },
            { name: 'parent2Id', type: 'uint256' }
          ],
          name: 'createGeneticProfile',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'createGeneticProfile',
      args: [livestockId, breed, geneticMarkers, parent1Id, parent2Id],
    });
    
    setGeneticProfiles([...geneticProfiles, profile]);
  };

  const recordBreeding = async (
    contractAddress: Address,
    parent1Id: bigint,
    parent2Id: bigint,
    offspringId: bigint,
    successful: boolean
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'parent1Id', type: 'uint256' },
            { name: 'parent2Id', type: 'uint256' },
            { name: 'offspringId', type: 'uint256' },
            { name: 'successful', type: 'bool' }
          ],
          name: 'recordBreeding',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'recordBreeding',
      args: [parent1Id, parent2Id, offspringId, successful],
    });
  };

  return { 
    geneticProfiles, 
    createProfile, 
    recordBreeding, 
    address 
  };
}


