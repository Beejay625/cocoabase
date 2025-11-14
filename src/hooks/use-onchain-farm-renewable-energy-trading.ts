import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createEnergyListing,
  type EnergyListing,
} from '@/lib/onchain-farm-renewable-energy-trading-utils';

export function useOnchainFarmRenewableEnergyTrading() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [listings, setListings] = useState<EnergyListing[]>([]);

  const listEnergy = async (
    contractAddress: Address,
    energyAmount: bigint,
    pricePerUnit: bigint,
    energyType: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    const listing = createEnergyListing(address, energyAmount, pricePerUnit, energyType);
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'energyAmount', type: 'uint256' },
            { name: 'pricePerUnit', type: 'uint256' },
            { name: 'energyType', type: 'string' }
          ],
          name: 'listEnergy',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'listEnergy',
      args: [energyAmount, pricePerUnit, energyType],
    });
    
    setListings([...listings, listing]);
  };

  const purchaseEnergy = async (
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
          name: 'purchaseEnergy',
          outputs: [],
          stateMutability: 'payable',
          type: 'function'
        }
      ],
      functionName: 'purchaseEnergy',
      args: [listingId],
      value,
    });
  };

  return { listings, listEnergy, purchaseEnergy, address };
}
