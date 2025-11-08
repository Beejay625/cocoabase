"use client";

import Modal from "@/components/ui/modal";
import type { Plantation, GrowthStage } from "@/store/plantations";
import { getNextStage } from "@/store/plantations";
import {
  useEffect,
  useMemo,
  useState,
  startTransition,
  type FormEvent,
} from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

type UpdateStatusModalProps = {
  open: boolean;
  onClose: () => void;
  plantation?: Plantation;
  onSubmit: (nextStage: GrowthStage, note?: string) => void;
};

const stageOrder: GrowthStage[] = ["planted", "growing", "harvested"];

const stageCopy: Record<
  GrowthStage,
  { title: string; description: string; emoji: string }
> = {
  planted: {
    title: "Planted",
    description: "Seed is in the soil and ready to sprout.",
    emoji: "🌱",
  },
  growing: {
    title: "Growing",
    description: "Leaves are thriving and progress is visible.",
    emoji: "🌿",
  },
  harvested: {
    title: "Harvested",
    description: "Pods are ready – time to celebrate the harvest!",
    emoji: "🌾",
  },
};

export default function UpdateStatusModal({
  open,
  onClose,
  plantation,
  onSubmit,
}: UpdateStatusModalProps) {
  const [selectedStage, setSelectedStage] = useState<GrowthStage>("planted");
  const [note, setNote] = useState("");

  useEffect(() => {
    if (plantation) {
      const nextStage = getNextStage(plantation.stage);
      startTransition(() => {
        setSelectedStage(nextStage);
        setNote("");
      });
    }
  }, [plantation, open]);

  const availableStages = useMemo(() => {
    if (!plantation) return stageOrder;
    const currentIndex = stageOrder.indexOf(plantation.stage);
    return stageOrder.slice(currentIndex);
  }, [plantation]);

  if (!plantation) {
    return null;
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedStage) {
      return;
    }

    onSubmit(selectedStage, note || undefined);
    onClose();
  };

  const disableSubmit =
    plantation.stage === "harvested" || selectedStage === plantation.stage;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={`Update ${plantation.seedName}`}
      description="Move this plantation to the next growth stage and add an optional note."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <fieldset className="space-y-3">
          <legend className="text-sm font-medium text-cocoa-700">
            Select next stage
          </legend>

          <div className="grid gap-3 sm:grid-cols-3">
            {availableStages.map((stage) => {
              const copy = stageCopy[stage];
              const isSelected = selectedStage === stage;
              const disabled = stage === plantation.stage;

              return (
                <motion.button
                  type="button"
                  key={stage}
                  onClick={() => !disabled && setSelectedStage(stage)}
                  whileHover={disabled ? undefined : { y: -2 }}
                  className={cn(
                    "flex h-full w-full flex-col items-start gap-2 rounded-2xl border px-4 py-3 text-left shadow-sm transition focus:outline-none focus:ring-2 focus:ring-leaf-400 focus:ring-offset-2 focus:ring-offset-cream-50",
                    disabled
                      ? "border-cream-200 bg-cream-100 text-cocoa-400"
                      : isSelected
                      ? "border-leaf-400 bg-leaf-50 text-leaf-700"
                      : "border-cream-200 bg-white text-cocoa-700 hover:border-leaf-200"
                  )}
                  disabled={disabled}
                >
                  <span className="text-xl">{copy.emoji}</span>
                  <div>
                    <p className="text-sm font-semibold">{copy.title}</p>
                    <p className="text-xs text-cocoa-500">{copy.description}</p>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </fieldset>

        <div className="space-y-2">
          <label className="text-sm font-medium text-cocoa-700" htmlFor="note">
            Progress note <span className="text-cocoa-400">(optional)</span>
          </label>
          <textarea
            id="note"
            value={note}
            onChange={(event) => setNote(event.target.value)}
            rows={3}
            placeholder="Record observations, weather, or milestones."
            className="w-full rounded-xl border border-cream-300 bg-white px-4 py-2 text-sm text-cocoa-900 shadow-sm focus:border-leaf-500 focus:outline-none focus:ring-2 focus:ring-leaf-300"
          />
        </div>

        <motion.button
          type="submit"
          disabled={disableSubmit}
          whileHover={disableSubmit ? undefined : { scale: 1.02 }}
          whileTap={disableSubmit ? undefined : { scale: 0.98 }}
          className="w-full rounded-full bg-cocoa-900 py-2 text-sm font-semibold text-cream-50 shadow-lg transition hover:bg-cocoa-800 focus:outline-none focus:ring-2 focus:ring-cocoa-500 focus:ring-offset-2 focus:ring-offset-cream-50 disabled:cursor-not-allowed disabled:bg-cream-200 disabled:text-cocoa-400"
        >
          {disableSubmit ? "Already harvested" : "Save progress"}
        </motion.button>
      </form>
    </Modal>
  );
}

