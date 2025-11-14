import { type Address } from 'viem';

/**
 * Onchain farm livestock auction utilities
 * Auction creation on blockchain
 */

export interface Auction {
  id: string;
  animalId: string;
  createdBy: Address;
  startingBid: bigint;
  auctionStartDate: bigint;
  auctionEndDate: bigint;
  description: string;
  currentBid?: bigint;
  timestamp: bigint;
}

export function createAuction(
  address: Address,
  animalId: string,
  startingBid: bigint,
  auctionStartDate: bigint,
  auctionEndDate: bigint,
  description: string
): Auction {
  return {
    id: `${Date.now()}-${Math.random()}`,
    animalId,
    createdBy: address,
    startingBid,
    auctionStartDate,
    auctionEndDate,
    description,
    timestamp: BigInt(Date.now()),
  };
}

