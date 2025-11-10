import { useState } from 'react';
import { useAccount } from 'wagmi';
import {
  createInsuranceApplication,
  type InsuranceApplication,
} from '@/lib/onchain-agricultural-insurance-application-utils';

export function useOnchainAgriculturalInsuranceApplication() {
  const { address } = useAccount();
  const [applications, setApplications] = useState<InsuranceApplication[]>([]);

  const createApplication = async (
    plantationId: bigint,
    insuranceType: InsuranceApplication['insuranceType'],
    coverageAmount: bigint,
    premium: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected');
    const application = createInsuranceApplication(address, plantationId, insuranceType, coverageAmount, premium);
    setApplications([...applications, application]);
  };

  return { applications, createApplication, address };
}
