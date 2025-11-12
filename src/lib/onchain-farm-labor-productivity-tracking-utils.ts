import { type Address } from 'viem';

export interface ProductivityRecord {
  id: bigint;
  owner: Address;
  workerAddress: Address;
  taskType: string;
  output: bigint;
  hoursWorked: number;
  recordDate: bigint;
  txHash: string;
}

export function recordProductivity(
  owner: Address,
  workerAddress: Address,
  taskType: string,
  output: bigint,
  hoursWorked: number
): ProductivityRecord {
  return {
    id: BigInt(Date.now()),
    owner,
    workerAddress,
    taskType,
    output,
    hoursWorked,
    recordDate: BigInt(Date.now()),
    txHash: '',
  };
}
