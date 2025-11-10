import { type Address, type Hash } from 'viem';

/**
 * Onchain batch transaction utilities
 * Batch multiple operations in single transaction
 */

export interface BatchOperation {
  target: Address;
  value: bigint;
  data: string;
}

export interface BatchTransaction {
  operations: BatchOperation[];
  txHash?: Hash;
  executed: boolean;
}

/**
 * Validate batch transaction
 */
export function validateBatchTransaction(batch: BatchTransaction): boolean {
  return batch.operations.length > 0 && batch.operations.length <= 100;
}

