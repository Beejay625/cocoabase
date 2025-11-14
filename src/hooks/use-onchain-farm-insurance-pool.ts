import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createClaim,
  type Claim,
} from '@/lib/onchain-farm-insurance-pool-utils';

export function useOnchainFarmInsurancePool() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [claims, setClaims] = useState<Claim[]>([]);

  const joinPool = async (
    contractAddress: Address,
    contribution: bigint,
    value: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [{ name: 'contribution', type: 'uint256' }],
          name: 'joinPool',
          outputs: [],
          stateMutability: 'payable',
          type: 'function'
        }
      ],
      functionName: 'joinPool',
      args: [contribution],
      value,
    });
  };

  const fileClaim = async (
    contractAddress: Address,
    claimAmount: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    const claim = createClaim(address, claimAmount);
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [{ name: 'claimAmount', type: 'uint256' }],
          name: 'fileClaim',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'fileClaim',
      args: [claimAmount],
    });
    
    setClaims([...claims, claim]);
  };

  return { claims, joinPool, fileClaim, address };
}
