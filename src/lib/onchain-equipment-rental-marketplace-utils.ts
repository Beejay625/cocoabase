import { type Address } from 'viem';

/**
 * Onchain Equipment Rental Marketplace utilities
 * Rent agricultural equipment onchain
 */

export interface EquipmentRental {
  id: bigint;
  owner: Address;
  equipmentType: string;
  dailyRate: bigint;
  availability: 'available' | 'rented' | 'maintenance';
  location: string;
  minRentalDays: number;
  maxRentalDays: number;
  createdAt: bigint;
  renter?: Address;
  rentalStart?: bigint;
  rentalEnd?: bigint;
}

export function listEquipmentForRental(
  owner: Address,
  equipmentType: string,
  dailyRate: bigint,
  location: string,
  minRentalDays: number,
  maxRentalDays: number
): EquipmentRental {
  const now = BigInt(Date.now());
  return {
    id: BigInt(0),
    owner,
    equipmentType,
    dailyRate,
    availability: 'available',
    location,
    minRentalDays,
    maxRentalDays,
    createdAt: now,
  };
}

export function rentEquipment(
  rental: EquipmentRental,
  renter: Address,
  rentalDays: number,
  startDate: bigint
): EquipmentRental | null {
  if (rental.availability !== 'available') return null;
  if (rentalDays < rental.minRentalDays || rentalDays > rental.maxRentalDays) return null;

  const endDate = startDate + BigInt(rentalDays * 24 * 60 * 60 * 1000);
  return {
    ...rental,
    availability: 'rented',
    renter,
    rentalStart: startDate,
    rentalEnd: endDate,
  };
}

export function calculateRentalCost(
  dailyRate: bigint,
  rentalDays: number
): bigint {
  return dailyRate * BigInt(rentalDays);
}

export function returnEquipment(rental: EquipmentRental): EquipmentRental {
  return {
    ...rental,
    availability: 'available',
    renter: undefined,
    rentalStart: undefined,
    rentalEnd: undefined,
  };
}

export function isRentalOverdue(rental: EquipmentRental, currentTime: bigint): boolean {
  if (rental.availability !== 'rented' || !rental.rentalEnd) return false;
  return currentTime > rental.rentalEnd;
}

