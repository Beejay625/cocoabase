import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  type Bridge,
} from '@/lib/onchain-bridge-utils';

export function useOnchainBridge() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [bridges, setBridges] = useState<Bridge[]>([]);

  const bridgeTokens = async (
    bridge: Address,
    amount: bigint,
    targetChain: number
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    await writeContract({
      address: bridge,
      abi: [],
      functionName: 'bridge',
      args: [amount, targetChain],
    });
  };

  return { bridges, bridgeTokens, address };
}

