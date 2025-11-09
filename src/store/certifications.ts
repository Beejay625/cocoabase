import { create } from "zustand";
import {
  persist,
  type PersistOptions,
  createJSONStorage,
} from "zustand/middleware";

export type CertificationType =
  | "organic"
  | "fair_trade"
  | "rainforest_alliance"
  | "utz"
  | "iso"
  | "other";

export type CertificationStatus = "pending" | "active" | "expired" | "revoked";

export type Certification = {
  id: string;
  type: CertificationType;
  name: string;
  issuer: string;
  certificateNumber: string;
  issueDate: string;
  expiryDate: string;
  status: CertificationStatus;
  plantationId?: string;
  documentUrl?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

export type CertificationDraft = Omit<
  Certification,
  "id" | "createdAt" | "updatedAt"
> & {
  id?: string;
};

type CertificationState = {
  certifications: Certification[];
  addCertification: (draft: CertificationDraft) => void;
  updateCertification: (id: string, updates: Partial<CertificationDraft>) => void;
  removeCertification: (id: string) => void;
  getCertificationsByType: (type: CertificationType) => Certification[];
  getCertificationsByStatus: (
    status: CertificationStatus
  ) => Certification[];
  getExpiringSoon: (days?: number) => Certification[];
};

const generateCertificationId = () =>
  `cert_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

export const useCertificationStore = create<CertificationState>()(
  persist(
    (set, get) => ({
      certifications: [],

      addCertification: (draft) => {
        const now = new Date().toISOString();
        const status: CertificationStatus =
          new Date(draft.expiryDate) < new Date() ? "expired" : "active";
        const certification: Certification = {
          ...draft,
          id: draft.id ?? generateCertificationId(),
          status,
          createdAt: now,
          updatedAt: now,
        };
        set((state) => ({
          certifications: [...state.certifications, certification],
        }));
      },

      updateCertification: (id, updates) => {
        set((state) => ({
          certifications: state.certifications.map((cert) =>
            cert.id === id
              ? { ...cert, ...updates, updatedAt: new Date().toISOString() }
              : cert
          ),
        }));
      },

      removeCertification: (id) => {
        set((state) => ({
          certifications: state.certifications.filter((cert) => cert.id !== id),
        }));
      },

      getCertificationsByType: (type) => {
        return get().certifications.filter((cert) => cert.type === type);
      },

      getCertificationsByStatus: (status) => {
        return get().certifications.filter((cert) => cert.status === status);
      },

      getExpiringSoon: (days = 30) => {
        const threshold = new Date();
        threshold.setDate(threshold.getDate() + days);
        return get().certifications.filter((cert) => {
          if (cert.status !== "active") return false;
          const expiryDate = new Date(cert.expiryDate);
          return expiryDate <= threshold && expiryDate >= new Date();
        });
      },
    }),
    {
      name: "cocoa-chain-certifications",
      storage: createJSONStorage(() => localStorage),
    } as PersistOptions<CertificationState>
  )
);

