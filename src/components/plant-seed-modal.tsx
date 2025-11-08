"use client";

import Modal from "@/components/ui/modal";
import type { PlantationDraft } from "@/store/plantations";
import {
  useEffect,
  useState,
  startTransition,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { motion } from "framer-motion";

type PlantSeedModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (draft: PlantationDraft) => void;
  walletAddress?: string;
};

type FormState = {
  seedName: string;
  location: string;
  startDate: string;
  notes: string;
};

const initialFormState = (): FormState => ({
  seedName: "",
  location: "",
  startDate: new Date().toISOString().split("T")[0],
  notes: "",
});

export default function PlantSeedModal({
  open,
  onClose,
  onSubmit,
  walletAddress,
}: PlantSeedModalProps) {
  const [formState, setFormState] = useState<FormState>(initialFormState);

  useEffect(() => {
    if (open) {
      startTransition(() => {
        setFormState(initialFormState());
      });
    }
  }, [open]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!walletAddress) {
      return;
    }

    onSubmit({
      seedName: formState.seedName,
      location: formState.location || undefined,
      startDate: formState.startDate,
      notes: formState.notes || undefined,
      walletAddress,
    });

    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Plant a new cocoa seed"
      description="Name your seed, choose where it is planted, and mark the start date."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="seedName"
            className="text-sm font-medium text-cocoa-700"
          >
            Seed Name
          </label>
          <input
            id="seedName"
            name="seedName"
            value={formState.seedName}
            onChange={handleChange}
            required
            placeholder="Golden Sunrise"
            className="w-full rounded-xl border border-cream-300 bg-white px-4 py-2 text-sm text-cocoa-900 shadow-sm focus:border-leaf-500 focus:outline-none focus:ring-2 focus:ring-leaf-300"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="location"
            className="text-sm font-medium text-cocoa-700"
          >
            Planting Location <span className="text-cocoa-400">(optional)</span>
          </label>
          <input
            id="location"
            name="location"
            value={formState.location}
            onChange={handleChange}
            placeholder="Ashanti, Ghana"
            className="w-full rounded-xl border border-cream-300 bg-white px-4 py-2 text-sm text-cocoa-900 shadow-sm focus:border-leaf-500 focus:outline-none focus:ring-2 focus:ring-leaf-300"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="startDate"
            className="text-sm font-medium text-cocoa-700"
          >
            Start Date
          </label>
          <input
            id="startDate"
            name="startDate"
            type="date"
            value={formState.startDate}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-cream-300 bg-white px-4 py-2 text-sm text-cocoa-900 shadow-sm focus:border-leaf-500 focus:outline-none focus:ring-2 focus:ring-leaf-300"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="notes" className="text-sm font-medium text-cocoa-700">
            Notes <span className="text-cocoa-400">(optional)</span>
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formState.notes}
            onChange={handleChange}
            placeholder="Add a reminder about watering or milestones."
            rows={3}
            className="w-full rounded-xl border border-cream-300 bg-white px-4 py-2 text-sm text-cocoa-900 shadow-sm focus:border-leaf-500 focus:outline-none focus:ring-2 focus:ring-leaf-300"
          />
        </div>

        <motion.button
          type="submit"
          disabled={!walletAddress}
          whileHover={{ scale: walletAddress ? 1.02 : 1 }}
          whileTap={{ scale: walletAddress ? 0.98 : 1 }}
          className="w-full rounded-full bg-leaf-500 py-2 text-sm font-semibold text-cream-50 shadow-lg transition hover:bg-leaf-600 focus:outline-none focus:ring-2 focus:ring-leaf-400 focus:ring-offset-2 focus:ring-offset-cream-50 disabled:cursor-not-allowed disabled:bg-cream-200 disabled:text-cocoa-400"
        >
          {walletAddress ? "Plant Seed" : "Connect wallet to plant"}
        </motion.button>
      </form>
    </Modal>
  );
}

