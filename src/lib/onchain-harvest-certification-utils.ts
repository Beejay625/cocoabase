import { type Address } from 'viem';

export interface HarvestCertification {
  id: bigint;
  owner: Address;
  plantationId: bigint;
  harvestDate: bigint;
  quantity: bigint;
  qualityGrade: string;
  txHash: string;
}

export function certifyHarvest(
  owner: Address,
  plantationId: bigint,
  quantity: bigint,
  qualityGrade: string
): HarvestCertification {
  return {
    id: BigInt(Date.now()),
    owner,
    plantationId,
    harvestDate: BigInt(Date.now()),
    quantity,
    qualityGrade,
    txHash: '',
  };
}
