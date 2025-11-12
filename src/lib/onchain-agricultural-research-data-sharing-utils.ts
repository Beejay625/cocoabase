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
