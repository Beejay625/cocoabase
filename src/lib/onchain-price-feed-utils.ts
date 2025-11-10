import { type Address } from 'viem';

export interface PriceFeed {
  id: bigint;
  asset: string;
  price: bigint;
  decimals: number;
  oracle: Address;
  timestamp: bigint;
  roundId: bigint;
}

export interface PriceUpdate {
  asset: string;
  oldPrice: bigint;
  newPrice: bigint;
  change: bigint;
  changePercent: number;
  timestamp: bigint;
}

export function createPriceFeed(
  asset: string,
  price: bigint,
  decimals: number,
  oracle: Address,
  roundId: bigint
): PriceFeed {
  const now = BigInt(Date.now());
  return {
    id: BigInt(0),
    asset,
    price,
    decimals,
    oracle,
    timestamp: now,
    roundId,
  };
}

export function updatePrice(
  feed: PriceFeed,
  newPrice: bigint,
  newRoundId: bigint
): { feed: PriceFeed; update: PriceUpdate } {
  const change = newPrice > feed.price
    ? newPrice - feed.price
    : feed.price - newPrice;
  const changePercent = feed.price > BigInt(0)
    ? Number((change * BigInt(10000)) / feed.price) / 100
    : 0;

  const update: PriceUpdate = {
    asset: feed.asset,
    oldPrice: feed.price,
    newPrice,
    change,
    changePercent,
    timestamp: BigInt(Date.now()),
  };

  const updatedFeed: PriceFeed = {
    ...feed,
    price: newPrice,
    roundId: newRoundId,
    timestamp: update.timestamp,
  };

  return { feed: updatedFeed, update };
}

export function calculatePriceChange(
  oldPrice: bigint,
  newPrice: bigint
): { change: bigint; changePercent: number } {
  const change = newPrice > oldPrice
    ? newPrice - oldPrice
    : oldPrice - newPrice;
  const changePercent = oldPrice > BigInt(0)
    ? Number((change * BigInt(10000)) / oldPrice) / 100
    : 0;

  return { change, changePercent };
}

export function isPriceStale(
  feed: PriceFeed,
  maxAge: bigint,
  currentTime: bigint
): boolean {
  return currentTime - feed.timestamp > maxAge;
}

export function formatPrice(price: bigint, decimals: number): string {
  const divisor = BigInt(10 ** decimals);
  const whole = price / divisor;
  const fraction = price % divisor;
  return `${whole.toString()}.${fraction.toString().padStart(decimals, '0')}`;
}

