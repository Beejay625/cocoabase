import { type Address } from 'viem';

export interface FertilizerRecord {
  id: bigint;
  owner: Address;
  plantationId: bigint;
  fertilizerType: string;
  quantity: bigint;
  applicationDate: bigint;
  txHash: string;
}

export function recordFertilizer(
  owner: Address,
  plantationId: bigint,
  fertilizerType: string,
  quantity: bigint
): FertilizerRecord {
  return {
    id: BigInt(Date.now()),
    owner,
    plantationId,
    fertilizerType,
    quantity,
    applicationDate: BigInt(Date.now()),
    txHash: '',
  };
}
