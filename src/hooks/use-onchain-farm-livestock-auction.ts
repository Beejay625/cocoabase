import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createAuction,
  type Auction,
} from '@/lib/onchain-farm-livestock-auction-utils';

/**
 * Hook for onchain farm livestock auction
 * Uses blockchain wallet for all web3 transactions
 */
export function useOnchainFarmLivestockAuction() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [auctions, setAuctions] = useState<Auction[]>([]);

  const createAuction = async (
    animalId: string,
    startingBid: bigint,
    auctionStartDate: bigint,
    auctionEndDate: bigint,
    description: string
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    const auction = createAuction(address, animalId, startingBid, auctionStartDate, auctionEndDate, description);
    setAuctions([...auctions, auction]);
  };

  const placeBid = async (
    contractAddress: Address,
    auctionId: string,
    bidAmount: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'placeBid',
      args: [auctionId, bidAmount],
    });
  };

  return { auctions, createAuction, placeBid, address };
}

