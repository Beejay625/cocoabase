import { type Address } from 'viem';

export interface FactoryContract {
  id: bigint;
  owner: Address;
  template: Address;
  instances: Address[];
  creationFee: bigint;
}

export function createFactory(
  owner: Address,
  template: Address,
  creationFee: bigint
): FactoryContract {
  return {
    id: BigInt(0),
    owner,
    template,
    instances: [],
    creationFee,
  };
}

export function deployInstance(
  factory: FactoryContract,
  instance: Address
): FactoryContract {
  return {
    ...factory,
    instances: [...factory.instances, instance],
  };
}

export function calculateDeploymentCost(
  factory: FactoryContract,
  gasPrice: bigint,
  gasLimit: bigint
): bigint {
  return factory.creationFee + gasPrice * gasLimit;
}
