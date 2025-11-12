import { type Address } from 'viem';

export interface CommodityPrice {
  id: bigint;
  updater: Address;
  commodity: string;
  price: bigint;
  market: string;
  timestamp: bigint;
}

export function updatePrice(
  updater: Address,
  commodity: string,
  price: bigint,
  market: string
): CommodityPrice {
  return {
    id: BigInt(0),
    updater,
    commodity,
    price,
    market,
    timestamp: BigInt(Date.now()),
  };
}
