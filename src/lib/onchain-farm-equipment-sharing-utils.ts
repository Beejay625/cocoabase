import { type Address } from 'viem';

export interface EquipmentShare {
  id: string;
  shareId: bigint;
  equipmentId: bigint;
  owner: Address;
  borrower: Address;
  startDate: bigint;
  endDate: bigint;
  deposit: bigint;
  active: boolean;
  returned: boolean;
}

export function createEquipmentShare(
  address: Address,
  equipmentId: bigint,
  borrower: Address,
  duration: bigint,
  deposit: bigint
): EquipmentShare {
  return {
    id: `${Date.now()}-${Math.random()}`,
    shareId: BigInt(0),
    equipmentId,
    owner: address,
    borrower,
    startDate: BigInt(Date.now()),
    endDate: BigInt(Date.now()) + duration,
    deposit,
    active: true,
    returned: false,
  };
}
