import { useState } from 'react';
import { useAccount } from 'wagmi';
import {
  recordPesticideApplication,
  type PesticideApplication,
} from '@/lib/onchain-pesticide-application-records-utils';

export function useOnchainPesticideApplicationRecords() {
  const { address } = useAccount();
  const [applications, setApplications] = useState<PesticideApplication[]>([]);

  const record = async (
    plantationId: bigint,
    pesticideType: string,
    quantity: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected');
    const application = recordPesticideApplication(address, plantationId, pesticideType, quantity);
    setApplications([...applications, application]);
  };

  return { applications, record, address };
}
