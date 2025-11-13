import { type Address } from 'viem';

/**
 * Onchain farm equipment rental utilities
 * Equipment rental creation and return
 */

export interface EquipmentRental {
  id: string;
  equipmentId: string;
  owner: Address;
  renter: Address;
  startDate: bigint;
  endDate: bigint;
  dailyRate: bigint;
  status: 'active' | 'returned' | 'cancelled';
  timestamp: bigint;
}

export function createRental(
  owner: Address,
  equipmentId: string,
  renter: Address,
  startDate: bigint,
  endDate: bigint,
  dailyRate: bigint
): EquipmentRental {
  return {
    id: `${Date.now()}-${Math.random()}`,
    equipmentId,
    owner,
    renter,
    startDate,
    endDate,
    dailyRate,
    status: 'active',
    timestamp: BigInt(Date.now()),
  };
}

