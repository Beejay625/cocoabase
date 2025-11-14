import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createFuturesContract,
  type FuturesContract,
} from '@/lib/onchain-farm-harvest-futures-utils';

export function useOnchainFarmHarvestFutures() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [contracts, setContracts] = useState<FuturesContract[]>([]);

  const createFuturesContractAction = async (
    contractAddress: Address,
    plantationId: bigint,
    buyer: Address,
    expectedYield: bigint,
    pricePerUnit: bigint,
    deliveryDate: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    const futuresContract = createFuturesContract(
      address,
      plantationId,
      buyer,
      expectedYield,
      pricePerUnit,
      deliveryDate
    );
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'plantationId', type: 'uint256' },
            { name: 'buyer', type: 'address' },
            { name: 'expectedYield', type: 'uint256' },
            { name: 'pricePerUnit', type: 'uint256' },
            { name: 'deliveryDate', type: 'uint256' }
          ],
          name: 'createFuturesContract',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'createFuturesContract',
      args: [plantationId, buyer, expectedYield, pricePerUnit, deliveryDate],
    });
    
    setContracts([...contracts, futuresContract]);
  };

  const deliverHarvest = async (
    contractAddress: Address,
    contractId: bigint,
    actualYield: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'contractId', type: 'uint256' },
            { name: 'actualYield', type: 'uint256' }
          ],
          name: 'deliverHarvest',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'deliverHarvest',
      args: [contractId, actualYield],
    });
  };

  return { contracts, createFuturesContractAction, deliverHarvest, address };
}
