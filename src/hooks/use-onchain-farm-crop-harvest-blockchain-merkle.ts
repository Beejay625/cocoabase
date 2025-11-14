import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createMerkleTree,
  type MerkleTree,
} from '@/lib/onchain-farm-crop-harvest-blockchain-merkle-utils';

/**
 * Hook for onchain farm crop harvest blockchain merkle tree
 * Uses blockchain wallet for all web3 transactions
 */
export function useOnchainFarmCropHarvestBlockchainMerkle() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [trees, setTrees] = useState<MerkleTree[]>([]);

  const createTree = async (
    harvestId: string,
    rootHash: string,
    leaves: string[],
    creationDate: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    const tree = createMerkleTree(address, harvestId, rootHash, leaves, creationDate);
    setTrees([...trees, tree]);
  };

  const verifyProof = async (
    contractAddress: Address,
    treeId: string,
    leaf: string,
    proof: string[]
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'verifyProof',
      args: [treeId, leaf, proof],
    });
  };

  return { trees, createTree, verifyProof, address };
}

