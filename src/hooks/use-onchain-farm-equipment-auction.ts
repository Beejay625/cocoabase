import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createAuction,
  createBid,
  type Auction,
  type Bid,
} from '@/lib/onchain-farm-equipment-auction-utils';

/**
 * Hook for onchain farm equipment auction
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmEquipmentAuction() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [bids, setBids] = useState<Bid[]>([]);

  const createAuction = async (
    contractAddress: Address,
    equipmentName: string,
    equipmentDescription: string,
    startingPrice: bigint,
    reservePrice: bigint,
    endTime: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    const auction = createAuction(address, equipmentName, equipmentDescription, startingPrice, reservePrice, endTime);
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'equipmentName', type: 'string' },
            { name: 'equipmentDescription', type: 'string' },
            { name: 'startingPrice', type: 'uint256' },
            { name: 'reservePrice', type: 'uint256' },
            { name: 'endTime', type: 'uint256' }
          ],
          name: 'createAuction',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'createAuction',
      args: [equipmentName, equipmentDescription, startingPrice, reservePrice, endTime],
    });
    
    setAuctions([...auctions, auction]);
  };

  const placeBid = async (
    contractAddress: Address,
    auctionId: bigint,
    value: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    const bid = createBid(address, value);
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [{ name: 'auctionId', type: 'uint256' }],
          name: 'placeBid',
          outputs: [],
          stateMutability: 'payable',
          type: 'function'
        }
      ],
      functionName: 'placeBid',
      args: [auctionId],
      value: value,
    });
    
    setBids([...bids, bid]);
  };

  const completeAuction = async (
    contractAddress: Address,
    auctionId: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [{ name: 'auctionId', type: 'uint256' }],
          name: 'completeAuction',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'completeAuction',
      args: [auctionId],
    });
  };

  return { 
    auctions,
    bids,
    createAuction, 
    placeBid,
    completeAuction,
    address 
  };
}

