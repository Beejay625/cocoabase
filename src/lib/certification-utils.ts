export type CertificationType =
  | "organic"
  | "fair-trade"
  | "rainforest-alliance"
  | "utz"
  | "iso"
  | "custom";

export type CertificationStatus = "pending" | "active" | "expired" | "revoked" | "renewal-due";

export interface Certification {
  id: string;
  type: CertificationType;
  name: string;
  issuer: string;
  certificateNumber: string;
  issuedDate: Date;
  expiryDate: Date;
  status: CertificationStatus;
  plantationIds: string[];
  documents: string[];
  notes?: string;
}

export const isCertificationValid = (certification: Certification): boolean => {
  if (certification.status !== "active") return false;
  return new Date(certification.expiryDate) > new Date();
};

export const isCertificationExpiringSoon = (
  certification: Certification,
  daysAhead: number = 90
): boolean => {
  if (!isCertificationValid(certification)) return false;
  const expiryDate = new Date(certification.expiryDate);
  const warningDate = new Date();
  warningDate.setDate(warningDate.getDate() + daysAhead);
  return expiryDate <= warningDate;
};

export const getDaysUntilExpiry = (certification: Certification): number => {
  const expiryDate = new Date(certification.expiryDate);
  const today = new Date();
  const diffTime = expiryDate.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const getCertificationStatus = (certification: Certification): CertificationStatus => {
  if (certification.status === "revoked") return "revoked";
  
  const expiryDate = new Date(certification.expiryDate);
  const today = new Date();
  
  if (expiryDate < today) {
    return "expired";
  }
  
  if (isCertificationExpiringSoon(certification, 90)) {
    return "renewal-due";
  }
  
  return certification.status === "pending" ? "pending" : "active";
};

export const getCertificationsByStatus = (
  certifications: Certification[]
): Record<CertificationStatus, Certification[]> => {
  return certifications.reduce(
    (acc, cert) => {
      const status = getCertificationStatus(cert);
      if (!acc[status]) {
        acc[status] = [];
      }
      acc[status].push(cert);
      return acc;
    },
    {} as Record<CertificationStatus, Certification[]>
  );
};

export const getCertificationsByType = (
  certifications: Certification[]
): Record<CertificationType, Certification[]> => {
  return certifications.reduce(
    (acc, cert) => {
      if (!acc[cert.type]) {
        acc[cert.type] = [];
      }
      acc[cert.type].push(cert);
      return acc;
    },
    {} as Record<CertificationType, Certification[]>
  );
};

export const getCertificationSummary = (certifications: Certification[]): {
  total: number;
  active: number;
  expired: number;
  expiringSoon: number;
  pending: number;
} => {
  const statuses = getCertificationsByStatus(certifications);
  
  return {
    total: certifications.length,
    active: statuses.active?.length || 0,
    expired: statuses.expired?.length || 0,
    expiringSoon: statuses["renewal-due"]?.length || 0,
    pending: statuses.pending?.length || 0,
  };
};

export const formatCertificationType = (type: CertificationType): string => {
  const labels: Record<CertificationType, string> = {
    organic: "Organic",
    "fair-trade": "Fair Trade",
    "rainforest-alliance": "Rainforest Alliance",
    utz: "UTZ Certified",
    iso: "ISO Certified",
    custom: "Custom",
  };
  return labels[type];
};

