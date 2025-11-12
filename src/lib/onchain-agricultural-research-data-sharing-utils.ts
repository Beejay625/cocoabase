import { type Address } from 'viem';

export interface ResearchData {
  id: bigint;
  owner: Address;
  dataType: string;
  accessLevel: 'public' | 'private' | 'restricted';
  hash: string;
}

export function createResearchData(
  owner: Address,
  dataType: string,
  accessLevel: 'public' | 'private' | 'restricted',
  hash: string
): ResearchData {
  return {
    id: BigInt(0),
    owner,
    dataType,
    accessLevel,
    hash,
  };
}

export function getPublicData(data: ResearchData[]): ResearchData[] {
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
  return data.hash === providedHash;
}
