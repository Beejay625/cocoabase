import { type Address } from 'viem';

export interface UtilizationRecord {
  id: bigint;
  owner: Address;
  equipmentId: bigint;
  hoursUsed: number;
  recordDate: bigint;
  utilizationRate: number;
  txHash: string;
}

export function recordUtilization(
  owner: Address,
  equipmentId: bigint,
  hoursUsed: number,
  utilizationRate: number
): UtilizationRecord {
  return {
    id: BigInt(Date.now()),
    owner,
    equipmentId,
    hoursUsed,
    recordDate: BigInt(Date.now()),
    utilizationRate,
    txHash: '',
  };
}
