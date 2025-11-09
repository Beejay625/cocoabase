"use client";

import { useEffect } from "react";
import {
  subscribeToPlantationEvents,
  type PlantationEvent,
  usePlantationsStore,
} from "@/store/plantations";
import {
  subscribeToWalletEvents,
  type WalletEvent,
} from "@/store/wallets";
import {
  createStageChangeAlert,
  createTaskDeadlineAlert,
  createWalletActivityAlert,
  dispatchAlert,
} from "@/lib/alerts";

const MS_IN_DAY = 1000 * 60 * 60 * 24;
const DEADLINE_THRESHOLD_MS = MS_IN_DAY; // 24 hours

const handlePlantationEvent = (event: PlantationEvent) => {
  if (event.type === "stage_change") {
    dispatchAlert(
      createStageChangeAlert({
        plantation: event.plantation,
        previousStage: event.previousStage,
        nextStage: event.nextStage,
        note: event.note,
      })
    );
  }
};

const handleWalletEvent = (event: WalletEvent) => {
  switch (event.type) {
    case "connected":
      dispatchAlert(
        createWalletActivityAlert({
          address: event.address,
          activity: "connected",
        })
      );
      break;
    case "disconnected":
      if (event.address) {
        dispatchAlert(
          createWalletActivityAlert({
            address: event.address,
            activity: "disconnected",
          })
        );
      }
      break;
    case "watch_added":
      dispatchAlert(
        createWalletActivityAlert({
          address: event.address,
          activity: "watch_added",
          label: event.label,
        })
      );
      break;
    case "watch_removed":
      dispatchAlert(
        createWalletActivityAlert({
          address: event.address,
          activity: "watch_removed",
        })
      );
      break;
    default:
      break;
  }
};

const scanTaskDeadlines = () => {
  const plantations = usePlantationsStore.getState().plantations;
  const now = Date.now();
  const soonThreshold = now + DEADLINE_THRESHOLD_MS;

  plantations.forEach((plantation) => {
    plantation.tasks.forEach((task) => {
      if (task.status === "completed") {
        return;
      }

      const dueTime = new Date(task.dueDate).getTime();
      if (Number.isNaN(dueTime)) {
        return;
      }

      if (dueTime < now) {
        const daysOverdue = Math.max(
          1,
          Math.floor((now - dueTime) / MS_IN_DAY)
        );
        dispatchAlert(
          createTaskDeadlineAlert({
            plantation,
            task,
            threshold: "overdue",
            daysOverdue,
          })
        );
        return;
      }

      if (dueTime >= now && dueTime <= soonThreshold) {
        const daysRemaining = Math.max(
          0,
          Math.ceil((dueTime - now) / MS_IN_DAY)
        );
        dispatchAlert(
          createTaskDeadlineAlert({
            plantation,
            task,
            threshold: "due_soon",
            daysRemaining,
          })
        );
      }
    });
  });
};

export default function AlertManager() {
  const plantations = usePlantationsStore((state) => state.plantations);

  useEffect(() => {
    const unsubscribePlantations = subscribeToPlantationEvents(
      handlePlantationEvent
    );
    const unsubscribeWallets = subscribeToWalletEvents(handleWalletEvent);

    return () => {
      unsubscribePlantations();
      unsubscribeWallets();
    };
  }, []);

  useEffect(() => {
    scanTaskDeadlines();
    const interval = window.setInterval(scanTaskDeadlines, DEADLINE_THRESHOLD_MS);

    return () => {
      window.clearInterval(interval);
    };
  }, [plantations]);

  return null;
}


