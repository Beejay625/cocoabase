import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createApplication,
  type Application,
} from '@/lib/onchain-farm-fertilizer-application-utils';

export function useOnchainFarmFertilizerApplication() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [applications, setApplications] = useState<Application[]>([]);

  const recordApplication = async (
    contractAddress: Address,
    plantationId: bigint,
    fertilizerType: string,
    amount: bigint,
    organic: boolean
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    const application = createApplication(address, plantationId, fertilizerType, amount, organic);
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'plantationId', type: 'uint256' },
            { name: 'fertilizerType', type: 'string' },
            { name: 'amount', type: 'uint256' },
            { name: 'organic', type: 'bool' }
          ],
          name: 'recordApplication',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'recordApplication',
      args: [plantationId, fertilizerType, amount, organic],
    });
    
    setApplications([...applications, application]);
  };

  return { applications, recordApplication, address };
}

