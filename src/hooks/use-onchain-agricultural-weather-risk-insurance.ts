import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createWeatherInsurance,
  claimInsurance,
  getActiveInsurance,
  checkExpiry,
  type WeatherInsurance,
} from '@/lib/onchain-agricultural-weather-risk-insurance-utils';

export function useOnchainAgriculturalWeatherRiskInsurance() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [insurances, setInsurances] = useState<WeatherInsurance[]>([]);
  const [isClaiming, setIsClaiming] = useState(false);

  const claim = async (insuranceId: bigint): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    setIsClaiming(true);
    try {
      const insurance = insurances.find((i) => i.id === insuranceId);
      if (!insurance) throw new Error('Insurance not found');
      const updated = claimInsurance(insurance);
      console.log('Claiming insurance:', { insuranceId });
    } finally {
      setIsClaiming(false);
    }
  };

  return {
    insurances,
    claim,
    getActiveInsurance,
    checkExpiry,
    isClaiming,
    address,
  };
}

import type { Address } from 'viem';
import {
  createWeatherInsurance,
  claimInsurance,
  getActiveInsurance,
  checkExpiry,
  type WeatherInsurance,
} from '@/lib/onchain-agricultural-weather-risk-insurance-utils';

export function useOnchainAgriculturalWeatherRiskInsurance() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [insurances, setInsurances] = useState<WeatherInsurance[]>([]);
  const [isClaiming, setIsClaiming] = useState(false);

  const claim = async (insuranceId: bigint): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    setIsClaiming(true);
    try {
      const insurance = insurances.find((i) => i.id === insuranceId);
      if (!insurance) throw new Error('Insurance not found');
      const updated = claimInsurance(insurance, address);
      if (updated) {
        console.log('Claiming insurance:', { insuranceId });
      }
    } finally {
      setIsClaiming(false);
    }
  };

  return {
    insurances,
    claim,
    getActiveInsurance,
    checkExpiry,
    isClaiming,
    address,
  };
}
