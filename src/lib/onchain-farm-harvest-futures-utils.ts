import { type Address } from 'viem';

export interface FuturesContract {
  id: string;
  contractId: bigint;
  plantationId: bigint;
  farmer: Address;
  buyer: Address;
  expectedYield: bigint;
  pricePerUnit: bigint;
  deliveryDate: bigint;
  delivered: boolean;
  settled: boolean;
}

export function createFuturesContract(
  address: Address,
  plantationId: bigint,
  buyer: Address,
  expectedYield: bigint,
  pricePerUnit: bigint,
  deliveryDate: bigint
): FuturesContract {
  return {
    id: `${Date.now()}-${Math.random()}`,
    contractId: BigInt(0),
    plantationId,
    farmer: address,
    buyer,
    expectedYield,
    pricePerUnit,
    deliveryDate,
    delivered: false,
    settled: false,
  };
}
