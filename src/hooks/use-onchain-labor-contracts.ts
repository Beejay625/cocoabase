import { useState } from 'react';
import { useAccount } from 'wagmi';
import type { Address } from 'viem';
import {
  createLaborContract,
  type LaborContract,
} from '@/lib/onchain-labor-contracts-utils';

export function useOnchainLaborContracts() {
  const { address } = useAccount();
  const [contracts, setContracts] = useState<LaborContract[]>([]);

  const createContract = async (
    worker: Address,
    role: string,
    hourlyRate: bigint,
    startDate: bigint,
    endDate: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected');
    const contract = createLaborContract(
      address,
      worker,
      role,
      hourlyRate,
      startDate,
      endDate
    );
    setContracts([...contracts, contract]);
  };

  return { contracts, createContract, address };
}
