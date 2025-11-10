import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  fileWeatherInsuranceClaim,
  processWeatherInsuranceClaim,
  calculatePayoutAmount,
  isClaimEligible,
  calculateClaimProcessingFee,
  type WeatherInsuranceClaim,
} from '@/lib/onchain-weather-insurance-claims-utils';

/**
 * Hook for onchain weather insurance claims operations
 * Requires Reown wallet connection via useAccount
 */
export function useOnchainWeatherInsuranceClaims() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [claims, setClaims] = useState<WeatherInsuranceClaim[]>([]);
  const [isFiling, setIsFiling] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const fileClaim = async (
    policyId: bigint,
    weatherEvent: WeatherInsuranceClaim['weatherEvent'],
    severity: number,
    damageAmount: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    setIsFiling(true);
    try {
      const claim = fileWeatherInsuranceClaim(
        address,
        policyId,
        weatherEvent,
        severity,
        damageAmount
      );
      setClaims((prev) => [...prev, claim]);
      console.log('Filing weather insurance claim:', claim);
      // Onchain claim filing via smart contract
      await writeContract({
        address: '0x0000000000000000000000000000000000000000' as Address,
        abi: [],
        functionName: 'fileWeatherInsuranceClaim',
        args: [policyId, weatherEvent, severity, damageAmount],
      });
    } finally {
      setIsFiling(false);
    }
  };

  const processClaim = async (
    claimId: bigint,
    approved: boolean,
    payoutAmount?: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    setIsProcessing(true);
    try {
      const claim = claims.find((c) => c.id === claimId);
      if (!claim) throw new Error('Claim not found');
      const processed = processWeatherInsuranceClaim(claim, approved, payoutAmount);
      setClaims((prev) =>
        prev.map((c) => (c.id === claimId ? processed : c))
      );
      console.log('Processing weather insurance claim:', processed);
      // Onchain claim processing via smart contract
      await writeContract({
        address: '0x0000000000000000000000000000000000000000' as Address,
        abi: [],
        functionName: 'processWeatherInsuranceClaim',
        args: [claimId, approved, payoutAmount],
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    claims,
    fileClaim,
    processClaim,
    calculatePayoutAmount,
    isClaimEligible,
    calculateClaimProcessingFee,
    isFiling,
    isProcessing,
    address,
  };
}

