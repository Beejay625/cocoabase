import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createCarbonOffset,
  type CarbonOffset,
} from '@/lib/onchain-farm-carbon-offset-marketplace-utils';

export function useOnchainFarmCarbonOffsetMarketplace() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [offsets, setOffsets] = useState<CarbonOffset[]>([]);

  const listCarbonOffset = async (
    contractAddress: Address,
    carbonAmount: bigint,
    pricePerTon: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    const offset = createCarbonOffset(address, carbonAmount, pricePerTon);
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'carbonAmount', type: 'uint256' },
            { name: 'pricePerTon', type: 'uint256' }
          ],
          name: 'listCarbonOffset',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'listCarbonOffset',
      args: [carbonAmount, pricePerTon],
    });
    
    setOffsets([...offsets, offset]);
  };

  const purchaseCarbonOffset = async (
    contractAddress: Address,
    offsetId: bigint,
    value: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [{ name: 'offsetId', type: 'uint256' }],
          name: 'purchaseCarbonOffset',
          outputs: [],
          stateMutability: 'payable',
          type: 'function'
        }
      ],
      functionName: 'purchaseCarbonOffset',
      args: [offsetId],
      value,
    });
  };

  return { offsets, listCarbonOffset, purchaseCarbonOffset, address };
}
