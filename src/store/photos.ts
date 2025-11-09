import { create } from "zustand";
import {
  persist,
  type PersistOptions,
  createJSONStorage,
} from "zustand/middleware";

export type PhotoCategory =
  | "plantation"
  | "harvest"
  | "equipment"
  | "soil"
  | "pest_disease"
  | "other";

export type PlantationPhoto = {
  id: string;
  url: string;
  thumbnailUrl?: string;
  category: PhotoCategory;
  plantationId?: string;
  taskId?: string;
  title?: string;
  description?: string;
  tags: string[];
  takenDate: string;
  uploadedAt: string;
  fileSize?: number;
  createdAt: string;
};

export type PlantationPhotoDraft = Omit<
  PlantationPhoto,
  "id" | "createdAt" | "uploadedAt"
> & {
  id?: string;
};

type PhotoState = {
  photos: PlantationPhoto[];
  addPhoto: (draft: PlantationPhotoDraft) => void;
  updatePhoto: (id: string, updates: Partial<PlantationPhotoDraft>) => void;
  removePhoto: (id: string) => void;
  getPhotosByPlantation: (plantationId: string) => PlantationPhoto[];
  getPhotosByCategory: (category: PhotoCategory) => PlantationPhoto[];
  searchPhotos: (query: string) => PlantationPhoto[];
};

const generatePhotoId = () =>
  `photo_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

export const usePhotoStore = create<PhotoState>()(
  persist(
    (set, get) => ({
      photos: [],

      addPhoto: (draft) => {
        const now = new Date().toISOString();
        const photo: PlantationPhoto = {
          ...draft,
          id: draft.id ?? generatePhotoId(),
          tags: draft.tags || [],
          uploadedAt: now,
          createdAt: now,
        };
        set((state) => ({
          photos: [...state.photos, photo],
        }));
      },

      updatePhoto: (id, updates) => {
        set((state) => ({
          photos: state.photos.map((photo) =>
            photo.id === id ? { ...photo, ...updates } : photo
          ),
        }));
      },

      removePhoto: (id) => {
        set((state) => ({
          photos: state.photos.filter((photo) => photo.id !== id),
        }));
      },

      getPhotosByPlantation: (plantationId) => {
        return get().photos.filter(
          (photo) => photo.plantationId === plantationId
        );
      },

      getPhotosByCategory: (category) => {
        return get().photos.filter((photo) => photo.category === category);
      },

      searchPhotos: (query) => {
        const lowerQuery = query.toLowerCase();
        return get().photos.filter(
          (photo) =>
            photo.title?.toLowerCase().includes(lowerQuery) ||
            photo.description?.toLowerCase().includes(lowerQuery) ||
            photo.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
        );
      },
    }),
    {
      name: "cocoa-chain-photos",
      storage: createJSONStorage(() => localStorage),
    } as PersistOptions<PhotoState>
  )
);

