"use client";

import { useEffect } from "react";
import { usePlantationsStore } from "@/store/plantations";

const SCHEDULER_INTERVAL_MS = 1000 * 60 * 10; // 10 minutes

export default function RecurringTaskScheduler() {
  const processRecurringTemplates = usePlantationsStore(
    (state) => state.processRecurringTemplates
  );

  useEffect(() => {
    processRecurringTemplates();
    const intervalId = window.setInterval(
      () => processRecurringTemplates(),
      SCHEDULER_INTERVAL_MS
    );

    return () => {
      window.clearInterval(intervalId);
    };
  }, [processRecurringTemplates]);

  return null;
}


