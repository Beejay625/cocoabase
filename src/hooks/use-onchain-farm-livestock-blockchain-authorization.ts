import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createAuthorization,
  type Authorization,
} from '@/lib/onchain-farm-livestock-blockchain-authorization-utils';

/**
 * Hook for onchain farm livestock blockchain authorization
 * Uses blockchain wallet for all web3 transactions
 */
export function useOnchainFarmLivestockBlockchainAuthorization() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [authorizations, setAuthorizations] = useState<Authorization[]>([]);

  const authorize = async (
    animalId: string,
    authorizedAddress: Address,
    action: string,
    authorizationDate: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    const authorization = createAuthorization(address, animalId, authorizedAddress, action, authorizationDate);
    setAuthorizations([...authorizations, authorization]);
  };

  const revokeAuthorization = async (
    contractAddress: Address,
    authorizationId: string
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'revokeAuthorization',
      args: [authorizationId],
    });
  };

  return { authorizations, authorize, revokeAuthorization, address };
}

