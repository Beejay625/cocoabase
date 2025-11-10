import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  listEquipmentForRental,
  rentEquipment,
  calculateRentalCost,
  returnEquipment,
  isRentalOverdue,
  type EquipmentRental,
} from '@/lib/onchain-equipment-rental-marketplace-utils';

/**
 * Hook for onchain equipment rental marketplace operations
 * Requires Reown wallet connection via useAccount
 */
export function useOnchainEquipmentRentalMarketplace() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [rentals, setRentals] = useState<EquipmentRental[]>([]);
  const [isListing, setIsListing] = useState(false);
  const [isRenting, setIsRenting] = useState(false);

  const listEquipment = async (
    equipmentType: string,
    dailyRate: bigint,
    location: string,
    minRentalDays: number,
    maxRentalDays: number
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    setIsListing(true);
    try {
      const rental = listEquipmentForRental(
        address,
        equipmentType,
        dailyRate,
        location,
        minRentalDays,
        maxRentalDays
      );
      setRentals((prev) => [...prev, rental]);
      console.log('Listing equipment for rental:', rental);
      // Onchain listing via smart contract
      await writeContract({
        address: '0x0000000000000000000000000000000000000000' as Address,
        abi: [],
        functionName: 'listEquipmentForRental',
        args: [equipmentType, dailyRate, location, minRentalDays, maxRentalDays],
      });
    } finally {
      setIsListing(false);
    }
  };

  const rentEquipmentItem = async (
    rentalId: bigint,
    rentalDays: number
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    setIsRenting(true);
    try {
      const rental = rentals.find((r) => r.id === rentalId);
      if (!rental) throw new Error('Rental not found');
      const startDate = BigInt(Date.now());
      const updated = rentEquipment(rental, address, rentalDays, startDate);
      if (updated) {
        setRentals((prev) =>
          prev.map((r) => (r.id === rentalId ? updated : r))
        );
        console.log('Renting equipment:', { rentalId, address, rentalDays });
        // Onchain rental via smart contract
        await writeContract({
          address: '0x0000000000000000000000000000000000000000' as Address,
          abi: [],
          functionName: 'rentEquipment',
          args: [rentalId, rentalDays],
        });
      }
    } finally {
      setIsRenting(false);
    }
  };

  const returnRentalEquipment = async (rentalId: bigint): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    try {
      const rental = rentals.find((r) => r.id === rentalId);
      if (!rental) throw new Error('Rental not found');
      const updated = returnEquipment(rental);
      setRentals((prev) =>
        prev.map((r) => (r.id === rentalId ? updated : r))
      );
      console.log('Returning equipment:', { rentalId });
      // Onchain return via smart contract
      await writeContract({
        address: '0x0000000000000000000000000000000000000000' as Address,
        abi: [],
        functionName: 'returnEquipment',
        args: [rentalId],
      });
    } finally {
      // Return complete
    }
  };

  return {
    rentals,
    listEquipment,
    rentEquipmentItem,
    returnRentalEquipment,
    calculateRentalCost,
    isRentalOverdue,
    isListing,
    isRenting,
    address,
  };
}

