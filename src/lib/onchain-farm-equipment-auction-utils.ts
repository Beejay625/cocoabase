import { type Address } from 'viem';

/**
 * Onchain farm equipment auction utilities
 * Equipment auction system
 */

export interface Auction {
  id: string;
  auctionId: bigint;
  seller: Address;
  equipmentName: string;
  equipmentDescription: string;
  startingPrice: bigint;
  reservePrice: bigint;
  startTime: bigint;
  endTime: bigint;
  highestBidder: Address;
  highestBid: bigint;
  isActive: boolean;
  isCompleted: boolean;
}

export interface Bid {
  id: string;
  bidder: Address;
  amount: bigint;
  timestamp: bigint;
}

export function createAuction(
  address: Address,
  equipmentName: string,
  equipmentDescription: string,
  startingPrice: bigint,
  reservePrice: bigint,
  endTime: bigint
): Auction {
  return {
    id: `${Date.now()}-${Math.random()}`,
    auctionId: BigInt(0),
    seller: address,
    equipmentName,
    equipmentDescription,
    startingPrice,
    reservePrice,
    startTime: BigInt(Date.now()),
    endTime,
    highestBidder: address,
    highestBid: BigInt(0),
    isActive: true,
    isCompleted: false,
  };
}

export function createBid(
  address: Address,
  amount: bigint
): Bid {
  return {
    id: `${Date.now()}-${Math.random()}`,
    bidder: address,
    amount,
    timestamp: BigInt(Date.now()),
  };
}

