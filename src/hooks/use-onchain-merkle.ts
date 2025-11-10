import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  type MerkleProof,
} from '@/lib/onchain-merkle-utils';

export function useOnchainMerkle() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [proofs, setProofs] = useState<MerkleProof[]>([]);

  const claimWithProof = async (
    proof: MerkleProof,
    amount: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    await writeContract({
      address: '0x0000000000000000000000000000000000000000' as Address,
      abi: [],
      functionName: 'claimWithProof',
      args: [proof, amount],
    });
  };

  return { proofs, claimWithProof, address };
}
