import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createResearchProject,
  type ResearchProject,
} from '@/lib/onchain-farm-agricultural-research-utils';

/**
 * Hook for onchain farm agricultural research
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmAgriculturalResearch() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [projects, setProjects] = useState<ResearchProject[]>([]);

  const createProject = async (
    projectTitle: string,
    researchArea: string,
    startDate: bigint,
    budget: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const project = createResearchProject(address, projectTitle, researchArea, startDate, budget);
    setProjects([...projects, project]);
  };

  const recordFindings = async (
    contractAddress: Address,
    projectId: string,
    findings: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'recordFindings',
      args: [projectId, findings],
    });
  };

  return { projects, createProject, recordFindings, address };
}

