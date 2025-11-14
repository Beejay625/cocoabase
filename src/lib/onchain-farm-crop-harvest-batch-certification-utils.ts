import { type Address } from 'viem';

/**
 * Onchain farm crop harvest batch certification utilities
 * Batch certification creation on blockchain
 */

export interface BatchCertification {
  id: string;
  batchId: string;
  certifiedBy: Address;
  certificationType: string;
  certifyingBody: string;
  certificationDate: bigint;
  certificateNumber: string;
  verified: boolean;
  timestamp: bigint;
}

export function createBatchCertification(
  address: Address,
  batchId: string,
  certificationType: string,
  certifyingBody: string,
  certificationDate: bigint,
  certificateNumber: string
): BatchCertification {
  return {
    id: `${Date.now()}-${Math.random()}`,
    batchId,
    certifiedBy: address,
    certificationType,
    certifyingBody,
    certificationDate,
    certificateNumber,
    verified: false,
    timestamp: BigInt(Date.now()),
  };
}

