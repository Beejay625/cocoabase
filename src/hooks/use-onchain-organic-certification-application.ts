import { useState } from 'react';
import { useAccount } from 'wagmi';
import {
  createOrganicCertificationApplication,
  type OrganicCertificationApplication,
} from '@/lib/onchain-organic-certification-application-utils';

export function useOnchainOrganicCertificationApplication() {
  const { address } = useAccount();
  const [applications, setApplications] = useState<OrganicCertificationApplication[]>([]);

  const createApplication = async (
    plantationId: bigint,
    certificationBody: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected');
    const application = createOrganicCertificationApplication(address, plantationId, certificationBody);
    setApplications([...applications, application]);
  };

  return { applications, createApplication, address };
}
