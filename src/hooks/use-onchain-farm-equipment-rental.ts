import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createRental,
  type EquipmentRental,
} from '@/lib/onchain-farm-equipment-rental-utils';

/**
 * Hook for onchain farm equipment rental
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmEquipmentRental() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [rentals, setRentals] = useState<EquipmentRental[]>([]);

  const rentEquipment = async (
    equipmentId: string,
    renter: Address,
    startDate: bigint,
    endDate: bigint,
    dailyRate: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const rental = createRental(address, equipmentId, renter, startDate, endDate, dailyRate);
    setRentals([...rentals, rental]);
  };

  const returnEquipment = async (
    contractAddress: Address,
    rentalId: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'returnEquipment',
      args: [rentalId],
    });
  };

  return { rentals, rentEquipment, returnEquipment, address };
}

