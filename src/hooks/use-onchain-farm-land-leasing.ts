import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createLeaseAgreement,
  type LeaseAgreement,
} from '@/lib/onchain-farm-land-leasing-utils';

/**
 * Hook for onchain farm land leasing
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmLandLeasing() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [leaseAgreements, setLeaseAgreements] = useState<LeaseAgreement[]>([]);

  const createLease = async (
    contractAddress: Address,
    tenant: Address,
    landId: bigint,
    leaseStartDate: bigint,
    leaseEndDate: bigint,
    monthlyRent: bigint,
    deposit: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    const lease = createLeaseAgreement(
      address,
      tenant,
      landId,
      leaseStartDate,
      leaseEndDate,
      monthlyRent,
      deposit
    );
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'tenant', type: 'address' },
            { name: 'landId', type: 'uint256' },
            { name: 'leaseStartDate', type: 'uint256' },
            { name: 'leaseEndDate', type: 'uint256' },
            { name: 'monthlyRent', type: 'uint256' }
          ],
          name: 'createLease',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'payable',
          type: 'function'
        }
      ],
      functionName: 'createLease',
      args: [tenant, landId, leaseStartDate, leaseEndDate, monthlyRent],
      value: deposit,
    });
    
    setLeaseAgreements([...leaseAgreements, lease]);
  };

  const terminateLease = async (
    contractAddress: Address,
    leaseId: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [{ name: 'leaseId', type: 'uint256' }],
          name: 'terminateLease',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'terminateLease',
      args: [leaseId],
    });
  };

  return { 
    leaseAgreements, 
    createLease, 
    terminateLease,
    address 
  };
}

