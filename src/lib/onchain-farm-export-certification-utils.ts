import { type Address } from 'viem';

export interface ExportCertificate {
  id: string;
  certificateId: bigint;
  productId: bigint;
  exporter: Address;
  destinationCountry: string;
  issueDate: bigint;
  expiryDate: bigint;
  certificationType: string;
  valid: boolean;
  revoked: boolean;
}

export function createExportCertificate(
  address: Address,
  productId: bigint,
  destinationCountry: string,
  validityPeriod: bigint,
  certificationType: string
): ExportCertificate {
  return {
    id: `${Date.now()}-${Math.random()}`,
    certificateId: BigInt(0),
    productId,
    exporter: address,
    destinationCountry,
    issueDate: BigInt(Date.now()),
    expiryDate: BigInt(Date.now()) + validityPeriod,
    certificationType,
    valid: true,
    revoked: false,
  };
}
