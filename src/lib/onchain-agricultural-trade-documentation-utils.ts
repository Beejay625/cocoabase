import { type Address } from 'viem';

export interface TradeDocument {
  id: bigint;
  creator: Address;
  documentType: string;
  status: 'draft' | 'approved' | 'rejected';
  timestamp: bigint;
}

export function createTradeDocument(
  creator: Address,
  documentType: string
): TradeDocument {
  return {
    id: BigInt(Date.now()),
    creator,
    documentType,
    status: 'draft',
    timestamp: BigInt(Date.now()),
  };
}
