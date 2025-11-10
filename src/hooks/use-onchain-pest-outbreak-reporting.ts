import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createPestOutbreakReport,
  confirmPestOutbreak,
  containOutbreak,
  resolveOutbreak,
  calculateOutbreakRisk,
  isOutbreakUrgent,
  type PestOutbreak,
} from '@/lib/onchain-pest-outbreak-reporting-utils';

/**
 * Hook for onchain pest outbreak reporting operations
 * Requires Reown wallet connection via useAccount
 */
export function useOnchainPestOutbreakReporting() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [outbreaks, setOutbreaks] = useState<PestOutbreak[]>([]);
  const [isReporting, setIsReporting] = useState(false);

  const reportOutbreak = async (
    location: string,
    pestType: string,
    severity: PestOutbreak['severity'],
    affectedArea: bigint,
    description: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    setIsReporting(true);
    try {
      const outbreak = createPestOutbreakReport(
        address,
        location,
        pestType,
        severity,
        affectedArea,
        description
      );
      setOutbreaks((prev) => [...prev, outbreak]);
      console.log('Reporting pest outbreak:', outbreak);
      // Onchain reporting via smart contract
      await writeContract({
        address: '0x0000000000000000000000000000000000000000' as Address,
        abi: [],
        functionName: 'reportPestOutbreak',
        args: [location, pestType, severity, affectedArea, description],
      });
    } finally {
      setIsReporting(false);
    }
  };

  const confirmOutbreak = async (outbreakId: bigint): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    try {
      const outbreak = outbreaks.find((o) => o.id === outbreakId);
      if (!outbreak) throw new Error('Outbreak not found');
      const confirmed = confirmPestOutbreak(outbreak);
      setOutbreaks((prev) =>
        prev.map((o) => (o.id === outbreakId ? confirmed : o))
      );
      console.log('Confirming pest outbreak:', { outbreakId });
      // Onchain confirmation via smart contract
      await writeContract({
        address: '0x0000000000000000000000000000000000000000' as Address,
        abi: [],
        functionName: 'confirmPestOutbreak',
        args: [outbreakId],
      });
    } finally {
      // Confirmation complete
    }
  };

  const resolveOutbreakReport = async (outbreakId: bigint): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    try {
      const outbreak = outbreaks.find((o) => o.id === outbreakId);
      if (!outbreak) throw new Error('Outbreak not found');
      const resolved = resolveOutbreak(outbreak);
      setOutbreaks((prev) =>
        prev.map((o) => (o.id === outbreakId ? resolved : o))
      );
      console.log('Resolving pest outbreak:', { outbreakId });
      // Onchain resolution via smart contract
      await writeContract({
        address: '0x0000000000000000000000000000000000000000' as Address,
        abi: [],
        functionName: 'resolvePestOutbreak',
        args: [outbreakId],
      });
    } finally {
      // Resolution complete
    }
  };

  return {
    outbreaks,
    reportOutbreak,
    confirmOutbreak,
    resolveOutbreakReport,
    containOutbreak,
    calculateOutbreakRisk,
    isOutbreakUrgent,
    isReporting,
    address,
  };
}

