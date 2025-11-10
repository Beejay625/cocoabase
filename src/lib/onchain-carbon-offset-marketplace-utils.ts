import { type Address } from 'viem';

/**
 * Onchain Carbon Offset Marketplace utilities
 * Trade carbon credits onchain with Reown wallet integration
 */

export interface CarbonOffset {
  id: bigint;
  seller: Address;
  amount: bigint;
  price: bigint;
  certification: string;
  status: 'listed' | 'sold' | 'cancelled';
  createdAt: bigint;
  buyer?: Address;
}

export function createCarbonOffsetListing(
  seller: Address,
  amount: bigint,
  price: bigint,
  certification: string
): CarbonOffset {
  const now = BigInt(Date.now());
  return {
    id: BigInt(0),
    seller,
    amount,
    price,
    certification,
    status: 'listed',
    createdAt: now,
  };
}

export function purchaseCarbonOffset(
  offset: CarbonOffset,
  buyer: Address,
  purchaseAmount: bigint
): CarbonOffset | null {
  if (offset.status !== 'listed') return null;
  if (purchaseAmount > offset.amount) return null;

  return {
    ...offset,
    amount: offset.amount - purchaseAmount,
    buyer,
    status: purchaseAmount === offset.amount ? 'sold' : 'listed',
  };
}

export function calculateCarbonOffsetValue(
  amount: bigint,
  pricePerTon: bigint
): bigint {
  return (amount * pricePerTon) / BigInt(1000000);
}

export function cancelCarbonOffsetListing(
  offset: CarbonOffset,
  canceller: Address
): CarbonOffset | null {
  if (offset.status !== 'listed') return null;
  if (offset.seller !== canceller) return null;

  return {
    ...offset,
    status: 'cancelled',
  };
}

export function verifyCarbonCertification(certification: string): boolean {
  return certification.length > 0 && certification.startsWith('CARBON-');
}

