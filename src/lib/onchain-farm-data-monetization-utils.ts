import { type Address } from 'viem';

/**
 * Onchain farm data monetization utilities
 * Farm data listing and access management
 */

export interface DataListing {
  id: string;
  dataType: string;
  dataHash: string;
  owner: Address;
  price: bigint;
  accessDuration: number;
  status: 'listed' | 'sold' | 'cancelled';
  timestamp: bigint;
}

export function createDataListing(
  address: Address,
  dataType: string,
  dataHash: string,
  price: bigint,
  accessDuration: number
): DataListing {
  return {
    id: `${Date.now()}-${Math.random()}`,
    dataType,
    dataHash,
    owner: address,
    price,
    accessDuration,
    status: 'listed',
    timestamp: BigInt(Date.now()),
  };
}

