import { type Address } from 'viem';

export interface CommodityFuture {
  id: bigint;
  trader: Address;
  commodity: string;
  quantity: bigint;
  price: bigint;
  expiryDate: bigint;
  status: 'open' | 'settled' | 'expired';
  txHash: string;
}

export function createFuture(
  trader: Address,
  commodity: string,
  quantity: bigint,
  price: bigint,
  expiryDate: bigint
): CommodityFuture {
  return {
    id: BigInt(Date.now()),
    trader,
    commodity,
    quantity,
    price,
    expiryDate,
    status: 'open',
    txHash: '',
  };
}

export function settleFuture(
  future: CommodityFuture
): CommodityFuture {
  return {
    ...future,
    status: 'settled',
  };
}

export function getOpenFutures(
  futures: CommodityFuture[]
): CommodityFuture[] {
  return futures.filter((f) => f.status === 'open');
}

export function checkExpiry(
  future: CommodityFuture,
  currentTime: bigint
): boolean {
  return currentTime > future.expiryDate;
}
