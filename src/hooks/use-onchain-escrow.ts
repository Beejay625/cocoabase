import { useState } from 'react';
import { useAccount } from 'wagmi';
import type { Address } from 'viem';
import {
  createEscrow,
  type Escrow,
} from '@/lib/onchain-escrow-utils';

export function useOnchainEscrow() {
  const { address } = useAccount();
  const [escrows, setEscrows] = useState<Escrow[]>([]);

  const createNewEscrow = async (
    seller: Address,
    amount: bigint,
    token: Address
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected');
    console.log('Creating escrow:', { seller, amount, token });
  };

  return { escrows, createNewEscrow, address };
}

