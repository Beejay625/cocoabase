import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';

/**
 * Hook for onchain farm asset tokenization
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmAssetTokenization() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [assets, setAssets] = useState<any[]>([]);

  const tokenizeAsset = async (
    contractAddress: Address,
    to: Address,
    assetType: string,
    value: bigint,
    metadata: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'to', type: 'address' },
            { name: 'assetType', type: 'string' },
            { name: 'value', type: 'uint256' },
            { name: 'metadata', type: 'string' }
          ],
          name: 'tokenizeAsset',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'tokenizeAsset',
      args: [to, assetType, value, metadata],
    });
  };

  return { 
    assets, 
    tokenizeAsset, 
    address 
  };
}
