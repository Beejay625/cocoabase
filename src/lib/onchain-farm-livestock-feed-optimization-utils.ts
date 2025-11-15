import { type Address } from 'viem';

export interface FeedRation {
  id: string;
  livestockId: bigint;
  livestockType: string;
  proteinContent: bigint;
  carbohydrateContent: bigint;
  fatContent: bigint;
  fiberContent: bigint;
  dailyAmount: bigint;
  owner: Address;
}

export function createFeedRation(
  address: Address,
  livestockId: bigint,
  livestockType: string,
  proteinContent: bigint,
  carbohydrateContent: bigint,
  fatContent: bigint,
  fiberContent: bigint,
  dailyAmount: bigint
): FeedRation {
  return {
    id: `${Date.now()}-${Math.random()}`,
    livestockId,
    livestockType,
    proteinContent,
    carbohydrateContent,
    fatContent,
    fiberContent,
    dailyAmount,
    owner: address,
  };
}


