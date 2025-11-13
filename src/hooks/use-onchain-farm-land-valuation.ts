import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createValuation,
  type Valuation,
} from '@/lib/onchain-farm-land-valuation-utils';

/**
 * Hook for onchain farm land valuation
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmLandValuation() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [valuations, setValuations] = useState<Valuation[]>([]);

  const createValuation = async (
    contractAddress: Address,
    landOwner: Address,
    landId: bigint,
    value: bigint,
    valuationMethod: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'landOwner', type: 'address' },
            { name: 'landId', type: 'uint256' },
            { name: 'value', type: 'uint256' },
            { name: 'valuationMethod', type: 'string' }
          ],
          name: 'createValuation',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'createValuation',
      args: [landOwner, landId, value, valuationMethod],
    });
  };

  return { 
    valuations, 
    createValuation, 
    address 
  };
}

