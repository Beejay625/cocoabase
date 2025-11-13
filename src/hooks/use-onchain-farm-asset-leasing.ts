import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createLease,
  type AssetLease,
} from '@/lib/onchain-farm-asset-leasing-utils';

/**
 * Hook for onchain farm asset leasing
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmAssetLeasing() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [leases, setLeases] = useState<AssetLease[]>([]);

  const createLeaseAgreement = async (
    assetId: string,
    lessee: Address,
    monthlyRent: bigint,
    duration: number
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const lease = createLease(address, assetId, lessee, monthlyRent, duration);
    setLeases([...leases, lease]);
  };

  const executeLease = async (
    contractAddress: Address,
    leaseId: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'executeLease',
      args: [leaseId],
    });
  };

  return { leases, createLeaseAgreement, executeLease, address };
}

