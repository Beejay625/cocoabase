import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createExportCertificate,
  type ExportCertificate,
} from '@/lib/onchain-farm-export-certification-utils';

export function useOnchainFarmExportCertification() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [certificates, setCertificates] = useState<ExportCertificate[]>([]);

  const issueCertificate = async (
    contractAddress: Address,
    productId: bigint,
    destinationCountry: string,
    validityPeriod: bigint,
    certificationType: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    const certificate = createExportCertificate(
      address,
      productId,
      destinationCountry,
      validityPeriod,
      certificationType
    );
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'productId', type: 'uint256' },
            { name: 'destinationCountry', type: 'string' },
            { name: 'validityPeriod', type: 'uint256' },
            { name: 'certificationType', type: 'string' }
          ],
          name: 'issueCertificate',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'issueCertificate',
      args: [productId, destinationCountry, validityPeriod, certificationType],
    });
    
    setCertificates([...certificates, certificate]);
  };

  return { certificates, issueCertificate, address };
}
