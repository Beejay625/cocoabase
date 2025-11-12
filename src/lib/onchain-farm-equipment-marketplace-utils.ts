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

export function purchaseEquipment(
  listing: EquipmentListing,
  buyer: Address
): EquipmentListing {
  return {
    ...listing,
    status: 'sold',
  };
}

export function getAvailableEquipment(
  listings: EquipmentListing[]
): EquipmentListing[] {
  return listings.filter((l) => l.status === 'available');
}

export function getEquipmentByCondition(
  listings: EquipmentListing[],
  condition: 'new' | 'used' | 'refurbished'
): EquipmentListing[] {
  return listings.filter((l) => l.condition === condition);
}
