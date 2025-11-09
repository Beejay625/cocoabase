"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import Modal from "@/components/ui/modal";
import {
  type Plantation,
  type RecurringTaskTemplate,
  type RecurringTaskTemplateDraft,
  type RecurringFrequency,
  usePlantationsStore,
} from "@/store/plantations";
import { cn } from "@/lib/cn";

type RecurringTaskModalProps = {
  open: boolean;
  onClose: () => void;
  plantations: Plantation[];
};

type FormState = {
  plantationId: string;
  title: string;
  description: string;
  frequency: RecurringFrequency;
  interval: number;
  leadTimeDays: number;
  nextRunDate: string;
};

const frequencies: RecurringFrequency[] = ["daily", "weekly", "monthly"];

const formatDateInput = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const defaultLeadTimeByFrequency: Record<RecurringFrequency, number> = {
  daily: 0,
  weekly: 1,
  monthly: 3,
};

const createDefaultForm = (plantations: Plantation[]): FormState => {
  const now = new Date();
  const initialPlantation = plantations[0]?.id ?? "";
  const frequency: RecurringFrequency = "weekly";
  const interval = 1;
  const nextRun = new Date(now);
  nextRun.setDate(now.getDate() + 7);

  return {
    plantationId: initialPlantation,
    title: "",
    description: "",
    frequency,
    interval,
    leadTimeDays: defaultLeadTimeByFrequency[frequency],
    nextRunDate: formatDateInput(nextRun),
  };
};

const toDraft = (form: FormState): RecurringTaskTemplateDraft => ({
  plantationId: form.plantationId,
  title: form.title,
  description: form.description || undefined,
  frequency: form.frequency,
  interval: form.interval,
  leadTimeDays: form.leadTimeDays,
  nextRunDate: new Date(form.nextRunDate).toISOString(),
  enabled: true,
});

type TemplateWithPlantation = RecurringTaskTemplate & {
  plantationName: string;
};

