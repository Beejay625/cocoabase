import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  type Derivative,
} from '@/lib/onchain-derivatives-utils';

export function useOnchainDerivatives() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [derivatives, setDerivatives] = useState<Derivative[]>([]);

  const createOption = async (
    underlying: Address,
    strikePrice: bigint,
    expiry: bigint,
    type: 'call' | 'put'
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    await writeContract({
      address: '0x0000000000000000000000000000000000000000' as Address,
      abi: [],
      functionName: 'createOption',
      args: [underlying, strikePrice, expiry, type],
    });
  };

  return { derivatives, createOption, address };
}
