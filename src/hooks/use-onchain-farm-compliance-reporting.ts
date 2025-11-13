import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createComplianceReport,
  type ComplianceReport,
} from '@/lib/onchain-farm-compliance-reporting-utils';

/**
 * Hook for onchain farm compliance reporting
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmComplianceReporting() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [reports, setReports] = useState<ComplianceReport[]>([]);

  const submitReport = async (
    contractAddress: Address,
    reportType: string,
    data: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'reportType', type: 'string' },
            { name: 'data', type: 'string' }
          ],
          name: 'submitReport',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'submitReport',
      args: [reportType, data],
    });
  };

  return { 
    reports, 
    submitReport, 
    address 
  };
}
