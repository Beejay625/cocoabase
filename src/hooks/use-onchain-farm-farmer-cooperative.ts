import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createCooperativeMember,
  createProposal,
  type CooperativeMember,
  type Proposal,
} from '@/lib/onchain-farm-farmer-cooperative-utils';

/**
 * Hook for onchain farm farmer cooperative
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmFarmerCooperative() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [members, setMembers] = useState<CooperativeMember[]>([]);
  const [proposals, setProposals] = useState<Proposal[]>([]);

  const joinCooperative = async (
    contractAddress: Address,
    shares: bigint,
    contribution: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    const member = createCooperativeMember(address, shares, contribution);
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [{ name: 'shares', type: 'uint256' }],
          name: 'joinCooperative',
          outputs: [],
          stateMutability: 'payable',
          type: 'function'
        }
      ],
      functionName: 'joinCooperative',
      args: [shares],
      value: contribution,
    });
    
    setMembers([...members, member]);
  };

  const leaveCooperative = async (
    contractAddress: Address
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [],
          name: 'leaveCooperative',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'leaveCooperative',
      args: [],
    });
  };

  const createProposal = async (
    contractAddress: Address,
    description: string,
    votingDeadline: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    const proposal = createProposal(address, description, votingDeadline);
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'description', type: 'string' },
            { name: 'votingDeadline', type: 'uint256' }
          ],
          name: 'createProposal',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'createProposal',
      args: [description, votingDeadline],
    });
    
    setProposals([...proposals, proposal]);
  };

  const vote = async (
    contractAddress: Address,
    proposalId: bigint,
    support: boolean
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'proposalId', type: 'uint256' },
            { name: 'support', type: 'bool' }
          ],
          name: 'vote',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'vote',
      args: [proposalId, support],
    });
  };

  const executeProposal = async (
    contractAddress: Address,
    proposalId: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [{ name: 'proposalId', type: 'uint256' }],
          name: 'executeProposal',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'executeProposal',
      args: [proposalId],
    });
  };

  return { 
    members,
    proposals,
    joinCooperative,
    leaveCooperative,
    createProposal,
    vote,
    executeProposal,
    address 
  };
}

