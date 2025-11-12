import { type Address } from 'viem';

export interface TradeSettlement {
  id: bigint;
  buyer: Address;
  seller: Address;
  tradeId: bigint;
  settlementAmount: bigint;
  settlementDate: bigint;
  status: 'pending' | 'settled' | 'disputed';
  txHash: string;
}

export function createSettlement(
  buyer: Address,
  seller: Address,
  tradeId: bigint,
  settlementAmount: bigint
): TradeSettlement {
  return {
    id: BigInt(Date.now()),
    buyer,
    seller,
    tradeId,
    settlementAmount,
    settlementDate: BigInt(Date.now()),
    status: 'pending',
    txHash: '',
  };
}
