import { type Address } from 'viem';

/**
 * Onchain farm renewable energy trading utilities
 * Renewable energy generation and trading
 */

export interface EnergyTrade {
  id: string;
  plantationId: string;
  seller: Address;
  energyAmount: bigint;
  pricePerKwh: bigint;
  totalPrice: bigint;
  energyType: 'solar' | 'wind' | 'biomass';
  status: 'listed' | 'sold' | 'cancelled';
  timestamp: bigint;
}

export function createEnergyTrade(
  address: Address,
  plantationId: string,
  energyAmount: bigint,
  pricePerKwh: bigint
): EnergyTrade {
  return {
    id: `${Date.now()}-${Math.random()}`,
    plantationId,
    seller: address,
    energyAmount,
    pricePerKwh,
    totalPrice: energyAmount * pricePerKwh,
    energyType: 'solar',
    status: 'listed',
    timestamp: BigInt(Date.now()),
  };
}

