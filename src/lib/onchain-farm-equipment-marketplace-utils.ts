import { type Address } from 'viem';

export interface EquipmentListing {
  id: bigint;
  seller: Address;
  equipmentName: string;
  condition: 'new' | 'used' | 'refurbished';
  price: bigint;
  status: 'available' | 'sold' | 'cancelled';
}

export function createEquipmentListing(
  seller: Address,
  equipmentName: string,
  condition: 'new' | 'used' | 'refurbished',
  price: bigint
): EquipmentListing {
  return {
    id: BigInt(0),
    seller,
    equipmentName,
    condition,
    price,
    status: 'available',
  };
}
