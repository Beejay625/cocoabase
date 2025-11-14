import { type Address } from 'viem';

/**
 * Onchain farm crop harvest contract management utilities
 * Contract creation on blockchain
 */

export interface HarvestContract {
  id: string;
  harvestId: string;
  createdBy: Address;
  buyer: Address;
  seller: Address;
  price: bigint;
  quantity: bigint;
  contractDate: bigint;
  terms: string;
  executed: boolean;
  timestamp: bigint;
}

export function createContract(
  address: Address,
  harvestId: string,
  buyer: Address,
  seller: Address,
  price: bigint,
  quantity: bigint,
  contractDate: bigint,
  terms: string
): HarvestContract {
  return {
    id: `${Date.now()}-${Math.random()}`,
    harvestId,
    createdBy: address,
    buyer,
    seller,
    price,
    quantity,
    contractDate,
    terms,
    executed: false,
    timestamp: BigInt(Date.now()),
  };
}

