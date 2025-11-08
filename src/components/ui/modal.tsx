"use client";

import { AnimatePresence, motion } from "framer-motion";
import { type ReactNode } from "react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
};

export default function Modal({
  open,
  onClose,
  title,
  description,
  children,
}: ModalProps) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-cocoa-950/70 p-4 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="relative w-full max-w-lg rounded-3xl border border-cream-200 bg-cream-50 p-6 shadow-xl"
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-5 top-5 text-cocoa-400 transition hover:text-cocoa-600 focus:outline-none focus:ring-2 focus:ring-cocoa-300 focus:ring-offset-2 focus:ring-offset-cream-50"
              aria-label="Close modal"
            >
              ✕
            </button>

            <header className="space-y-1 pr-10">
              <h2 id="modal-title" className="text-lg font-semibold text-cocoa-900">
                {title}
              </h2>
              {description ? (
                <p className="text-sm text-cocoa-500">{description}</p>
              ) : null}
            </header>

            <div className="mt-5">{children}</div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

