import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createListing,
  createOrder,
  type Listing,
  type Order,
} from '@/lib/onchain-farm-direct-marketplace-utils';

/**
 * Hook for onchain farm direct marketplace
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmDirectMarketplace() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [listings, setListings] = useState<Listing[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  const createListing = async (
    contractAddress: Address,
    productName: string,
    productDescription: string,
    quantity: bigint,
    pricePerUnit: bigint,
    category: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    const listing = createListing(address, productName, productDescription, quantity, pricePerUnit, category);
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'productName', type: 'string' },
            { name: 'productDescription', type: 'string' },
            { name: 'quantity', type: 'uint256' },
            { name: 'pricePerUnit', type: 'uint256' },
            { name: 'category', type: 'string' }
          ],
          name: 'createListing',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'createListing',
      args: [productName, productDescription, quantity, pricePerUnit, category],
    });
    
    setListings([...listings, listing]);
  };

  const placeOrder = async (
    contractAddress: Address,
    listingId: bigint,
    quantity: bigint,
    value: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    const order = createOrder(address, address, listingId, quantity, value);
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'listingId', type: 'uint256' },
            { name: 'quantity', type: 'uint256' }
          ],
          name: 'placeOrder',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'payable',
          type: 'function'
        }
      ],
      functionName: 'placeOrder',
      args: [listingId, quantity],
      value: value,
    });
    
    setOrders([...orders, order]);
  };

  const completeOrder = async (
    contractAddress: Address,
    orderId: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [{ name: 'orderId', type: 'uint256' }],
          name: 'completeOrder',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'completeOrder',
      args: [orderId],
    });
  };

  const cancelListing = async (
    contractAddress: Address,
    listingId: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [{ name: 'listingId', type: 'uint256' }],
          name: 'cancelListing',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'cancelListing',
      args: [listingId],
    });
  };

  return { 
    listings,
    orders,
    createListing, 
    placeOrder,
    completeOrder,
    cancelListing,
    address 
  };
}

