import { useState } from 'react';
import { useAccount } from 'wagmi';
import {
  createFairTradeCertificationApplication,
  type FairTradeCertificationApplication,
} from '@/lib/onchain-fair-trade-certification-application-utils';

export function useOnchainFairTradeCertificationApplication() {
  const { address } = useAccount();
  const [applications, setApplications] = useState<FairTradeCertificationApplication[]>([]);

  const createApplication = async (
    plantationId: bigint,
    certificationBody: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected');
    const application = createFairTradeCertificationApplication(address, plantationId, certificationBody);
    setApplications([...applications, application]);
  };

  return { applications, createApplication, address };
}
