import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createStateTransition,
  type StateTransition,
} from '@/lib/onchain-farm-crop-harvest-blockchain-state-machine-utils';

/**
 * Hook for onchain farm crop harvest blockchain state machine
 * Uses blockchain wallet for all web3 transactions
 */
export function useOnchainFarmCropHarvestBlockchainStateMachine() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [transitions, setTransitions] = useState<StateTransition[]>([]);

  const transition = async (
    harvestId: string,
    fromState: string,
    toState: string,
    transitionDate: bigint,
    condition: string
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    const transition = createStateTransition(address, harvestId, fromState, toState, transitionDate, condition);
    setTransitions([...transitions, transition]);
  };

  const verifyTransition = async (
    contractAddress: Address,
    transitionId: string
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'verifyTransition',
      args: [transitionId],
    });
  };

  return { transitions, transition, verifyTransition, address };
}

