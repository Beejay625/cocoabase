import { type Address } from 'viem';

/**
 * Onchain farm labor attendance utilities
 * Labor attendance recording and verification
 */

export interface AttendanceRecord {
  id: string;
  employer: Address;
  worker: Address;
  date: bigint;
  checkInTime: bigint;
  checkOutTime: bigint;
  verified: boolean;
  timestamp: bigint;
}

export function createAttendanceRecord(
  employer: Address,
  worker: Address,
  date: bigint,
  checkInTime: bigint,
  checkOutTime: bigint
): AttendanceRecord {
  return {
    id: `${Date.now()}-${Math.random()}`,
    employer,
    worker,
    date,
    checkInTime,
    checkOutTime,
    verified: false,
    timestamp: BigInt(Date.now()),
  };
}

