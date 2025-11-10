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
