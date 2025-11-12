import { type Address } from 'viem';

export interface MarketResearch {
  id: bigint;
  researcher: Address;
  commodity: string;
  price: bigint;
  demand: 'low' | 'medium' | 'high';
  timestamp: bigint;
}

export function createMarketResearch(
  researcher: Address,
  commodity: string,
  price: bigint,
  demand: 'low' | 'medium' | 'high'
): MarketResearch {
  return {
    id: BigInt(0),
    researcher,
    commodity,
    price,
    demand,
    timestamp: BigInt(Date.now()),
  };
}

export function getHighDemand(research: MarketResearch[]): MarketResearch[] {
  return research.filter((r) => r.demand === 'high');
}

export function getResearchByCommodity(
  research: MarketResearch[],
  commodity: string
): MarketResearch[] {
  return research.filter((r) => r.commodity === commodity);
}

