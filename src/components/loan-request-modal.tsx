"use client";

import {
  useState,
  useMemo,
  useCallback,
  type FormEvent,
  type ChangeEvent,
} from "react";
import Modal from "@/components/ui/modal";
import { useEngagementStore } from "@/store/engagement";
import { usePlantationsStore } from "@/store/plantations";
import { useAlertsStore } from "@/store/alerts";
import { cn } from "@/lib/cn";

type LoanRequestModalProps = {
  open: boolean;
  onClose: () => void;
  defaultPlantationId?: string;
};

const currencyOptions = ["USD", "GHS", "NGN", "XOF"];

export default function LoanRequestModal({
  open,
  onClose,
  defaultPlantationId,
}: LoanRequestModalProps) {
  const addLoanRequest = useEngagementStore((state) => state.addLoanRequest);
  const plantations = usePlantationsStore((state) => state.plantations);
  const addAlert = useAlertsStore((state) => state.addAlert);

  const plantationOptions = useMemo(
    () =>
      plantations.map((plantation) => ({
        id: plantation.id,
        name: plantation.seedName,
        location: plantation.location,
        walletAddress: plantation.walletAddress,
      })),
    [plantations]
  );

  const initialPlantationId =
    defaultPlantationId ?? plantationOptions[0]?.id ?? undefined;

  const [plantationId, setPlantationId] = useState<string | undefined>(
    initialPlantationId
  );
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState(currencyOptions[0]);
  const [termMonths, setTermMonths] = useState("12");
  const [purpose, setPurpose] = useState("");
  const [collateral, setCollateral] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedWallet = useMemo(() => {
    if (!plantationId) {
      return undefined;
    }
    return plantationOptions.find(
      (option) => option.id === plantationId
    )?.walletAddress;
  }, [plantationId, plantationOptions]);

  const resetForm = useCallback(() => {
    setAmount("");
    setCurrency(currencyOptions[0]);
    setTermMonths("12");
    setPurpose("");
    setCollateral("");
    setNotes("");
    setError(null);
    if (defaultPlantationId) {
      setPlantationId(defaultPlantationId);
    }
  }, [defaultPlantationId]);

  const handleNumericChange =
    (setter: (value: string) => void) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      setter(event.target.value);
    };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!amount || Number.isNaN(Number.parseFloat(amount))) {
      setError("Enter a valid loan amount.");
      return;
    }
    if (!termMonths || Number.isNaN(Number.parseInt(termMonths, 10))) {
      setError("Specify a valid term in months.");
      return;
    }
    if (!purpose.trim()) {
      setError("Describe the purpose of the loan request.");
      return;
    }

    setIsSubmitting(true);
    try {
      const loan = addLoanRequest({
        plantationId,
        walletAddress: selectedWallet,
        amount: Number.parseFloat(amount),
        currency,
        termMonths: Number.parseInt(termMonths, 10),
        purpose: purpose.trim(),
        collateral: collateral.trim() || undefined,
        notes: notes.trim() || undefined,
      });

      addAlert({
        type: "system",
        severity: "info",
        title: "Loan request submitted",
        description: `Request for ${currency} ${loan.amount.toFixed(
          2
        )} logged successfully.`,
      });

      resetForm();
      onClose();
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Unable to submit loan request. Try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        resetForm();
        onClose();
      }}
      title="Request cooperative loan"
      description="Access growth financing and track repayment obligations directly from the dashboard."
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm text-cocoa-600">
            Plantation
            <select
              value={plantationId ?? ""}
              onChange={(event) =>
                setPlantationId(event.target.value || undefined)
              }
              className="mt-1 w-full rounded-2xl border border-cream-300 bg-white px-3 py-2 text-sm text-cocoa-800 shadow-sm focus:border-cocoa-400 focus:outline-none focus:ring-2 focus:ring-cocoa-200"
            >
              <option value="">General cooperative</option>
              {plantationOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm text-cocoa-600">
            Loan amount
            <input
              type="number"
              min="0"
              step="0.01"
              value={amount}
              onChange={handleNumericChange(setAmount)}
              className="mt-1 w-full rounded-2xl border border-cream-300 bg-white px-3 py-2 text-sm text-cocoa-800 shadow-sm focus:border-cocoa-400 focus:outline-none focus:ring-2 focus:ring-cocoa-200"
              placeholder="0.00"
              required
            />
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm text-cocoa-600">
            Currency
            <select
              value={currency}
              onChange={(event) => setCurrency(event.target.value)}
              className="mt-1 w-full rounded-2xl border border-cream-300 bg-white px-3 py-2 text-sm text-cocoa-800 shadow-sm focus:border-cocoa-400 focus:outline-none focus:ring-2 focus:ring-cocoa-200"
            >
              {currencyOptions.map((code) => (
                <option key={code} value={code}>
                  {code}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm text-cocoa-600">
            Term (months)
            <input
              type="number"
              min="1"
              step="1"
              value={termMonths}
              onChange={handleNumericChange(setTermMonths)}
              className="mt-1 w-full rounded-2xl border border-cream-300 bg-white px-3 py-2 text-sm text-cocoa-800 shadow-sm focus:border-cocoa-400 focus:outline-none focus:ring-2 focus:ring-cocoa-200"
              required
            />
          </label>
        </div>

        <label className="block text-sm text-cocoa-600">
          Purpose
          <textarea
            value={purpose}
            onChange={(event) => setPurpose(event.target.value)}
            rows={3}
            placeholder="Explain how the loan will be used to grow cooperative output..."
            className="mt-1 w-full rounded-2xl border border-cream-300 bg-white px-3 py-2 text-sm text-cocoa-800 shadow-sm focus:border-cocoa-400 focus:outline-none focus:ring-2 focus:ring-cocoa-200"
            required
          />
        </label>

        <label className="block text-sm text-cocoa-600">
          Collateral (optional)
          <input
            type="text"
            value={collateral}
            onChange={(event) => setCollateral(event.target.value)}
            placeholder="Harvest contracts, equipment, inventory..."
            className="mt-1 w-full rounded-2xl border border-cream-300 bg-white px-3 py-2 text-sm text-cocoa-800 shadow-sm focus:border-cocoa-400 focus:outline-none focus:ring-2 focus:ring-cocoa-200"
          />
        </label>

        <label className="block text-sm text-cocoa-600">
          Notes to finance team (optional)
          <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            rows={3}
            placeholder="Add repayment expectations or risk mitigations..."
            className="mt-1 w-full rounded-2xl border border-cream-300 bg-white px-3 py-2 text-sm text-cocoa-800 shadow-sm focus:border-cocoa-400 focus:outline-none focus:ring-2 focus:ring-cocoa-200"
          />
        </label>

        {error ? (
          <div className="rounded-2xl border border-rose-200 bg-rose-50/80 px-3 py-2 text-sm text-rose-700">
            {error}
          </div>
        ) : null}

        <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => {
              resetForm();
              onClose();
            }}
            className="rounded-full border border-cocoa-200 px-4 py-2 text-sm font-semibold text-cocoa-600 transition hover:border-cocoa-300 hover:text-cocoa-900 focus:outline-none focus:ring-2 focus:ring-cocoa-300 focus:ring-offset-2 focus:ring-offset-cream-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={cn(
              "rounded-full bg-cocoa-900 px-5 py-2 text-sm font-semibold text-cream-50 shadow transition focus:outline-none focus:ring-2 focus:ring-cocoa-500 focus:ring-offset-2 focus:ring-offset-cream-50",
              isSubmitting && "cursor-not-allowed opacity-70"
            )}
          >
            {isSubmitting ? "Submitting…" : "Submit loan request"}
          </button>
        </div>
      </form>
    </Modal>
  );
}


