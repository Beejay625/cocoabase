import { type Address } from 'viem';

export interface GeneticProfile {
  id: string;
  livestockId: bigint;
  breed: string;
  geneticMarkers: string[];
  parent1Id: bigint;
  parent2Id: bigint;
  owner: Address;
}

export function createGeneticProfile(
  address: Address,
  livestockId: bigint,
  breed: string,
  geneticMarkers: string[],
  parent1Id: bigint,
  parent2Id: bigint
): GeneticProfile {
  return {
    id: `${Date.now()}-${Math.random()}`,
    livestockId,
    breed,
    geneticMarkers,
    parent1Id,
    parent2Id,
    owner: address,
  };
}

