import { type Address } from 'viem';

export interface EquipmentRental {
  id: bigint;
  owner: Address;
  renter: Address;
  equipmentType: string;
  dailyRate: bigint;
  startDate: bigint;
  endDate: bigint;
  status: 'available' | 'rented' | 'returned';
  txHash: string;
}

export function listEquipmentForRental(
  owner: Address,
  equipmentType: string,
  dailyRate: bigint
): EquipmentRental {
  return {
    id: BigInt(Date.now()),
    owner,
    renter: '0x0000000000000000000000000000000000000000' as Address,
    equipmentType,
    dailyRate,
    startDate: BigInt(0),
    endDate: BigInt(0),
    status: 'available',
    txHash: '',
  };
}
