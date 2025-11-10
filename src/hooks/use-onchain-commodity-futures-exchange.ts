import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createFuturesContract,
  fillFuturesContract,
  calculateFuturesValue,
  isContractExpired,
  markContractAsDelivered,
  type FuturesContract,
} from '@/lib/onchain-commodity-futures-exchange-utils';

/**
 * Hook for onchain commodity futures exchange operations
 * Requires Reown wallet connection via useAccount
 */
export function useOnchainCommodityFuturesExchange() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [contracts, setContracts] = useState<FuturesContract[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isFilling, setIsFilling] = useState(false);

  const createContract = async (
    commodity: string,
    quantity: bigint,
    price: bigint,
    deliveryDate: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    setIsCreating(true);
    try {
      const contract = createFuturesContract(
        commodity,
        quantity,
        price,
        deliveryDate,
        address
      );
      setContracts((prev) => [...prev, contract]);
      console.log('Creating futures contract:', contract);
      // Onchain contract creation via smart contract
      await writeContract({
        address: '0x0000000000000000000000000000000000000000' as Address,
        abi: [],
        functionName: 'createFuturesContract',
        args: [commodity, quantity, price, deliveryDate],
      });
    } finally {
      setIsCreating(false);
    }
  };

  const fillContract = async (contractId: bigint): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    setIsFilling(true);
    try {
      const contract = contracts.find((c) => c.id === contractId);
      if (!contract) throw new Error('Contract not found');
      const updated = fillFuturesContract(contract, address);
      if (updated) {
        setContracts((prev) =>
          prev.map((c) => (c.id === contractId ? updated : c))
        );
        console.log('Filling futures contract:', { contractId, address });
        // Onchain contract filling via smart contract
        await writeContract({
          address: '0x0000000000000000000000000000000000000000' as Address,
          abi: [],
          functionName: 'fillFuturesContract',
          args: [contractId],
        });
      }
    } finally {
      setIsFilling(false);
    }
  };

  return {
    contracts,
    createContract,
    fillContract,
    calculateFuturesValue,
    isContractExpired,
    markContractAsDelivered,
    isCreating,
    isFilling,
    address,
  };
}

