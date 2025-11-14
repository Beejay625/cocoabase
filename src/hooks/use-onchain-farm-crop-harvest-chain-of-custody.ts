import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createCustodyTransfer,
  type CustodyTransfer,
} from '@/lib/onchain-farm-crop-harvest-chain-of-custody-utils';

/**
 * Hook for onchain farm crop harvest chain of custody
 * Uses blockchain wallet for all web3 transactions
 */
export function useOnchainFarmCropHarvestChainOfCustody() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [transfers, setTransfers] = useState<CustodyTransfer[]>([]);

  const transferCustody = async (
    harvestId: string,
    fromParty: Address,
    toParty: Address,
    transferDate: bigint,
    reason: string
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    const transfer = createCustodyTransfer(address, harvestId, fromParty, toParty, transferDate, reason);
    setTransfers([...transfers, transfer]);
  };

  const verifyCustody = async (
    contractAddress: Address,
    transferId: string
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'verifyCustody',
      args: [transferId],
    });
  };

  return { transfers, transferCustody, verifyCustody, address };
}

