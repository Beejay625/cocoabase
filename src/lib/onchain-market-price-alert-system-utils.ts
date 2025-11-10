import { type Address } from 'viem';

export interface PriceAlert {
  id: bigint;
  owner: Address;
  commodity: string;
  targetPrice: bigint;
  condition: 'above' | 'below';
  status: 'active' | 'triggered' | 'cancelled';
  createdAt: bigint;
  txHash: string;
}

export function createPriceAlert(
  owner: Address,
  commodity: string,
  targetPrice: bigint,
  condition: PriceAlert['condition']
): PriceAlert {
  return {
    id: BigInt(Date.now()),
    owner,
    commodity,
    targetPrice,
    condition,
    status: 'active',
    createdAt: BigInt(Date.now()),
    txHash: '',
  };
}
