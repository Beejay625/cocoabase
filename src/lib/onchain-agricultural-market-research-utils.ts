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