import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';

/**
 * Hook for onchain farm certification renewal
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmCertificationRenewal() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [certifications, setCertifications] = useState<any[]>([]);

  const renewCertification = async (
    contractAddress: Address,
    certId: bigint,
    validityPeriod: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'certId', type: 'uint256' },
            { name: 'validityPeriod', type: 'uint256' }
          ],
          name: 'renewCertification',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'renewCertification',
      args: [certId, validityPeriod],
    });
  };

  return { 
    certifications, 
    renewCertification, 
    address 
  };
}
