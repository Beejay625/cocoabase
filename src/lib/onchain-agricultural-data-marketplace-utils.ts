import { type Address } from 'viem';

export interface DataListing {
  id: bigint;
  seller: Address;
  dataType: string;
  price: bigint;
  description: string;
  status: 'listed' | 'sold' | 'cancelled';
  createdAt: bigint;
  txHash: string;
}

export function listData(
  seller: Address,
  dataType: string,
  price: bigint,
  description: string
): DataListing {
  return {
    id: BigInt(Date.now()),
    seller,
    dataType,
    price,
    description,
    status: 'listed',
    createdAt: BigInt(Date.now()),
    txHash: '',
  };
}
