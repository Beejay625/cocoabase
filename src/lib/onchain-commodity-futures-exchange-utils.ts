import { type Address } from 'viem';

/**
 * Onchain Commodity Futures Exchange utilities
 * Trade commodity futures onchain
 */

export interface FuturesContract {
  id: bigint;
  commodity: string;
  quantity: bigint;
  price: bigint;
  deliveryDate: bigint;
  seller: Address;
  buyer?: Address;
  status: 'open' | 'filled' | 'expired' | 'delivered';
  createdAt: bigint;
}

export function createFuturesContract(
  commodity: string,
  quantity: bigint,
  price: bigint,
  deliveryDate: bigint,
  seller: Address
): FuturesContract {
  const now = BigInt(Date.now());
  return {
    id: BigInt(0),
    commodity,
    quantity,
    price,
    deliveryDate,
    seller,
    status: 'open',
    createdAt: now,
  };
}

export function fillFuturesContract(
  contract: FuturesContract,
  buyer: Address
): FuturesContract | null {
  if (contract.status !== 'open') return null;
  if (BigInt(Date.now()) > contract.deliveryDate) return null;

  return {
    ...contract,
    buyer,
    status: 'filled',
  };
}

export function calculateFuturesValue(
  quantity: bigint,
  price: bigint
): bigint {
  return quantity * price;
}

export function isContractExpired(
  contract: FuturesContract,
  currentTime: bigint
): boolean {
  return currentTime > contract.deliveryDate && contract.status === 'open';
}

export function markContractAsDelivered(
  contract: FuturesContract
): FuturesContract {
  if (contract.status !== 'filled') return contract;
  return {
    ...contract,
    status: 'delivered',
  };
}

