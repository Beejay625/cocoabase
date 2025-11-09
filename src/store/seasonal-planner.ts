import { create } from "zustand";
import {
  persist,
  type PersistOptions,
  createJSONStorage,
} from "zustand/middleware";

export type Season = "spring" | "summer" | "autumn" | "winter";

export type ActivityType =
  | "planting"
  | "harvesting"
  | "pruning"
  | "fertilizing"
  | "irrigation"
  | "pest_control"
  | "maintenance"
  | "other";

export type SeasonalActivity = {
  id: string;
  season: Season;
  year: number;
  activityType: ActivityType;
  title: string;
  description?: string;
  plantationId?: string;
  scheduledDate?: string;
  completedDate?: string;
  priority: "low" | "medium" | "high";
  status: "planned" | "in_progress" | "completed" | "cancelled";
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

export type SeasonalActivityDraft = Omit<
  SeasonalActivity,
  "id" | "createdAt" | "updatedAt"
> & {
  id?: string;
};

type SeasonalPlannerState = {
  activities: SeasonalActivity[];
  addActivity: (draft: SeasonalActivityDraft) => void;
  updateActivity: (
    id: string,
    updates: Partial<SeasonalActivityDraft>
  ) => void;
  removeActivity: (id: string) => void;
  getActivitiesBySeason: (season: Season, year: number) => SeasonalActivity[];
  getUpcomingActivities: (days?: number) => SeasonalActivity[];
};

const generateActivityId = () =>
  `activity_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

export const useSeasonalPlannerStore = create<SeasonalPlannerState>()(
  persist(
    (set, get) => ({
      activities: [],

      addActivity: (draft) => {
        const now = new Date().toISOString();
        const activity: SeasonalActivity = {
          ...draft,
          id: draft.id ?? generateActivityId(),
          createdAt: now,
          updatedAt: now,
        };
        set((state) => ({
          activities: [...state.activities, activity],
        }));
      },

      updateActivity: (id, updates) => {
        set((state) => ({
          activities: state.activities.map((activity) =>
            activity.id === id
              ? {
                  ...activity,
                  ...updates,
                  updatedAt: new Date().toISOString(),
                }
              : activity
          ),
        }));
      },

      removeActivity: (id) => {
        set((state) => ({
          activities: state.activities.filter(
            (activity) => activity.id !== id
          ),
        }));
      },

      getActivitiesBySeason: (season, year) => {
        return get()
          .activities.filter(
            (activity) => activity.season === season && activity.year === year
          )
          .sort((a, b) => {
            if (a.scheduledDate && b.scheduledDate) {
              return (
                new Date(a.scheduledDate).getTime() -
                new Date(b.scheduledDate).getTime()
              );
            }
            return 0;
          });
      },

      getUpcomingActivities: (days = 30) => {
        const threshold = new Date();
        threshold.setDate(threshold.getDate() + days);
        return get()
          .activities.filter((activity) => {
            if (
              activity.status === "completed" ||
              activity.status === "cancelled"
            )
              return false;
            if (!activity.scheduledDate) return false;
            const scheduled = new Date(activity.scheduledDate);
            return scheduled >= new Date() && scheduled <= threshold;
          })
          .sort(
            (a, b) =>
              new Date(a.scheduledDate!).getTime() -
              new Date(b.scheduledDate!).getTime()
          );
      },
    }),
    {
      name: "cocoa-chain-seasonal-planner",
      storage: createJSONStorage(() => localStorage),
    } as PersistOptions<SeasonalPlannerState>
  )
);

