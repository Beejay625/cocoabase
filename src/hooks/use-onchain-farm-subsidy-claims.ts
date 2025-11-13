import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';

/**
 * Hook for onchain farm subsidy claims
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmSubsidyClaims() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [claims, setClaims] = useState<any[]>([]);

  const submitClaim = async (
    contractAddress: Address,
    amount: bigint,
    subsidyType: string,
    reason: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'amount', type: 'uint256' },
            { name: 'subsidyType', type: 'string' },
            { name: 'reason', type: 'string' }
          ],
          name: 'submitClaim',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'submitClaim',
      args: [amount, subsidyType, reason],
    });
  };

  return { 
    claims, 
    submitClaim, 
    address 
  };
}
