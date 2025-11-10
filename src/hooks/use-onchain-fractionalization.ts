import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  fractionalizeNFT,
  purchaseShares,
  redeemNFT,
  calculateOwnershipPercentage,
  type FractionalizedNFT,
  type FractionalShare,
} from '@/lib/onchain-fractionalization-utils';

/**
 * Hook for onchain NFT fractionalization operations
 */
export function useOnchainFractionalization() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [fractionalizedNFTs, setFractionalizedNFTs] = useState<
    FractionalizedNFT[]
  >([]);
  const [shares, setShares] = useState<FractionalShare[]>([]);
  const [isFractionalizing, setIsFractionalizing] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);

  const fractionalizeToken = async (
    tokenId: bigint,
    contract: Address,
    totalShares: bigint,
    pricePerShare: bigint,
    fractionalToken: Address
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected');
    setIsFractionalizing(true);
    try {
      const fractionalized = fractionalizeNFT(
        address,
        tokenId,
        contract,
        totalShares,
        pricePerShare,
        fractionalToken
      );
      console.log('Fractionalizing NFT:', fractionalized);
      // Onchain fractionalization via smart contract
    } finally {
      setIsFractionalizing(false);
    }
  };

  const purchaseFractionalShares = async (
    fractionalizedId: bigint,
    sharesToBuy: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected');
    setIsPurchasing(true);
    try {
      const fractionalized = fractionalizedNFTs.find(
        (f) => f.id === fractionalizedId
      );
      if (!fractionalized) throw new Error('Fractionalized NFT not found');
      const result = purchaseShares(fractionalized, address, sharesToBuy);
      if (result) {
        console.log('Purchasing shares:', { fractionalizedId, sharesToBuy, address });
        // Onchain share purchase via smart contract
      }
    } finally {
      setIsPurchasing(false);
    }
  };

  return {
    fractionalizedNFTs,
    shares,
    fractionalizeToken,
    purchaseFractionalShares,
    redeemNFT,
    calculateOwnershipPercentage,
    isFractionalizing,
    isPurchasing,
    address,
  };
}

