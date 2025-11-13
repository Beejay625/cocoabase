import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createSaleRecord,
  type LivestockSale,
} from '@/lib/onchain-farm-livestock-sales-utils';

/**
 * Hook for onchain farm livestock sales
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmLivestockSales() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [sales, setSales] = useState<LivestockSale[]>([]);

  const recordSale = async (
    animalId: string,
    buyer: Address,
    salePrice: bigint,
    saleDate: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const sale = createSaleRecord(address, animalId, buyer, salePrice, saleDate);
    setSales([...sales, sale]);
  };

  const confirmSale = async (
    contractAddress: Address,
    saleId: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'confirmSale',
      args: [saleId],
    });
  };

  return { sales, recordSale, confirmSale, address };
}

