import { type Address } from 'viem';

export interface MarketAccess {
  id: bigint;
  farmer: Address;
  market: string;
  accessLevel: 'full' | 'limited' | 'restricted';
  timestamp: bigint;
}

export function createMarketAccess(
  farmer: Address,
  market: string,
  accessLevel: 'full' | 'limited' | 'restricted'
): MarketAccess {
  return {
    id: BigInt(Date.now()),
    farmer,
    market,
    accessLevel,
    timestamp: BigInt(Date.now()),
  };
}

export function getFullAccess(
  accesses: MarketAccess[]
): MarketAccess[] {
  return accesses.filter((a) => a.accessLevel === 'full');
}

export function getAccessByMarket(
  accesses: MarketAccess[],
  market: string
): MarketAccess[] {
  return accesses.filter((a) => a.market === market);
}
