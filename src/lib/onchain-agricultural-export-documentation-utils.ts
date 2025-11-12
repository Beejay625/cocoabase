import { type Address } from 'viem';

export interface ExportDocument {
  id: bigint;
  creator: Address;
  destination: string;
  documentType: string;
  status: 'pending' | 'approved' | 'rejected';
  timestamp: bigint;
}

export function createExportDocument(
  creator: Address,
  destination: string,
  documentType: string
): ExportDocument {
  return {
    id: BigInt(0),
    creator,
    destination,
    documentType,
    status: 'pending',
    timestamp: BigInt(Date.now()),
  };
}
