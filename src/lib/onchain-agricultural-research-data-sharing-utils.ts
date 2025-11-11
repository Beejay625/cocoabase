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
