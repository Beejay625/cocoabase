import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createAttestation,
  type Attestation,
} from '@/lib/onchain-farm-crop-harvest-blockchain-attestation-utils';

/**
 * Hook for onchain farm crop harvest blockchain attestation
 * Uses blockchain wallet for all web3 transactions
 */
export function useOnchainFarmCropHarvestBlockchainAttestation() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [attestations, setAttestations] = useState<Attestation[]>([]);

  const attest = async (
    harvestId: string,
    attester: Address,
    statement: string,
    attestationDate: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    const attestation = createAttestation(address, harvestId, attester, statement, attestationDate);
    setAttestations([...attestations, attestation]);
  };

  const verifyAttestation = async (
    contractAddress: Address,
    attestationId: string
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'verifyAttestation',
      args: [attestationId],
    });
  };

  return { attestations, attest, verifyAttestation, address };
}

