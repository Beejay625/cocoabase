import { type Address } from 'viem';

export interface ProductionData {
  id: string;
  dataId: bigint;
  farmOwner: Address;
  yield: bigint;
  area: bigint;
  efficiency: bigint;
  cropType: string;
  date: bigint;
}

export function createProductionData(
  farmOwner: Address,
  dataId: bigint,
  yield_: bigint,
  area: bigint,
  cropType: string
): ProductionData {
  const efficiency = area > BigInt(0) ? (yield_ * BigInt(10000)) / area : BigInt(0);

  return {
    id: `${Date.now()}-${Math.random()}`,
    dataId,
    farmOwner,
    yield: yield_,
    area,
    efficiency,
    cropType,
    date: BigInt(Date.now()),
  };
}
