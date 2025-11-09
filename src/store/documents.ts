import { create } from "zustand";
import {
  persist,
  type PersistOptions,
  createJSONStorage,
} from "zustand/middleware";

export type DocumentType =
  | "contract"
  | "certificate"
  | "receipt"
  | "invoice"
  | "permit"
  | "other";

export type Document = {
  id: string;
  name: string;
  type: DocumentType;
  fileUrl?: string;
  fileSize?: number;
  plantationId?: string;
  description?: string;
  tags: string[];
  uploadedAt: string;
  expiresAt?: string;
  createdAt: string;
  updatedAt: string;
};

export type DocumentDraft = Omit<
  Document,
  "id" | "createdAt" | "updatedAt" | "uploadedAt"
> & {
  id?: string;
};

type DocumentState = {
  documents: Document[];
  addDocument: (draft: DocumentDraft) => void;
  updateDocument: (id: string, updates: Partial<DocumentDraft>) => void;
  removeDocument: (id: string) => void;
  getDocumentsByType: (type: DocumentType) => Document[];
  getDocumentsByPlantation: (plantationId: string) => Document[];
  searchDocuments: (query: string) => Document[];
};

const generateDocumentId = () =>
  `doc_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

export const useDocumentStore = create<DocumentState>()(
  persist(
    (set, get) => ({
      documents: [],

      addDocument: (draft) => {
        const now = new Date().toISOString();
        const document: Document = {
          ...draft,
          id: draft.id ?? generateDocumentId(),
          tags: draft.tags || [],
          uploadedAt: now,
          createdAt: now,
          updatedAt: now,
        };
        set((state) => ({
          documents: [...state.documents, document],
        }));
      },

      updateDocument: (id, updates) => {
        set((state) => ({
          documents: state.documents.map((doc) =>
            doc.id === id
              ? { ...doc, ...updates, updatedAt: new Date().toISOString() }
              : doc
          ),
        }));
      },

      removeDocument: (id) => {
        set((state) => ({
          documents: state.documents.filter((doc) => doc.id !== id),
        }));
      },

      getDocumentsByType: (type) => {
        return get().documents.filter((doc) => doc.type === type);
      },

      getDocumentsByPlantation: (plantationId) => {
        return get().documents.filter(
          (doc) => doc.plantationId === plantationId
        );
      },

      searchDocuments: (query) => {
        const lowerQuery = query.toLowerCase();
        return get().documents.filter(
          (doc) =>
            doc.name.toLowerCase().includes(lowerQuery) ||
            doc.description?.toLowerCase().includes(lowerQuery) ||
            doc.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
        );
      },
    }),
    {
      name: "cocoa-chain-documents",
      storage: createJSONStorage(() => localStorage),
    } as PersistOptions<DocumentState>
  )
);

