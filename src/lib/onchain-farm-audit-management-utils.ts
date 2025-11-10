import { type Address } from 'viem';

export interface FarmAudit {
  id: bigint;
  owner: Address;
  plantationId: bigint;
  auditor: Address;
  auditType: 'compliance' | 'quality' | 'sustainability' | 'safety';
  auditDate: bigint;
  findings: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'failed';
  txHash: string;
}

export function scheduleAudit(
  owner: Address,
  plantationId: bigint,
  auditor: Address,
  auditType: FarmAudit['auditType'],
  auditDate: bigint
): FarmAudit {
  return {
    id: BigInt(Date.now()),
    owner,
    plantationId,
    auditor,
    auditType,
    auditDate,
    findings: '',
    status: 'scheduled',
    txHash: '',
  };
}

export function completeAudit(
  audit: FarmAudit,
  findings: string
): FarmAudit {
  return {
    ...audit,
    findings,
    status: 'completed',
  };
}

export function getScheduledAudits(
  audits: FarmAudit[],
  currentTime: bigint
): FarmAudit[] {
  return audits.filter(
    (a) => a.status === 'scheduled' && a.auditDate >= currentTime
  );
}

export function getAuditsByType(
  audits: FarmAudit[],
  auditType: FarmAudit['auditType']
): FarmAudit[] {
  return audits.filter((a) => a.auditType === auditType);
}
