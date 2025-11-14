import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createSignatureRecord,
  type SignatureRecord,
} from '@/lib/onchain-farm-livestock-blockchain-signature-utils';

/**
 * Hook for onchain farm livestock blockchain signature
 * Uses blockchain wallet for all web3 transactions
 */
export function useOnchainFarmLivestockBlockchainSignature() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [records, setRecords] = useState<SignatureRecord[]>([]);

  const sign = async (
    animalId: string,
    signer: Address,
    signature: string,
    message: string,
    signatureDate: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    const record = createSignatureRecord(address, animalId, signer, signature, message, signatureDate);
    setRecords([...records, record]);
  };

  const verifySignature = async (
    contractAddress: Address,
    recordId: string
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'verifySignature',
      args: [recordId],
    });
  };

  return { records, sign, verifySignature, address };
}

