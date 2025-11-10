import { type Address } from 'viem';

export interface EquipmentLease {
  id: bigint;
  lessor: Address;
  lessee: Address;
  equipmentId: bigint;
  monthlyRent: bigint;
  startDate: bigint;
  endDate: bigint;
  status: 'active' | 'expired' | 'cancelled';
  txHash: string;
}

export function createLease(
  lessor: Address,
  lessee: Address,
  equipmentId: bigint,
  monthlyRent: bigint,
  startDate: bigint,
  endDate: bigint
): EquipmentLease {
  return {
    id: BigInt(Date.now()),
    lessor,
    lessee,
    equipmentId,
    monthlyRent,
    startDate,
    endDate,
    status: 'active',
    txHash: '',
  };
}
