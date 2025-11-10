import { type Address, type Hash } from 'viem';

/**
 * Onchain audit trail utilities
 * Comprehensive audit logging and verification
 */

export interface AuditLog {
  id: bigint;
  event: string;
  actor: Address;
  target: Address;
  action: string;
  data: string;
  timestamp: bigint;
  txHash: Hash;
  blockNumber: bigint;
}

export interface AuditEvent {
  type: 'mint' | 'transfer' | 'burn' | 'approval' | 'stake' | 'unstake' | 'vote' | 'claim';
  details: Record<string, unknown>;
}

export function createAuditLog(
  event: string,
  actor: Address,
  target: Address,
  action: string,
  data: string,
  txHash: Hash,
  blockNumber: bigint
): AuditLog {
  return {
    id: BigInt(0),
    event,
    actor,
    target,
    action,
    data,
    timestamp: BigInt(Date.now()),
    txHash,
    blockNumber,
  };
}

export function logAuditEvent(
  event: AuditEvent,
  actor: Address,
  target: Address,
  txHash: Hash,
  blockNumber: bigint
): AuditLog {
  return createAuditLog(
    event.type,
    actor,
    target,
    event.type,
    JSON.stringify(event.details),
    txHash,
    blockNumber
  );
}

export function filterAuditLogs(
  logs: AuditLog[],
  filters: {
    actor?: Address;
    target?: Address;
    event?: string;
    fromBlock?: bigint;
    toBlock?: bigint;
  }
): AuditLog[] {
  return logs.filter(log => {
    if (filters.actor && log.actor !== filters.actor) return false;
    if (filters.target && log.target !== filters.target) return false;
    if (filters.event && log.event !== filters.event) return false;
    if (filters.fromBlock && log.blockNumber < filters.fromBlock) return false;
    if (filters.toBlock && log.blockNumber > filters.toBlock) return false;
    return true;
  });
}

export function getAuditTrail(
  logs: AuditLog[],
  address: Address
): AuditLog[] {
  return logs.filter(log =>
    log.actor === address || log.target === address
  ).sort((a, b) => Number(a.blockNumber - b.blockNumber));
}

export function verifyAuditLog(
  log: AuditLog,
  expectedHash: Hash
): boolean {
  return log.txHash === expectedHash;
}

export function calculateAuditStats(
  logs: AuditLog[]
): {
  totalEvents: number;
  uniqueActors: number;
  eventTypes: Record<string, number>;
} {
  const actors = new Set<Address>();
  const eventTypes: Record<string, number> = {};
  logs.forEach(log => {
    actors.add(log.actor);
    eventTypes[log.event] = (eventTypes[log.event] || 0) + 1;
  });
  return {
    totalEvents: logs.length,
    uniqueActors: actors.size,
    eventTypes,
  };
}

export function getRecentAuditLogs(
  logs: AuditLog[],
  limit: number = 10
): AuditLog[] {
  return logs
    .sort((a, b) => Number(b.timestamp - a.timestamp))
    .slice(0, limit);
}
