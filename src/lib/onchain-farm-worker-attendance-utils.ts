import { type Address } from 'viem';

export interface WorkerAttendance {
  id: bigint;
  owner: Address;
  workerAddress: Address;
  checkInTime: bigint;
  checkOutTime: bigint;
  workDate: bigint;
  hoursWorked: number;
  txHash: string;
}

export function recordCheckIn(
  owner: Address,
  workerAddress: Address,
  workDate: bigint
): WorkerAttendance {
  return {
    id: BigInt(Date.now()),
    owner,
    workerAddress,
    checkInTime: BigInt(Date.now()),
    checkOutTime: BigInt(0),
    workDate,
    hoursWorked: 0,
    txHash: '',
  };
}
