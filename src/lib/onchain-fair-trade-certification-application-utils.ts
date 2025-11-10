import { type Address } from 'viem';

export interface FairTradeCertificationApplication {
  id: bigint;
  applicant: Address;
  plantationId: bigint;
  certificationBody: string;
  applicationDate: bigint;
  status: 'pending' | 'under-review' | 'approved' | 'rejected';
  txHash: string;
}

export function createFairTradeCertificationApplication(
  applicant: Address,
  plantationId: bigint,
  certificationBody: string
): FairTradeCertificationApplication {
  return {
    id: BigInt(Date.now()),
    applicant,
    plantationId,
    certificationBody,
    applicationDate: BigInt(Date.now()),
    status: 'pending',
    txHash: '',
  };
}

export function approveFairTradeCertification(
  application: FairTradeCertificationApplication
): FairTradeCertificationApplication {
  return {
    ...application,
    status: 'approved',
  };
}

export function getApprovedCertifications(
  applications: FairTradeCertificationApplication[]
): FairTradeCertificationApplication[] {
  return applications.filter((a) => a.status === 'approved');
}

export function getPendingFairTradeApplications(
  applications: FairTradeCertificationApplication[]
): FairTradeCertificationApplication[] {
  return applications.filter((a) => a.status === 'pending' || a.status === 'under-review');
}
