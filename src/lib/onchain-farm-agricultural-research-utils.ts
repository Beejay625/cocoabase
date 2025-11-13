import { type Address } from 'viem';

/**
 * Onchain farm agricultural research utilities
 * Research project creation and findings recording
 */

export interface ResearchProject {
  id: string;
  projectTitle: string;
  researcher: Address;
  researchArea: string;
  startDate: bigint;
  budget: bigint;
  findings?: string;
  timestamp: bigint;
}

export function createResearchProject(
  address: Address,
  projectTitle: string,
  researchArea: string,
  startDate: bigint,
  budget: bigint
): ResearchProject {
  return {
    id: `${Date.now()}-${Math.random()}`,
    projectTitle,
    researcher: address,
    researchArea,
    startDate,
    budget,
    timestamp: BigInt(Date.now()),
  };
}

