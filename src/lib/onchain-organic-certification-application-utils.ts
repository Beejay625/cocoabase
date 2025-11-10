import { type Address } from 'viem';

export interface OrganicCertificationApplication {
  id: bigint;
  applicant: Address;
  plantationId: bigint;
  certificationBody: string;
  applicationDate: bigint;
  status: 'pending' | 'under-review' | 'approved' | 'rejected';
  txHash: string;
}

export function createOrganicCertificationApplication(
  applicant: Address,
  plantationId: bigint,
  certificationBody: string
): OrganicCertificationApplication {
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

export function approveCertification(
  application: OrganicCertificationApplication
): OrganicCertificationApplication {
  return {
    ...application,
    status: 'approved',
  };
}

export function rejectCertification(
  application: OrganicCertificationApplication
): OrganicCertificationApplication {
  return {
    ...application,
    status: 'rejected',
  };
}

export function getPendingApplications(
  applications: OrganicCertificationApplication[]
): OrganicCertificationApplication[] {
  return applications.filter((a) => a.status === 'pending' || a.status === 'under-review');
}
