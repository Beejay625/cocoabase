import { useState } from 'react';
import { useAccount } from 'wagmi';
import type { Address } from 'viem';
import {
  createRiskAssessment,
  getHighRisk,
  getAssessmentsByType,
  getRecentAssessments,
  type RiskAssessment,
} from '@/lib/onchain-farm-risk-assessment-system-utils';

export function useOnchainFarmRiskAssessmentSystem() {
  const { address } = useAccount();
  const [assessments, setAssessments] = useState<RiskAssessment[]>([]);
  const [isAssessing, setIsAssessing] = useState(false);

  const assess = async (
    riskType: 'weather' | 'market' | 'disease' | 'financial',
    level: 'low' | 'medium' | 'high' | 'critical'
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    setIsAssessing(true);
    try {
      const assessment = createRiskAssessment(address, riskType, level);
      setAssessments((prev) => [...prev, assessment]);
      console.log('Creating risk assessment:', assessment);
    } finally {
      setIsAssessing(false);
    }
  };

  return {
    assessments,
    assess,
    getHighRisk,
    getAssessmentsByType,
    getRecentAssessments,
    isAssessing,
    address,
  };
}
