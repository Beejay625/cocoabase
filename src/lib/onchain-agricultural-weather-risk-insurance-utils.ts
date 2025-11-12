import { type Address } from 'viem';

export interface WeatherInsurance {
  id: bigint;
  policyholder: Address;
  coverage: bigint;
  expiryDate: bigint;
  status: 'active' | 'expired' | 'claimed';
}

export function createWeatherInsurance(
  policyholder: Address,
  coverage: bigint,
  expiryDate: bigint
): WeatherInsurance {
  return {
    id: BigInt(0),
    policyholder,
    coverage,
    expiryDate,
    status: 'active',
  };
}

export interface WeatherInsurance {
  id: bigint;
  policyholder: Address;
  coverage: bigint;
  expiryDate: bigint;
  status: 'active' | 'expired' | 'claimed';
}

export function createWeatherInsurance(
  policyholder: Address,
  coverage: bigint,
  expiryDate: bigint
): WeatherInsurance {
  return {
    id: BigInt(0),
    policyholder,
    coverage,
    expiryDate,
    status: 'active',
  };
}
