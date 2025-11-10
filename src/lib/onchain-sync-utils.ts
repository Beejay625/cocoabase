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

