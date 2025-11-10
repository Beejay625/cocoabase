import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  tokenizeAsset,
  purchaseTokens,
  redeemAsset,
  calculateOwnership,
  calculateValuation,
  type TokenizedAsset,
} from '@/lib/onchain-tokenization-utils';

export function useOnchainTokenization() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [tokenizedAssets, setTokenizedAssets] = useState<TokenizedAsset[]>([]);
  const [isTokenizing, setIsTokenizing] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);

  const tokenizeNewAsset = async (
    assetType: string,
    assetId: string,
    tokenContract: Address,
    totalSupply: bigint,
    pricePerToken: bigint,
    metadata: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected');
    setIsTokenizing(true);
    try {
      const tokenized = tokenizeAsset(
        address,
        assetType,
        assetId,
        tokenContract,
        totalSupply,
        pricePerToken,
        metadata
      );
      console.log('Tokenizing asset:', tokenized);
    } finally {
      setIsTokenizing(false);
    }
  };

  const purchaseAssetTokens = async (
    tokenizedId: bigint,
    amount: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected');
    setIsPurchasing(true);
    try {
      const tokenized = tokenizedAssets.find((t) => t.id === tokenizedId);
      if (!tokenized) throw new Error('Tokenized asset not found');
      const result = purchaseTokens(tokenized, address, amount);
      if (result) {
        console.log('Purchasing tokens:', { tokenizedId, amount, address });
      }
    } finally {
      setIsPurchasing(false);
    }
  };

  return {
    tokenizedAssets,
    tokenizeNewAsset,
    purchaseAssetTokens,
    redeemAsset,
    calculateOwnership,
    calculateValuation,
    isTokenizing,
    isPurchasing,
    address,
  };
}

