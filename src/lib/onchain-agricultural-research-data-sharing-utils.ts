import { type Address } from 'viem';

export interface ResearchData {
  id: bigint;
  researcher: Address;
  dataType: string;
  accessLevel: 'public' | 'private' | 'restricted';
  dataHash: string;
}

export function createResearchData(
  researcher: Address,
  dataType: string,
  accessLevel: 'public' | 'private' | 'restricted',
  dataHash: string
): ResearchData {
  return {
    id: BigInt(0),
    researcher,
    dataType,
    accessLevel,
    dataHash,
  };
}

export function getPublicData(
  data: ResearchData[]
): ResearchData[] {
  return data.filter((d) => d.accessLevel === 'public');
}

export function getDataByType(
  data: ResearchData[],
  dataType: string
): ResearchData[] {
  return data.filter((d) => d.dataType === dataType);
}

export function verifyDataIntegrity(
  data: ResearchData,
  providedHash: string
): boolean {
  return data.dataHash === providedHash;
}
