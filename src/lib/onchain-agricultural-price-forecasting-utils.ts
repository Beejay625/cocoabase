import { type Address } from 'viem';

export interface PriceForecast {
  id: bigint;
  forecaster: Address;
  commodity: string;
  predictedPrice: bigint;
  confidence: number;
  timestamp: bigint;
}

export function createPriceForecast(
  forecaster: Address,
  commodity: string,
  predictedPrice: bigint,
  confidence: number
): PriceForecast {
  return {
    id: BigInt(Date.now()),
    forecaster,
    commodity,
    predictedPrice,
    confidence,
    timestamp: BigInt(Date.now()),
  };
}
