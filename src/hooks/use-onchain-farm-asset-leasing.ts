import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createLease,
  type Lease,
} from '@/lib/onchain-farm-asset-leasing-utils';

export function useOnchainFarmAssetLeasing() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [leases, setLeases] = useState<Lease[]>([]);

  const createLeaseAction = async (
    contractAddress: Address,
    assetId: bigint,
    lessee: Address,
    monthlyRent: bigint,
    duration: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    const lease = createLease(address, assetId, lessee, monthlyRent, duration);
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'assetId', type: 'uint256' },
            { name: 'lessee', type: 'address' },
            { name: 'monthlyRent', type: 'uint256' },
            { name: 'duration', type: 'uint256' }
          ],
          name: 'createLease',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'createLease',
      args: [assetId, lessee, monthlyRent, duration],
    });
    
    setLeases([...leases, lease]);
  };

  const payRent = async (
    contractAddress: Address,
    leaseId: bigint,
    value: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [{ name: 'leaseId', type: 'uint256' }],
          name: 'payRent',
          outputs: [],
          stateMutability: 'payable',
          type: 'function'
        }
      ],
      functionName: 'payRent',
      args: [leaseId],
      value,
    });
  };

  return { leases, createLeaseAction, payRent, address };
}
