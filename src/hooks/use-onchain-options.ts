import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createOption,
  exerciseOption,
  expireOption,
  calculateIntrinsicValue,
  isOptionInTheMoney,
  type Option,
} from '@/lib/onchain-options-utils';

export function useOnchainOptions() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [options, setOptions] = useState<Option[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isExercising, setIsExercising] = useState(false);

  const createNewOption = async (
    seller: Address,
    underlyingAsset: string,
    strikePrice: bigint,
    premium: bigint,
    expiryTime: bigint,
    type: 'call' | 'put',
    positionSize: bigint,
    token: Address
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected');
    setIsCreating(true);
    try {
      const option = createOption(
        address,
        seller,
        underlyingAsset,
        strikePrice,
        premium,
        expiryTime,
        type,
        positionSize,
        token
      );
      console.log('Creating option:', option);
    } finally {
      setIsCreating(false);
    }
  };

  const exerciseOptionContract = async (
    optionId: bigint,
    currentPrice: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected');
    setIsExercising(true);
    try {
      const currentTime = BigInt(Date.now());
      const option = options.find((o) => o.id === optionId);
      if (!option) throw new Error('Option not found');
      const updated = exerciseOption(option, address, currentPrice, currentTime);
      if (updated) {
        console.log('Exercising option:', { optionId, address });
      }
    } finally {
      setIsExercising(false);
    }
  };

  return {
    options,
    createNewOption,
    exerciseOptionContract,
    expireOption,
    calculateIntrinsicValue,
    isOptionInTheMoney,
    isCreating,
    isExercising,
    address,
  };
}

