import { useState } from 'react';
import { useAccount } from 'wagmi';
import type { Address } from 'viem';
import {
  createContract,
  type Contract,
} from '@/lib/onchain-agricultural-contract-management-utils';

export function useOnchainAgriculturalContractManagement() {
  const { address } = useAccount();
  const [contracts, setContracts] = useState<Contract[]>([]);

  const create = async (
    contractType: string,
    counterparty: Address,
    endDate: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected');
    const contract = createContract(address, contractType, counterparty, endDate);
    setContracts([...contracts, contract]);
  };

  return { contracts, create, address };
}
