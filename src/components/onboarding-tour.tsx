"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";

export type TourStep = {
  id: string;
  target: string;
  title: string;
  description: string;
  position?: "top" | "bottom" | "left" | "right" | "center";
};

const defaultTourSteps: TourStep[] = [
  {
    id: "welcome",
    target: "tour-welcome",
    title: "Welcome to Cocoa Chain!",
    description:
      "Track your cocoa plantations, manage tasks, and connect with fellow farmers. Let's take a quick tour of the key features.",
    position: "center",
  },
  {
    id: "plantations",
    target: "tour-plantations",
    title: "Your Plantations",
    description:
      "View all your cocoa plantations here. Each card shows the stage, location, and key metrics. Click to see details and update progress.",
    position: "bottom",
  },
  {
    id: "analytics",
    target: "tour-analytics",
    title: "Analytics Dashboard",
    description:
      "Monitor your plantation performance with detailed analytics, sustainability metrics, and yield forecasts.",
    position: "left",
  },
  {
    id: "tasks",
    target: "tour-tasks",
    title: "Task Management",
    description:
      "Keep track of all plantation tasks. Use the Kanban board to organize work by status, stage, or assignee.",
    position: "right",
  },
  {
    id: "community",
    target: "tour-community",
    title: "Community Features",
    description:
      "Connect with other farmers through help requests, chat rooms, and shared notes. Build your reputation by helping others!",
    position: "top",
  },
  {
    id: "complete",
    target: "tour-complete",
    title: "You're all set!",
    description:
      "Start by planting your first seed, or explore the dashboard to see what's possible. Happy farming!",
    position: "center",
  },
];

type OnboardingTourProps = {
  steps?: TourStep[];
  onComplete?: () => void;
  storageKey?: string;
};

export default function OnboardingTour({
  steps = defaultTourSteps,
  onComplete,
  storageKey = "cocoa-chain-onboarding-completed",
}: OnboardingTourProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [overlayStyle, setOverlayStyle] = useState<{
    top?: number;
    left?: number;
    width?: number;
    height?: number;
  }>({});

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const completed = localStorage.getItem(storageKey);
    if (!completed) {
      setIsVisible(true);
      updateOverlay();
    }
  }, [storageKey]);

  useEffect(() => {
    if (isVisible && currentStep < steps.length) {
      updateOverlay();
      window.addEventListener("resize", updateOverlay);
      window.addEventListener("scroll", updateOverlay, true);
      return () => {
        window.removeEventListener("resize", updateOverlay);
        window.removeEventListener("scroll", updateOverlay, true);
      };
    }
  }, [currentStep, isVisible, steps]);

  const updateOverlay = () => {
    if (currentStep >= steps.length) {
      return;
    }

    const step = steps[currentStep];
    const targetElement = document.querySelector(`[data-tour="${step.target}"]`);

    if (!targetElement) {
      setOverlayStyle({});
      return;
    }

    const rect = targetElement.getBoundingClientRect();
    setOverlayStyle({
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    });
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleComplete = () => {
    setIsVisible(false);
    if (typeof window !== "undefined") {
      localStorage.setItem(storageKey, "true");
    }
    onComplete?.();
  };

  if (!isVisible || currentStep >= steps.length) {
    return null;
  }

  const step = steps[currentStep];
  const isLast = currentStep === steps.length - 1;
  const isFirst = currentStep === 0;

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9998] bg-black/60"
            onClick={handleSkip}
          />
          {overlayStyle.width && overlayStyle.height && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed z-[9999] rounded-lg border-2 border-leaf-400 shadow-lg shadow-leaf-400/50"
              style={{
                top: overlayStyle.top,
                left: overlayStyle.left,
                width: overlayStyle.width,
                height: overlayStyle.height,
                pointerEvents: "none",
              }}
            />
          )}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={cn(
              "fixed z-[10000] max-w-sm rounded-2xl border border-leaf-400/60 bg-[#101f3c] p-6 text-slate-100 shadow-2xl shadow-black/40",
              step.position === "center" && "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
              step.position === "top" && overlayStyle.top && overlayStyle.left && {
                top: overlayStyle.top - 20,
                left: overlayStyle.left + (overlayStyle.width ?? 0) / 2,
                transform: "translate(-50%, -100%)",
              },
              step.position === "bottom" && overlayStyle.top && overlayStyle.left && {
                top: (overlayStyle.top ?? 0) + (overlayStyle.height ?? 0) + 20,
                left: overlayStyle.left + (overlayStyle.width ?? 0) / 2,
                transform: "translateX(-50%)",
              },
              step.position === "left" && overlayStyle.top && overlayStyle.left && {
                top: overlayStyle.top + (overlayStyle.height ?? 0) / 2,
                left: overlayStyle.left - 20,
                transform: "translate(-100%, -50%)",
              },
              step.position === "right" && overlayStyle.top && overlayStyle.left && {
                top: overlayStyle.top + (overlayStyle.height ?? 0) / 2,
                left: (overlayStyle.left ?? 0) + (overlayStyle.width ?? 0) + 20,
                transform: "translateY(-50%)",
              }
            )}
          >
            <div className="mb-4">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">
                  {step.title}
                </h3>
                <span className="text-xs text-slate-400/70">
                  {currentStep + 1} / {steps.length}
                </span>
              </div>
              <p className="text-sm text-slate-300/80">{step.description}</p>
            </div>
            <div className="flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={handleSkip}
                className="rounded-full border border-slate-600/40 bg-slate-900/60 px-4 py-2 text-xs font-semibold text-slate-200/90 transition hover:border-slate-400/60 hover:text-white"
              >
                Skip tour
              </button>
              <div className="flex gap-2">
                {!isFirst && (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="rounded-full border border-slate-600/40 bg-slate-900/60 px-4 py-2 text-xs font-semibold text-slate-200/90 transition hover:border-slate-400/60 hover:text-white"
                  >
                    Previous
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleNext}
                  className="rounded-full bg-leaf-500 px-4 py-2 text-xs font-semibold text-slate-950 shadow-lg transition hover:bg-leaf-400 focus:outline-none focus:ring-2 focus:ring-leaf-300"
                >
                  {isLast ? "Get started" : "Next"}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

