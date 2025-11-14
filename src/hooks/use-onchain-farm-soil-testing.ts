import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createSoilTest,
  type SoilTest,
} from '@/lib/onchain-farm-soil-testing-utils';

export function useOnchainFarmSoilTesting() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [tests, setTests] = useState<SoilTest[]>([]);

  const recordTest = async (
    contractAddress: Address,
    plantationId: bigint,
    phLevel: bigint,
    nitrogenLevel: bigint,
    phosphorusLevel: bigint,
    potassiumLevel: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    const test = createSoilTest(address, plantationId, phLevel, nitrogenLevel, phosphorusLevel, potassiumLevel);
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'plantationId', type: 'uint256' },
            { name: 'phLevel', type: 'uint256' },
            { name: 'nitrogenLevel', type: 'uint256' },
            { name: 'phosphorusLevel', type: 'uint256' },
            { name: 'potassiumLevel', type: 'uint256' }
          ],
          name: 'recordTest',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'recordTest',
      args: [plantationId, phLevel, nitrogenLevel, phosphorusLevel, potassiumLevel],
    });
    
    setTests([...tests, test]);
  };

  return { tests, recordTest, address };
}
