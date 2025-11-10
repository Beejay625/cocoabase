import { type Address } from 'viem';

export interface EventLog {
  id: bigint;
  contract: Address;
  eventName: string;
  data: string;
  blockNumber: bigint;
  transactionHash: string;
  timestamp: bigint;
}

export function createEventLog(
  contract: Address,
  eventName: string,
  data: string,
  blockNumber: bigint,
  transactionHash: string
): EventLog {
  return {
    id: BigInt(0),
    contract,
    eventName,
    data,
    blockNumber,
    transactionHash,
    timestamp: BigInt(Date.now()),
  };
}

export function filterEventsByContract(
  events: EventLog[],
  contract: Address
): EventLog[] {
  return events.filter((e) => e.contract === contract);
}

export function filterEventsByName(
  events: EventLog[],
  eventName: string
): EventLog[] {
  return events.filter((e) => e.eventName === eventName);
}

