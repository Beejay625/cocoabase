import { type Address, type Hash } from 'viem';

/**
 * Onchain data synchronization utilities
 * Sync local state with blockchain data
 */

export interface SyncOperation {
  id: string;
  type: 'mint' | 'transfer' | 'update' | 'harvest';
  txHash?: Hash;
  status: 'pending' | 'syncing' | 'completed' | 'failed';
  timestamp: number;
}

export interface SyncQueue {
  operations: SyncOperation[];
  lastSyncBlock: bigint;
  currentBlock: bigint;
}

/**
 * Create sync operation
 */
export function createSyncOperation(
  type: SyncOperation['type'],
  txHash?: Hash
): SyncOperation {
  return {
    id: `${Date.now()}-${Math.random()}`,
    type,
    txHash,
    status: 'pending',
    timestamp: Date.now(),
  };
}

/**
 * Check if sync is needed
 */
export function needsSync(
  lastSyncBlock: bigint,
  currentBlock: bigint,
  threshold: bigint = BigInt(10)
): boolean {
  return currentBlock - lastSyncBlock > threshold;
}

/**
 * Update sync operation status
 */
export function updateSyncStatus(
  operation: SyncOperation,
  status: SyncOperation['status']
): SyncOperation {
  return { ...operation, status };
}

