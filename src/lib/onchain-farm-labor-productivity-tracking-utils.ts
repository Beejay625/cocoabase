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

export function calculateProductivityRate(
  record: ProductivityRecord
): number {
  return Number(record.output) / record.hoursWorked;
}

export function getProductivityByWorker(
  records: ProductivityRecord[],
  workerAddress: Address
): ProductivityRecord[] {
  return records.filter(
    (r) => r.workerAddress.toLowerCase() === workerAddress.toLowerCase()
  );
}

export function getTotalOutput(
  records: ProductivityRecord[]
): bigint {
  return records.reduce((total, r) => total + r.output, BigInt(0));
}
