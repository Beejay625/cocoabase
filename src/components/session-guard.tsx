"use client";

import { startTransition, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useSecurityStore } from "@/store/security";
import { cn } from "@/lib/cn";

const INACTIVITY_EVENTS: Array<keyof WindowEventMap> = [
  "mousemove",
  "mousedown",
  "keydown",
  "touchstart",
  "focus",
  "scroll",
];

export default function SessionGuard() {
  const settings = useSecurityStore((state) => state.settings);
  const locked = useSecurityStore((state) => state.locked);
  const lastActivityAt = useSecurityStore((state) => state.lastActivityAt);
  const recordActivity = useSecurityStore((state) => state.recordActivity);
  const lockSession = useSecurityStore((state) => state.lockSession);
  const unlockSession = useSecurityStore((state) => state.unlockSession);

  const [showCountdown, setShowCountdown] = useState(false);
  const [countdownSeconds, setCountdownSeconds] = useState<number | null>(null);

  const timeoutMs = useMemo(
    () => Math.max(1, settings.sessionTimeoutMinutes) * 60 * 1000,
    [settings.sessionTimeoutMinutes]
  );

  const warningThresholdMs = Math.min(timeoutMs / 3, 60_000);
  const timerRef = useRef<number | null>(null);
  const countdownRef = useRef<number | null>(null);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        recordActivity();
      }
    };

    const handleActivity = () => {
      if (locked) {
        return;
      }
      recordActivity();
    };

    INACTIVITY_EVENTS.forEach((eventName) => {
      window.addEventListener(eventName, handleActivity, { passive: true });
    });
    document.addEventListener("visibilitychange", handleVisibility);

    recordActivity();

    return () => {
      INACTIVITY_EVENTS.forEach((eventName) => {
        window.removeEventListener(eventName, handleActivity);
      });
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [locked, recordActivity]);

  useEffect(() => {
    if (countdownRef.current) {
      window.clearInterval(countdownRef.current);
      countdownRef.current = null;
    }
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    startTransition(() => {
      setShowCountdown(false);
      setCountdownSeconds(null);
    });

    if (locked) {
      return;
    }

    if (!lastActivityAt) {
      recordActivity();
      return;
    }

    const scheduleCountdown = (initialMs: number) => {
      const initialSeconds = Math.max(0, Math.ceil(initialMs / 1000));
      startTransition(() => {
        setShowCountdown(true);
        setCountdownSeconds(initialSeconds);
      });
      if (countdownRef.current) {
        window.clearInterval(countdownRef.current);
      }
      countdownRef.current = window.setInterval(() => {
        setCountdownSeconds((prev) => {
          if (prev === null) {
            return prev;
          }
          if (prev <= 1) {
            window.clearInterval(countdownRef.current!);
            countdownRef.current = null;
            lockSession();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    };

    const lastActivityTime = new Date(lastActivityAt).getTime();
    const now = Date.now();
    const timeSinceActivity = now - lastActivityTime;
    const remainingMs = timeoutMs - timeSinceActivity;

    if (remainingMs <= 0) {
      lockSession();
      return;
    }

    if (remainingMs <= warningThresholdMs) {
      scheduleCountdown(remainingMs);
    } else {
      const warningDelay = remainingMs - warningThresholdMs;
      timerRef.current = window.setTimeout(() => {
        scheduleCountdown(warningThresholdMs);
      }, warningDelay);
    }

    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      if (countdownRef.current) {
        window.clearInterval(countdownRef.current);
        countdownRef.current = null;
      }
    };
  }, [
    locked,
    lastActivityAt,
    timeoutMs,
    warningThresholdMs,
    lockSession,
    recordActivity,
  ]);

  const handleUnlock = () => {
    unlockSession();
  };

  if (!locked && !showCountdown) {
    return null;
  }

  return (
    <>
      {showCountdown && !locked ? (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          className="pointer-events-none fixed bottom-6 right-6 z-40 rounded-2xl border border-amber-200 bg-white/95 px-4 py-3 text-sm text-cocoa-700 shadow-lg backdrop-blur"
        >
          <span className="font-semibold text-amber-700">Session locking soon</span>
          <p className="mt-1 text-xs text-cocoa-500">
            No activity detected. Auto-locking in{" "}
            <span className="font-semibold text-cocoa-900">
              {Math.max(countdownSeconds ?? 0, 0)}s
            </span>
            .
          </p>
        </motion.div>
      ) : null}

      {locked ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-cocoa-900/70 backdrop-blur"
        >
          <div className="w-full max-w-md rounded-3xl border border-cocoa-700 bg-cocoa-950/95 p-8 text-center text-cream-50 shadow-2xl">
            <h2 className="text-xl font-semibold tracking-wide">
              Session Locked
            </h2>
            <p className="mt-3 text-sm text-cream-200/90">
              Your dashboard locked after {settings.sessionTimeoutMinutes} minutes of
              inactivity. Unlock to continue.
            </p>
            <button
              type="button"
              onClick={handleUnlock}
              className={cn(
                "mt-6 w-full rounded-full bg-leaf-500 px-5 py-2 text-sm font-semibold text-cocoa-900 shadow-lg transition",
                "hover:bg-leaf-400 focus:outline-none focus:ring-2 focus:ring-leaf-300 focus:ring-offset-2 focus:ring-offset-cocoa-900"
              )}
            >
              Unlock Session
            </button>
            <p className="mt-4 text-xs text-cream-300/80">
              Tip: enable transaction PIN in the Security Hub to require additional
              verification.
            </p>
          </div>
        </motion.div>
      ) : null}
    </>
  );
}


