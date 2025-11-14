import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createEncryptionRecord,
  type EncryptionRecord,
} from '@/lib/onchain-farm-livestock-blockchain-encryption-utils';

/**
 * Hook for onchain farm livestock blockchain encryption
 * Uses blockchain wallet for all web3 transactions
 */
export function useOnchainFarmLivestockBlockchainEncryption() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [records, setRecords] = useState<EncryptionRecord[]>([]);

  const encrypt = async (
    animalId: string,
    encryptedData: string,
    encryptionKey: string,
    encryptionDate: bigint,
    algorithm: string
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    const record = createEncryptionRecord(address, animalId, encryptedData, encryptionKey, encryptionDate, algorithm);
    setRecords([...records, record]);
  };

  const decrypt = async (
    contractAddress: Address,
    recordId: string,
    decryptionKey: string
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'decrypt',
      args: [recordId, decryptionKey],
    });
  };

  return { records, encrypt, decrypt, address };
}

