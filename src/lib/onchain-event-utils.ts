import { type Address, type Hash } from 'viem';

/**
 * Onchain event listener utilities
 * Subscribe to and parse blockchain events
 */

export interface EventFilter {
  address?: Address;
  topics?: string[];
  fromBlock?: bigint;
  toBlock?: bigint;
}

export interface ParsedEvent {
  name: string;
  args: Record<string, unknown>;
  blockNumber: bigint;
  txHash: Hash;
  logIndex: number;
}

/**
 * Create event filter
 */
export function createEventFilter(
  address?: Address,
  topics?: string[]
): EventFilter {
  return { address, topics };
}

/**
 * Parse event name from topic
 */
export function parseEventName(topic: string): string {
  return topic.slice(0, 10);
}

/**
 * Check if event matches filter
 */
export function matchesEventFilter(
  event: ParsedEvent,
  filter: EventFilter
): boolean {
  if (filter.address && event.args.address !== filter.address) {
    return false;
  }
  return true;
}

