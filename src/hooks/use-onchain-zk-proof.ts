import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  type ZKProof,
} from '@/lib/onchain-zk-proof-utils';

export function useOnchainZKProof() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [proofs, setProofs] = useState<ZKProof[]>([]);

  const verifyProof = async (
    proof: ZKProof
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    await writeContract({
      address: '0x0000000000000000000000000000000000000000' as Address,
      abi: [],
      functionName: 'verifyProof',
      args: [proof],
    });
  };

  return { proofs, verifyProof, address };
}
