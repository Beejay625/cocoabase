"use client";

import { FormEvent, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  usePlantationsStore,
  type StageTaskTemplate,
  type StageTaskTemplateDraft,
} from "@/store/plantations";
import useTaskUploader from "@/hooks/use-task-uploader";
import { addToast } from "@/lib/toaster";

const stageOptions: Array<{ value: StageTaskTemplate["stage"]; label: string }> = [
  { value: "planted", label: "Planted" },
  { value: "growing", label: "Growing" },
  { value: "harvested", label: "Harvested" },
];

type NewTemplateState = {
  stage: StageTaskTemplate["stage"];
  title: string;
  description: string;
  dueOffsetDays: number;
  assigneeRole: string;
  attachments: string[];
  attachmentDraft: string;
};

const defaultState: NewTemplateState = {
  stage: "growing",
  title: "",
  description: "",
  dueOffsetDays: 3,
  assigneeRole: "",
  attachments: [],
  attachmentDraft: "",
};

export default function StageTemplatePanel() {
  const stageTemplates = usePlantationsStore((state) => state.stageTemplates);
  const addStageTemplate = usePlantationsStore(
    (state) => state.addStageTaskTemplate
  );
  const updateStageTemplate = usePlantationsStore(
    (state) => state.updateStageTaskTemplate
  );
  const removeStageTemplate = usePlantationsStore(
    (state) => state.removeStageTaskTemplate
  );

  const [form, setForm] = useState<NewTemplateState>(defaultState);
  const [isSubmitting, setSubmitting] = useState(false);

  const templatesByStage = useMemo(() => {
    const map = new Map<StageTaskTemplate["stage"], StageTaskTemplate[]>();
    stageTemplates.forEach((template) => {
      const list = map.get(template.stage) ?? [];
      list.push(template);
      map.set(template.stage, list);
    });
    return map;
  }, [stageTemplates]);

  const handleAddAttachment = () => {
    const trimmed = form.attachmentDraft.trim();
    if (!trimmed) {
      return;
    }
    setForm((prev) => ({
      ...prev,
      attachments: prev.attachments.includes(trimmed)
        ? prev.attachments
        : [...prev.attachments, trimmed],
      attachmentDraft: "",
    }));
  };

  const handleRemoveAttachment = (url: string) => {
    setForm((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((item) => item !== url),
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.title.trim()) {
      return;
    }
    setSubmitting(true);
    try {
      const draft: StageTaskTemplateDraft = {
        stage: form.stage,
        title: form.title.trim(),
        description: form.description.trim() || undefined,
        dueOffsetDays: form.dueOffsetDays,
        assigneeRole: form.assigneeRole.trim() || undefined,
        attachments: form.attachments,
        enabled: true,
      };
      addStageTemplate(draft);
      setForm({ ...defaultState, stage: form.stage });
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggle = (template: StageTaskTemplate) => {
    updateStageTemplate(template.id, { enabled: !template.enabled });
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08 }}
      className="rounded-3xl border border-cocoa-800/60 bg-[#132446]/80 p-6 text-slate-100 shadow-xl shadow-black/20 backdrop-blur"
    >
      <header className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">
            Stage-triggered task templates
          </h2>
          <p className="text-sm text-slate-300/80">
            Automatically queue operational tasks whenever plantations move into a
            new growth stage.
          </p>
        </div>
        <span className="rounded-full bg-slate-900/60 px-3 py-1 text-xs uppercase tracking-[0.3em] text-slate-300/70">
          {stageTemplates.length} template{stageTemplates.length === 1 ? "" : "s"}
        </span>
      </header>

      <form
        className="mt-6 grid gap-4 rounded-2xl border border-slate-700/40 bg-slate-900/50 p-4 md:grid-cols-[220px,1fr,120px]"
        onSubmit={handleSubmit}
      >
        <div className="space-y-3">
          <label className="block text-xs uppercase tracking-[0.3em] text-slate-400/70">
            Stage
            <select
              className="mt-1 w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
              value={form.stage}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  stage: event.target.value as StageTaskTemplate["stage"],
                }))
              }
            >
              {stageOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-xs uppercase tracking-[0.3em] text-slate-400/70">
            Due offset (days)
            <input
              type="number"
              min={0}
              value={form.dueOffsetDays}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  dueOffsetDays: Number(event.target.value),
                }))
              }
              className="mt-1 w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
            />
          </label>
        </div>

        <div className="space-y-3">
          <label className="block text-xs uppercase tracking-[0.3em] text-slate-400/70">
            Task title
            <input
              type="text"
              required
              value={form.title}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, title: event.target.value }))
              }
              placeholder="e.g. Schedule agronomist inspection"
              className="mt-1 w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
            />
          </label>

          <label className="block text-xs uppercase tracking-[0.3em] text-slate-400/70">
            Description
            <textarea
              value={form.description}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  description: event.target.value,
                }))
              }
              rows={2}
              placeholder="Optional instructions for the assignee"
              className="mt-1 w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
            />
          </label>

          <label className="block text-xs uppercase tracking-[0.3em] text-slate-400/70">
            Assign to role
            <input
              type="text"
              value={form.assigneeRole}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  assigneeRole: event.target.value,
                }))
              }
              placeholder="e.g. Agronomist"
              className="mt-1 w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
            />
          </label>

          <label className="block text-xs uppercase tracking-[0.3em] text-slate-400/70">
            Attachment URL
            <div className="mt-1 flex gap-2">
              <input
                type="url"
                value={form.attachmentDraft}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    attachmentDraft: event.target.value,
                  }))
                }
                placeholder="https://example.com/doc.pdf"
                className="flex-1 rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
              />
              <button
                type="button"
                onClick={handleAddAttachment}
                className="rounded-full border border-slate-600/40 bg-slate-900/70 px-3 py-2 text-xs font-semibold text-slate-200/90 transition hover:border-slate-400/60 hover:text-white"
              >
                Add
              </button>
            </div>
          </label>
          {form.attachments.length > 0 && (
            <ul className="flex flex-wrap gap-2 text-xs text-slate-300/80">
              {form.attachments.map((url) => (
                <li
                  key={url}
                  className="flex items-center gap-2 rounded-full border border-slate-700/40 bg-slate-900/60 px-2 py-1"
                >
                  <span className="truncate max-w-[180px]">{url}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveAttachment(url)}
                    className="text-slate-400 hover:text-white"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex flex-col justify-end gap-2 text-sm md:items-end">
          <button
            type="submit"
            disabled={isSubmitting || !form.title.trim()}
            className="w-full rounded-full bg-leaf-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg transition hover:bg-leaf-400 focus:outline-none focus:ring-2 focus:ring-leaf-300 focus:ring-offset-2 focus:ring-offset-slate-900/60 disabled:cursor-not-allowed disabled:bg-slate-700/50 disabled:text-slate-300/60 md:w-auto"
          >
            {isSubmitting ? "Saving…" : "Add template"}
          </button>
          <p className="text-xs text-slate-400/70">
            New tasks will trigger immediately after a plantation enters the selected stage.
          </p>
        </div>
      </form>

      <div className="mt-6 space-y-6">
        {stageOptions.map((option) => {
          const templates = templatesByStage.get(option.value) ?? [];
          return (
            <section
              key={option.value}
              className="space-y-3 rounded-2xl border border-slate-700/40 bg-slate-900/50 p-4"
            >
              <header className="flex items-center justify-between gap-4">
                <h3 className="text-sm font-semibold text-white">
                  {option.label}
                </h3>
                <span className="text-xs text-slate-400/80">
                  {templates.length} template{templates.length === 1 ? "" : "s"}
                </span>
              </header>

              {templates.length === 0 ? (
                <p className="text-xs text-slate-400/70">
                  No stage-triggered tasks configured for this stage yet.
                </p>
              ) : (
                <ul className="space-y-3">
                  {templates.map((template) => (
                    <li
                      key={template.id}
                      className={cn(
                        "rounded-xl border border-slate-700/40 bg-slate-950/40 px-3 py-3",
                        !template.enabled && "opacity-60"
                      )}
                    >
                      <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                        <div>
                          <p className="text-sm font-semibold text-white">
                            {template.title}
                          </p>
                          {template.description && (
                            <p className="text-xs text-slate-300/80">
                              {template.description}
                            </p>
                          )}
                          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-300/70">
                            <span className="rounded-full bg-slate-800/80 px-2 py-0.5">
                              Due in {template.dueOffsetDays} day
                              {template.dueOffsetDays === 1 ? "" : "s"}
                            </span>
                            <span className="rounded-full bg-slate-800/80 px-2 py-0.5">
                              {template.assigneeRole
                                ? `Role: ${template.assigneeRole}`
                                : "Unassigned"}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleToggle(template)}
                            className={cn(
                              "rounded-full px-3 py-1 text-xs font-semibold transition",
                              template.enabled
                                ? "border border-emerald-500/40 bg-emerald-600/20 text-emerald-100 hover:border-emerald-400/60 hover:text-white"
                                : "border border-slate-600/40 bg-slate-900/60 text-slate-300/80 hover:border-slate-500/60 hover:text-white"
                            )}
                          >
                            {template.enabled ? "Enabled" : "Disabled"}
                          </button>
                          <button
                            type="button"
                            onClick={() => removeStageTemplate(template.id)}
                            className="rounded-full border border-rose-500/40 bg-rose-600/20 px-3 py-1 text-xs font-semibold text-rose-100 transition hover:border-rose-400/60 hover:text-white"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          );
        })}
      </div>
    </motion.section>
  );
}


