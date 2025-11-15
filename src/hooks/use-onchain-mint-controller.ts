import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createMintController,
  mintTokens,
  canMint,
  getRemainingSupply,
  type MintController,
} from '@/lib/onchain-mint-controller-utils';

export function useOnchainMintController() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [controllers, setControllers] = useState<MintController[]>([]);
  const [isMinting, setIsMinting] = useState(false);

  const mint = async (
    controllerId: bigint,
    to: Address,
    amount: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    setIsMinting(true);
    try {
      const controller = controllers.find((c) => c.id === controllerId);
      if (!controller) throw new Error('Controller not found');
      const updated = mintTokens(controller, to, amount);
      if (updated) {
        console.log('Minting tokens:', { controllerId, to, amount });
      }
    } finally {
      setIsMinting(false);
    }
  };

  return {
    controllers,
    mint,
    canMint,
    getRemainingSupply,
    isMinting,
    address,
  };
}



