import { type Address } from 'viem';

export interface Document {
  id: bigint;
  owner: Address;
  documentType: string;
  documentHash: string;
  storedDate: bigint;
  txHash: string;
}

export function storeDocument(
  owner: Address,
  documentType: string,
  documentHash: string
): Document {
  return {
    id: BigInt(Date.now()),
    owner,
    documentType,
    documentHash,
    storedDate: BigInt(Date.now()),
    txHash: '',
  };
}

export function getDocumentsByType(
  documents: Document[],
  documentType: string
): Document[] {
  return documents.filter((d) => d.documentType === documentType);
}

export function verifyDocument(
  document: Document,
  documentHash: string
): boolean {
  return document.documentHash === documentHash;
}
