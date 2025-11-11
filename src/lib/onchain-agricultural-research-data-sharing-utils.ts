import { type Address } from 'viem';

export interface ResearchData {
  id: bigint;
  owner: Address;
  researchType: string;
  dataHash: string;
  sharedDate: bigint;
  accessLevel: 'public' | 'private' | 'restricted';
  txHash: string;
}

export function shareResearchData(
  owner: Address,
  researchType: string,
  dataHash: string,
  accessLevel: ResearchData['accessLevel']
): ResearchData {
  return {
    id: BigInt(Date.now()),
    owner,
    researchType,
    dataHash,
    sharedDate: BigInt(Date.now()),
    accessLevel,
    txHash: '',
  };
}

export function getPublicResearchData(
  data: ResearchData[]
): ResearchData[] {
  return data.filter((d) => d.accessLevel === 'public');
}

export function getResearchByType(
  data: ResearchData[],
  researchType: string
): ResearchData[] {
  return data.filter((d) => d.researchType === researchType);
}

export function verifyDataIntegrity(
  data: ResearchData,
  dataHash: string
): boolean {
  return data.dataHash === dataHash;
}