export default function RecurringTaskModal({
  open,
  onClose,
  plantations,
}: RecurringTaskModalProps) {
  const templates = usePlantationsStore((state) => state.recurringTemplates);
  const addTemplate = usePlantationsStore((state) => state.addRecurringTemplate);
  const updateTemplate = usePlantationsStore(
    (state) => state.updateRecurringTemplate
  );
  const removeTemplate = usePlantationsStore(
    (state) => state.removeRecurringTemplate
  );
  const processTemplates = usePlantationsStore(
    (state) => state.processRecurringTemplates
  );

  const [form, setForm] = useState<FormState>(() => createDefaultForm(plantations));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setForm((prev) => ({
        ...createDefaultForm(plantations),
        plantationId: prev.plantationId || plantations[0]?.id || "",
      }));
      setError(null);
    }
  }, [open, plantations]);

  useEffect(() => {
    if (!plantations.length) {
      setForm((prev) => ({
        ...prev,
        plantationId: "",
      }));
    } else if (!plantations.find((p) => p.id === form.plantationId)) {
      setForm((prev) => ({
        ...prev,
        plantationId: plantations[0]?.id ?? "",
      }));
    }
  }, [plantations, form.plantationId]);

  const templatesWithNames: TemplateWithPlantation[] = useMemo(() => {
    return templates.map((template) => ({
      ...template,
      plantationName:
        plantations.find((plantation) => plantation.id === template.plantationId)
          ?.seedName ?? "Unknown plantation",
    }));
  }, [plantations, templates]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.plantationId) {
      setError("Select a plantation for the recurring task.");
      return;
    }
    if (!form.title.trim()) {
      setError("Provide a task title.");
      return;
    }

    addTemplate(toDraft(form));
    processTemplates();
    setForm((prev) => ({
      ...createDefaultForm(plantations),
      plantationId: prev.plantationId,
    }));
    setError(null);
  };

  const handleFrequencyChange = (value: RecurringFrequency) => {
    setForm((prev) => ({
      ...prev,
      frequency: value,
      leadTimeDays: defaultLeadTimeByFrequency[value],
    }));
  };

  const formatDateLabel = (iso: string) => {
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) {
      return "Invalid date";
    }
    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Manage Recurring Tasks"
      description="Create automated task schedules for plantations."
    >
      {!plantations.length ? (
        <div className="space-y-3 text-sm text-cocoa-500">
          <p>No plantations available yet. Add a plantation before creating recurring tasks.</p>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-cocoa-900 px-4 py-2 text-sm font-semibold text-cream-50 shadow-sm transition hover:bg-cocoa-800 focus:outline-none focus:ring-2 focus:ring-cocoa-500 focus:ring-offset-2 focus:ring-offset-cream-50"
          >
            Close
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm text-cocoa-600">
                Plantation
                <select
                  value={form.plantationId}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      plantationId: event.target.value,
                    }))
                  }
                  className="mt-1 w-full rounded-2xl border border-cream-300 bg-white px-3 py-2 text-sm text-cocoa-800 shadow-sm focus:border-cocoa-400 focus:outline-none focus:ring-2 focus:ring-cocoa-200"
                >
                  {plantations.map((plantation) => (
                    <option key={plantation.id} value={plantation.id}>
                      {plantation.seedName}
                    </option>
                  ))}
                </select>
              </label>
              <label className="text-sm text-cocoa-600">
                Task title
                <input
                  type="text"
                  value={form.title}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, title: event.target.value }))
                  }
                  placeholder="e.g. Weekly irrigation check"
                  className="mt-1 w-full rounded-2xl border border-cream-300 bg-white px-3 py-2 text-sm text-cocoa-800 shadow-sm focus:border-cocoa-400 focus:outline-none focus:ring-2 focus:ring-cocoa-200"
                  required
                />
              </label>
              <label className="text-sm text-cocoa-600">
                Frequency
                <select
                  value={form.frequency}
                  onChange={(event) =>
                    handleFrequencyChange(event.target.value as RecurringFrequency)
                  }
                  className="mt-1 w-full rounded-2xl border border-cream-300 bg-white px-3 py-2 text-sm text-cocoa-800 shadow-sm focus:border-cocoa-400 focus:outline-none focus:ring-2 focus:ring-cocoa-200"
                >
                  {frequencies.map((option) => (
                    <option key={option} value={option}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </option>
                  ))}
                </select>
              </label>
              <label className="text-sm text-cocoa-600">
                Interval
                <input
                  type="number"
                  min={1}
                  value={form.interval}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      interval: Math.max(1, Number(event.target.value)),
                    }))
                  }
                  className="mt-1 w-full rounded-2xl border border-cream-300 bg-white px-3 py-2 text-sm text-cocoa-800 shadow-sm focus:border-cocoa-400 focus:outline-none focus:ring-2 focus:ring-cocoa-200"
                />
              </label>
              <label className="text-sm text-cocoa-600">
                Lead time (days)
                <input
                  type="number"
                  min={0}
                  value={form.leadTimeDays}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      leadTimeDays: Math.max(0, Number(event.target.value)),
                    }))
                  }
                  className="mt-1 w-full rounded-2xl border border-cream-300 bg-white px-3 py-2 text-sm text-cocoa-800 shadow-sm focus:border-cocoa-400 focus:outline-none focus:ring-2 focus:ring-cocoa-200"
                />
              </label>
              <label className="text-sm text-cocoa-600">
                Next run date
                <input
                  type="date"
                  value={form.nextRunDate}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      nextRunDate: event.target.value,
                    }))
                  }
                  className="mt-1 w-full rounded-2xl border border-cream-300 bg-white px-3 py-2 text-sm text-cocoa-800 shadow-sm focus:border-cocoa-400 focus:outline-none focus:ring-2 focus:ring-cocoa-200"
                />
              </label>
            </div>
            <label className="block text-sm text-cocoa-600">
              Notes (optional)
              <textarea
                value={form.description}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    description: event.target.value,
                  }))
                }
                rows={2}
                className="mt-1 w-full rounded-2xl border border-cream-300 bg-white px-3 py-2 text-sm text-cocoa-800 shadow-sm focus:border-cocoa-400 focus:outline-none focus:ring-2 focus:ring-cocoa-200"
                placeholder="Add context for collaborators"
              />
            </label>
            {error ? (
              <p className="text-sm text-rose-600">{error}</p>
            ) : (
              <p className="text-xs text-cocoa-400">
                Tasks are auto-generated {form.leadTimeDays} day
                {form.leadTimeDays === 1 ? "" : "s"} before each run date.
              </p>
            )}
            <div className="flex items-center gap-3">
              <button
                type="submit"
                className="rounded-full bg-leaf-500 px-5 py-2 text-sm font-semibold text-cream-50 shadow-sm transition hover:bg-leaf-600 focus:outline-none focus:ring-2 focus:ring-leaf-400 focus:ring-offset-2 focus:ring-offset-cream-50"
              >
                Add recurring task
              </button>
              <button
                type="button"
                onClick={processTemplates}
                className="rounded-full border border-cocoa-200 px-4 py-2 text-sm font-semibold text-cocoa-600 transition hover:border-cocoa-300 hover:text-cocoa-900 focus:outline-none focus:ring-2 focus:ring-cocoa-300 focus:ring-offset-2 focus:ring-offset-cream-50"
              >
                Run scheduler now
              </button>
            </div>
          </form>

          <div>
            <h3 className="text-sm font-semibold text-cocoa-900">
              Existing recurring tasks
            </h3>
            {templatesWithNames.length === 0 ? (
              <p className="mt-2 rounded-2xl bg-white/70 p-4 text-sm text-cocoa-500 shadow-inner">
                No recurring tasks yet. Create one to automate your workflows.
              </p>
            ) : (
              <ul className="mt-3 space-y-3">
                {templatesWithNames.map((template) => (
                  <li
                    key={template.id}
                    className={cn(
                      "rounded-2xl border border-cream-200 bg-white/85 p-4 shadow-sm",
                      !template.enabled && "opacity-70"
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-cocoa-900">
                          {template.title}
                        </p>
                        <p className="text-xs text-cocoa-500">
                          {template.plantationName} • Every {template.interval}{" "}
                          {template.frequency}
                          {template.interval === 1 ? "" : "s"}
                        </p>
                        <p className="mt-1 text-xs text-cocoa-400">
                          Next run: {formatDateLabel(template.nextRunDate)} • Lead time:{" "}
                          {template.leadTimeDays} day
                          {template.leadTimeDays === 1 ? "" : "s"}
                        </p>
                        {template.description ? (
                          <p className="mt-1 text-xs text-cocoa-500">
                            {template.description}
                          </p>
                        ) : null}
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            updateTemplate(template.id, { enabled: !template.enabled })
                          }
                          className={cn(
                            "rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide transition focus:outline-none focus:ring-2 focus:ring-cocoa-300 focus:ring-offset-2 focus:ring-offset-white",
                            template.enabled
                              ? "bg-leaf-500 text-cream-50 hover:bg-leaf-600"
                              : "border border-cocoa-200 text-cocoa-500 hover:border-cocoa-300 hover:text-cocoa-800"
                          )}
                        >
                          {template.enabled ? "Enabled" : "Disabled"}
                        </button>
                        <button
                          type="button"
                          onClick={() => removeTemplate(template.id)}
                          className="rounded-full border border-rose-200 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-rose-600 transition hover:border-rose-300 hover:text-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-200 focus:ring-offset-2 focus:ring-offset-white"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
}


