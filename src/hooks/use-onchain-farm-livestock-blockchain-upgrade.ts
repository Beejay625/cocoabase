import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createUpgradeRecord,
  type UpgradeRecord,
} from '@/lib/onchain-farm-livestock-blockchain-upgrade-utils';

/**
 * Hook for onchain farm livestock blockchain upgrade
 * Uses blockchain wallet for all web3 transactions
 */
export function useOnchainFarmLivestockBlockchainUpgrade() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [records, setRecords] = useState<UpgradeRecord[]>([]);

  const upgrade = async (
    animalId: string,
    oldVersion: string,
    newVersion: string,
    upgradeDate: bigint,
    upgradeReason: string
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    const record = createUpgradeRecord(address, animalId, oldVersion, newVersion, upgradeDate, upgradeReason);
    setRecords([...records, record]);
  };

  const verifyUpgrade = async (
    contractAddress: Address,
    recordId: string
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'verifyUpgrade',
      args: [recordId],
    });
  };

  return { records, upgrade, verifyUpgrade, address };
}

