"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";

type ConfirmationDialogProps = {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "default" | "danger";
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmationDialog({
  open,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "default",
  onConfirm,
  onCancel,
}: ConfirmationDialogProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onCancel}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
              <h3 className="text-lg font-semibold text-cocoa-900 mb-2">
                {title}
              </h3>
              <p className="text-sm text-cocoa-600 mb-6">{message}</p>
              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onCancel}
                  className="rounded-full border border-cream-300 bg-white px-4 py-2 text-sm font-semibold text-cocoa-700 shadow-sm transition hover:border-cocoa-300 hover:text-cocoa-900 focus:outline-none focus:ring-2 focus:ring-cocoa-200"
                >
                  {cancelLabel}
                </button>
                <button
                  type="button"
                  onClick={onConfirm}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-semibold text-white shadow-sm transition focus:outline-none focus:ring-2 focus:ring-offset-2",
                    variant === "danger"
                      ? "bg-red-500 hover:bg-red-600 focus:ring-red-500"
                      : "bg-cocoa-900 hover:bg-cocoa-800 focus:ring-cocoa-500"
                  )}
                >
                  {confirmLabel}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

