import { type Address } from 'viem';

export interface MarketResearch {
  id: bigint;
  researcher: Address;
  commodity: string;
  findings: string;
  confidence: number;
  timestamp: bigint;
}

export function createMarketResearch(
  researcher: Address,
  commodity: string,
  findings: string,
  confidence: number
): MarketResearch {
  return {
    id: BigInt(Date.now()),
    researcher,
    commodity,
    findings,
    confidence,
    timestamp: BigInt(Date.now()),
  };
}

export function getResearchByCommodity(
  research: MarketResearch[],
  commodity: string
): MarketResearch[] {
  return research.filter((r) => r.commodity === commodity);
}

export function getHighConfidenceResearch(
  research: MarketResearch[],
  threshold: number
): MarketResearch[] {
  return research.filter((r) => r.confidence >= threshold);
}