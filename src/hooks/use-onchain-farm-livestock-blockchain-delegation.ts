import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createDelegation,
  type Delegation,
} from '@/lib/onchain-farm-livestock-blockchain-delegation-utils';

/**
 * Hook for onchain farm livestock blockchain delegation
 * Uses blockchain wallet for all web3 transactions
 */
export function useOnchainFarmLivestockBlockchainDelegation() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [delegations, setDelegations] = useState<Delegation[]>([]);

  const delegate = async (
    animalId: string,
    fromAddress: Address,
    toAddress: Address,
    delegationDate: bigint,
    permissions: string[]
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    const delegation = createDelegation(address, animalId, fromAddress, toAddress, delegationDate, permissions);
    setDelegations([...delegations, delegation]);
  };

  const revokeDelegation = async (
    contractAddress: Address,
    delegationId: string
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'revokeDelegation',
      args: [delegationId],
    });
  };

  return { delegations, delegate, revokeDelegation, address };
}

