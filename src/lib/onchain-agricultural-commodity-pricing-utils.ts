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

export function getLatestPrice(
  prices: CommodityPrice[],
  commodity: string
): CommodityPrice | null {
  const commodityPrices = prices.filter((p) => p.commodity === commodity);
  if (commodityPrices.length === 0) return null;
  return commodityPrices.sort((a, b) => Number(b.timestamp - a.timestamp))[0];
}

export function getPricesByMarket(
  prices: CommodityPrice[],
  market: string
): CommodityPrice[] {
  return prices.filter((p) => p.market === market);
}

export function getPriceHistory(
  prices: CommodityPrice[],
  commodity: string
): CommodityPrice[] {
  return prices
    .filter((p) => p.commodity === commodity)
    .sort((a, b) => Number(b.timestamp - a.timestamp));
}
