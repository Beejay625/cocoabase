import { type Address } from 'viem';

export interface PriceStabilizer {
  id: bigint;
  token: Address;
  targetPrice: bigint;
  currentPrice: bigint;
  reserve: bigint;
  algorithm: 'peg' | 'band' | 'smoothing';
}

export function createPriceStabilizer(
  token: Address,
  targetPrice: bigint,
  algorithm: 'peg' | 'band' | 'smoothing'
): PriceStabilizer {
  return {
    id: BigInt(0),
    token,
    targetPrice,
    currentPrice: targetPrice,
    reserve: BigInt(0),
    algorithm,
  };
}

export function stabilizePrice(
  stabilizer: PriceStabilizer,
  newPrice: bigint
): { stabilizer: PriceStabilizer; action: 'buy' | 'sell' | 'hold'; amount: bigint } {
  const deviation = newPrice > stabilizer.targetPrice
    ? newPrice - stabilizer.targetPrice
    : stabilizer.targetPrice - newPrice;
  const threshold = stabilizer.targetPrice / BigInt(100);
  
  if (deviation < threshold) {
    return { stabilizer, action: 'hold', amount: BigInt(0) };
  }
  
  const buyAmount = newPrice < stabilizer.targetPrice
    ? (stabilizer.targetPrice - newPrice) * BigInt(1000)
    : BigInt(0);
  const sellAmount = newPrice > stabilizer.targetPrice
    ? (newPrice - stabilizer.targetPrice) * BigInt(1000)
    : BigInt(0);
  
  return {
    stabilizer: {
      ...stabilizer,
      currentPrice: newPrice,
    },
    action: buyAmount > BigInt(0) ? 'buy' : 'sell',
    amount: buyAmount > BigInt(0) ? buyAmount : sellAmount,
  };
}

export function calculatePriceDeviation(
  stabilizer: PriceStabilizer
): number {
  if (stabilizer.targetPrice === BigInt(0)) return 0;
  const diff = stabilizer.currentPrice > stabilizer.targetPrice
    ? stabilizer.currentPrice - stabilizer.targetPrice
    : stabilizer.targetPrice - stabilizer.currentPrice;
  return Number((diff * BigInt(10000)) / stabilizer.targetPrice) / 100;
}
