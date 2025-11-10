import { type Address } from 'viem';

export interface PriceStabilizer {
  id: bigint;
  token: Address;
  targetPrice: bigint;
  currentPrice: bigint;
  stabilityRange: number;
  reserve: bigint;
}

export function createPriceStabilizer(
  token: Address,
  targetPrice: bigint,
  stabilityRange: number,
  reserve: bigint
): PriceStabilizer {
  return {
    id: BigInt(0),
    token,
    targetPrice,
    currentPrice: targetPrice,
    stabilityRange,
    reserve,
  };
}

export function stabilizePrice(
  stabilizer: PriceStabilizer,
  newPrice: bigint
): PriceStabilizer {
  const deviation = calculatePriceDeviation(stabilizer.targetPrice, newPrice);
  if (deviation <= stabilizer.stabilityRange) {
    return { ...stabilizer, currentPrice: newPrice };
  }
  const adjustment = (stabilizer.targetPrice - newPrice) / BigInt(2);
  const newReserve = stabilizer.reserve + adjustment;
  return {
    ...stabilizer,
    currentPrice: stabilizer.targetPrice,
    reserve: newReserve > BigInt(0) ? newReserve : BigInt(0),
  };
}

export function calculatePriceDeviation(
  target: bigint,
  current: bigint
): number {
  if (target === BigInt(0)) return 0;
  const diff = target > current ? target - current : current - target;
  return Number((diff * BigInt(10000)) / target) / 100;
}

export function isPriceStable(
  stabilizer: PriceStabilizer
): boolean {
  const deviation = calculatePriceDeviation(stabilizer.targetPrice, stabilizer.currentPrice);
  return deviation <= stabilizer.stabilityRange;
}
