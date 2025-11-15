import { type Address } from 'viem';

/**
 * Onchain Equipment Warranty Tracking utilities
 * Track equipment warranties onchain with Reown wallet integration
 */

export interface WarrantyRecord {
  id: bigint;
  farmer: Address;
  equipmentId: string;
  warrantyProvider: string;
  warrantyNumber: string;
  purchaseDate: bigint;
  warrantyStart: bigint;
  warrantyEnd: bigint;
  coverage: string[];
  status: 'active' | 'expired' | 'voided';
  claimsCount: number;
}

export function createWarrantyRecord(
  farmer: Address,
  equipmentId: string,
  warrantyProvider: string,
  warrantyNumber: string,
  purchaseDate: bigint,
  warrantyStart: bigint,
  warrantyEnd: bigint,
  coverage: string[]
): WarrantyRecord {
  return {
    id: BigInt(0),
    farmer,
    equipmentId,
    warrantyProvider,
    warrantyNumber,
    purchaseDate,
    warrantyStart,
    warrantyEnd,
    coverage,
    status: 'active',
    claimsCount: 0,
  };
}

export function fileWarrantyClaim(record: WarrantyRecord): WarrantyRecord {
  return {
    ...record,
    claimsCount: record.claimsCount + 1,
  };
}

export function isWarrantyExpired(record: WarrantyRecord, currentTime: bigint): boolean {
  return currentTime > record.warrantyEnd;
}

export function isWarrantyValid(record: WarrantyRecord, currentTime: bigint): boolean {
  return record.status === 'active' && 
         currentTime >= record.warrantyStart && 
         currentTime <= record.warrantyEnd;
}



