import { type Address } from 'viem';

export interface WeatherRiskInsurance {
  id: bigint;
  owner: Address;
  plantationId: bigint;
  coverageType: string;
  coverageAmount: bigint;
  premium: bigint;
  startDate: bigint;
  endDate: bigint;
  status: 'active' | 'expired' | 'claimed';
  txHash: string;
}

export function createWeatherInsurance(
  owner: Address,
  plantationId: bigint,
  coverageType: string,
  coverageAmount: bigint,
  premium: bigint,
  endDate: bigint
): WeatherRiskInsurance {
  return {
    id: BigInt(Date.now()),
    owner,
    plantationId,
    coverageType,
    coverageAmount,
    premium,
    startDate: BigInt(Date.now()),
    endDate,
    status: 'active',
    txHash: '',
  };
}

export function claimInsurance(
  insurance: WeatherRiskInsurance
): WeatherRiskInsurance {
  return {
    ...insurance,
    status: 'claimed',
  };
}

export function getActiveInsurance(
  policies: WeatherRiskInsurance[]
): WeatherRiskInsurance[] {
  return policies.filter((p) => p.status === 'active');
}

export function checkInsuranceExpiry(
  insurance: WeatherRiskInsurance,
  currentTime: bigint
): boolean {
  return currentTime > insurance.endDate;
}
