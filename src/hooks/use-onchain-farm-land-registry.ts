import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createLandParcel,
  type LandParcel,
} from '@/lib/onchain-farm-land-registry-utils';

export function useOnchainFarmLandRegistry() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [parcels, setParcels] = useState<LandParcel[]>([]);

  const registerLandParcel = async (
    contractAddress: Address,
    areaHectares: bigint,
    location: string,
    coordinates: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    const parcel = createLandParcel(address, areaHectares, location, coordinates);
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'areaHectares', type: 'uint256' },
            { name: 'location', type: 'string' },
            { name: 'coordinates', type: 'string' }
          ],
          name: 'registerLandParcel',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'registerLandParcel',
      args: [areaHectares, location, coordinates],
    });
    
    setParcels([...parcels, parcel]);
  };

  const transferLandParcel = async (
    contractAddress: Address,
    parcelId: bigint,
    newOwner: Address
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'parcelId', type: 'uint256' },
            { name: 'newOwner', type: 'address' }
          ],
          name: 'transferLandParcel',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'transferLandParcel',
      args: [parcelId, newOwner],
    });
  };

  return { parcels, registerLandParcel, transferLandParcel, address };
}
