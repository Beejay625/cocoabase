import { type Address } from 'viem';

export interface EquipmentInventory {
  id: bigint;
  owner: Address;
  equipmentName: string;
  quantity: bigint;
  location: string;
  status: 'available' | 'in-use' | 'maintenance';
  txHash: string;
}

export function addEquipment(
  owner: Address,
  equipmentName: string,
  quantity: bigint,
  location: string
): EquipmentInventory {
  return {
    id: BigInt(Date.now()),
    owner,
    equipmentName,
    quantity,
    location,
    status: 'available',
    txHash: '',
  };
}

export function updateEquipmentStatus(
  equipment: EquipmentInventory,
  status: EquipmentInventory['status']
): EquipmentInventory {
  return {
    ...equipment,
    status,
  };
}

export function getAvailableEquipment(
  inventory: EquipmentInventory[]
): EquipmentInventory[] {
  return inventory.filter((e) => e.status === 'available' && e.quantity > BigInt(0));
}

export function getTotalEquipmentQuantity(
  inventory: EquipmentInventory[]
): bigint {
  return inventory.reduce((total, e) => total + e.quantity, BigInt(0));
}
