import { type Address } from 'viem';

export interface Livestock {
  id: bigint;
  owner: Address;
  animalType: string;
  tagNumber: string;
  birthDate: bigint;
  status: 'healthy' | 'sick' | 'sold' | 'deceased';
  txHash: string;
}

export function registerLivestock(
  owner: Address,
  animalType: string,
  tagNumber: string,
  birthDate: bigint
): Livestock {
  return {
    id: BigInt(Date.now()),
    owner,
    animalType,
    tagNumber,
    birthDate,
    status: 'healthy',
    txHash: '',
  };
}
