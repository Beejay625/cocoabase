import { useState } from 'react';
import { useAccount } from 'wagmi';
import type { Address } from 'viem';
import {
  scheduleAudit,
  type FarmAudit,
} from '@/lib/onchain-farm-audit-management-utils';

export function useOnchainFarmAuditManagement() {
  const { address } = useAccount();
  const [audits, setAudits] = useState<FarmAudit[]>([]);

  const schedule = async (
    plantationId: bigint,
    auditor: Address,
    auditType: FarmAudit['auditType'],
    auditDate: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected');
    const audit = scheduleAudit(address, plantationId, auditor, auditType, auditDate);
    setAudits([...audits, audit]);
  };

  return { audits, schedule, address };
}
