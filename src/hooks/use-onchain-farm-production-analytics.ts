import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';

/**
 * Hook for onchain farm production analytics
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmProductionAnalytics() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [productionData, setProductionData] = useState<any[]>([]);

  const recordProduction = async (
    contractAddress: Address,
    yield_: bigint,
    area: bigint,
    cropType: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'yield_', type: 'uint256' },
            { name: 'area', type: 'uint256' },
            { name: 'cropType', type: 'string' }
          ],
          name: 'recordProduction',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'recordProduction',
      args: [yield_, area, cropType],
    });
  };

  return { 
    productionData, 
    recordProduction, 
    address 
  };
}
