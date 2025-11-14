import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createContract,
  type HarvestContract,
} from '@/lib/onchain-farm-crop-harvest-contract-management-utils';

/**
 * Hook for onchain farm crop harvest contract management
 * Uses blockchain wallet for all web3 transactions
 */
export function useOnchainFarmCropHarvestContractManagement() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [contracts, setContracts] = useState<HarvestContract[]>([]);

  const createContract = async (
    harvestId: string,
    buyer: Address,
    seller: Address,
    price: bigint,
    quantity: bigint,
    contractDate: bigint,
    terms: string
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    const contract = createContract(address, harvestId, buyer, seller, price, quantity, contractDate, terms);
    setContracts([...contracts, contract]);
  };

  const executeContract = async (
    contractAddress: Address,
    contractId: string
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'executeContract',
      args: [contractId],
    });
  };

  return { contracts, createContract, executeContract, address };
}

