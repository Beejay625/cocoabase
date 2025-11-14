import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createSeedListing,
  type SeedListing,
} from '@/lib/onchain-farm-seed-exchange-utils';

export function useOnchainFarmSeedExchange() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [listings, setListings] = useState<SeedListing[]>([]);

  const listSeeds = async (
    contractAddress: Address,
    seedType: string,
    quantity: bigint,
    pricePerUnit: bigint,
    quality: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    const listing = createSeedListing(address, seedType, quantity, pricePerUnit, quality);
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'seedType', type: 'string' },
            { name: 'quantity', type: 'uint256' },
            { name: 'pricePerUnit', type: 'uint256' },
            { name: 'quality', type: 'string' }
          ],
          name: 'listSeeds',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'listSeeds',
      args: [seedType, quantity, pricePerUnit, quality],
    });
    
    setListings([...listings, listing]);
  };

  const purchaseSeeds = async (
    contractAddress: Address,
    listingId: bigint,
    value: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [{ name: 'listingId', type: 'uint256' }],
          name: 'purchaseSeeds',
          outputs: [],
          stateMutability: 'payable',
          type: 'function'
        }
      ],
      functionName: 'purchaseSeeds',
      args: [listingId],
      value,
    });
  };

  return { listings, listSeeds, purchaseSeeds, address };
}
