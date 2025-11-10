import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  type TokenizedAsset,
} from '@/lib/onchain-tokenization-utils';

export function useOnchainTokenization() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [assets, setAssets] = useState<TokenizedAsset[]>([]);

  const tokenizeAsset = async (
    assetType: string,
    totalSupply: bigint,
    pricePerToken: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    await writeContract({
      address: '0x0000000000000000000000000000000000000000' as Address,
      abi: [],
      functionName: 'tokenizeAsset',
      args: [assetType, totalSupply, pricePerToken],
    });
  };

  return { assets, tokenizeAsset, address };
}
