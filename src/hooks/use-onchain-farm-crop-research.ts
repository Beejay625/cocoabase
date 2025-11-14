import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createResearchProject as createResearchProjectData,
  createResearchData as createResearchDataItem,
  type ResearchProject,
  type ResearchData,
} from '@/lib/onchain-farm-crop-research-utils';

/**
 * Hook for onchain farm crop research
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmCropResearch() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [researchProjects, setResearchProjects] = useState<ResearchProject[]>([]);
  const [researchData, setResearchData] = useState<ResearchData[]>([]);

  const createResearchProject = async (
    contractAddress: Address,
    title: string,
    description: string,
    endDate: bigint,
    budget: bigint,
    category: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    const project = createResearchProjectData(address, title, description, endDate, budget, category);
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'title', type: 'string' },
            { name: 'description', type: 'string' },
            { name: 'endDate', type: 'uint256' },
            { name: 'budget', type: 'uint256' },
            { name: 'category', type: 'string' }
          ],
          name: 'createResearchProject',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'createResearchProject',
      args: [title, description, endDate, budget, category],
    });
    
    setResearchProjects([...researchProjects, project]);
  };

  const addResearchData = async (
    contractAddress: Address,
    projectId: bigint,
    dataType: string,
    dataValue: string,
    isPublic: boolean
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    const data = createResearchDataItem(address, projectId, dataType, dataValue, isPublic);
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'projectId', type: 'uint256' },
            { name: 'dataType', type: 'string' },
            { name: 'dataValue', type: 'string' },
            { name: 'isPublic', type: 'bool' }
          ],
          name: 'addResearchData',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'addResearchData',
      args: [projectId, dataType, dataValue, isPublic],
    });
    
    setResearchData([...researchData, data]);
  };

  const completeResearchProject = async (
    contractAddress: Address,
    projectId: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [{ name: 'projectId', type: 'uint256' }],
          name: 'completeResearchProject',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'completeResearchProject',
      args: [projectId],
    });
  };

  return { 
    researchProjects,
    researchData,
    createResearchProject, 
    addResearchData,
    completeResearchProject,
    address 
  };
}

