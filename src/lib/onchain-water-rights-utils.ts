import { type Address } from 'viem';

export interface WaterRight {
  id: bigint;
  owner: Address;
  plantationId: bigint;
  allocation: bigint;
  usage: bigint;
  startDate: bigint;
  endDate: bigint;
  txHash: string;
}

export function allocateWaterRight(
  owner: Address,
  plantationId: bigint,
  allocation: bigint,
  startDate: bigint,
  endDate: bigint
): WaterRight {
  return {
    id: BigInt(Date.now()),
    owner,
    plantationId,
    allocation,
    usage: BigInt(0),
    startDate,
    endDate,
    txHash: '',
  };
}
