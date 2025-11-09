"use client";

import { useMemo, useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import {
  useHelpRequestsStore,
  type HelpRequest,
  type HelpRequestDraft,
  type HelpRequestResponseDraft,
  categoryLabels,
  priorityLabels,
  statusLabels,
  type HelpRequestCategory,
  type HelpRequestPriority,
} from "@/store/help-requests";
import { useAccount } from "wagmi";
import type { Plantation } from "@/store/plantations";

type HelpRequestsPanelProps = {
  plantations: Plantation[];
};

type RequestFormState = {
  category: HelpRequestCategory;
  priority: HelpRequestPriority;
  title: string;
  description: string;
  plantationId: string;
  location: string;
  attachmentUrl: string;
  attachments: string[];
};

const defaultFormState: RequestFormState = {
  category: "other",
  priority: "medium",
  title: "",
  description: "",
  plantationId: "",
  location: "",
  attachmentUrl: "",
  attachments: [],
};

export default function HelpRequestsPanel({
  plantations,
}: HelpRequestsPanelProps) {
  const { address } = useAccount();
  const requests = useHelpRequestsStore((state) => state.requests);
  const addRequest = useHelpRequestsStore((state) => state.addRequest);
  const updateRequestStatus = useHelpRequestsStore(
    (state) => state.updateRequestStatus
  );
  const addResponse = useHelpRequestsStore((state) => state.addResponse);
  const markResponseHelpful = useHelpRequestsStore(
    (state) => state.markResponseHelpful
  );

  const [form, setForm] = useState<RequestFormState>(defaultFormState);
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(
    null
  );
  const [responseText, setResponseText] = useState<Record<string, string>>({});
  const [filterStatus, setFilterStatus] = useState<
    HelpRequest["status"] | "all"
  >("all");
  const [filterCategory, setFilterCategory] = useState<
    HelpRequestCategory | "all"
  >("all");

  const filteredRequests = useMemo(() => {
    return requests.filter((request) => {
      if (filterStatus !== "all" && request.status !== filterStatus) {
        return false;
      }
      if (filterCategory !== "all" && request.category !== filterCategory) {
        return false;
      }
      return true;
    });
  }, [requests, filterStatus, filterCategory]);

  const selectedRequest = useMemo(
    () => requests.find((r) => r.id === selectedRequestId),
    [requests, selectedRequestId]
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!address || !form.title.trim() || !form.description.trim()) {
      return;
    }

    const draft: HelpRequestDraft = {
      walletAddress: address,
      category: form.category,
      priority: form.priority,
      title: form.title.trim(),
      description: form.description.trim(),
      plantationId: form.plantationId || undefined,
      location: form.location.trim() || undefined,
      attachments: form.attachments,
    };

    addRequest(draft);
    setForm(defaultFormState);
  };

  const handleAddAttachment = () => {
    const trimmed = form.attachmentUrl.trim();
    if (!trimmed) {
      return;
    }
    setForm((prev) => ({
      ...prev,
      attachments: prev.attachments.includes(trimmed)
        ? prev.attachments
        : [...prev.attachments, trimmed],
      attachmentUrl: "",
    }));
  };

  const handleSubmitResponse = (requestId: string) => {
    const text = responseText[requestId]?.trim();
    if (!text || !address) {
      return;
    }

    const response: HelpRequestResponseDraft = {
      responderWalletAddress: address,
      message: text,
    };

    addResponse(requestId, response);
    setResponseText((prev) => ({ ...prev, [requestId]: "" }));
  };

  const myRequests = useMemo(
    () => requests.filter((r) => r.walletAddress === address),
    [requests, address]
  );

  const openRequests = useMemo(
    () => filteredRequests.filter((r) => r.status === "open"),
    [filteredRequests]
  );

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08 }}
      className="rounded-3xl border border-cocoa-800/60 bg-[#101f3c]/80 p-6 text-slate-100 shadow-xl shadow-black/20 backdrop-blur"
    >
      <header className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">
            Community help requests
          </h2>
          <p className="text-sm text-slate-300/80">
            Request operational support from fellow farmers and experts.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-slate-900/60 px-3 py-1 text-xs uppercase tracking-[0.3em] text-slate-300/70">
            {requests.length} request{requests.length === 1 ? "" : "s"}
          </span>
          <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300">
            {openRequests.length} open
          </span>
        </div>
      </header>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-300/70">
            Create help request
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block text-xs uppercase tracking-[0.3em] text-slate-400/70">
              Category
              <select
                value={form.category}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    category: event.target.value as HelpRequestCategory,
                  }))
                }
                className="mt-1 w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
              >
                {Object.entries(categoryLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>

            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block text-xs uppercase tracking-[0.3em] text-slate-400/70">
                Priority
                <select
                  value={form.priority}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      priority: event.target.value as HelpRequestPriority,
                    }))
                  }
                  className="mt-1 w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
                >
                  {Object.entries(priorityLabels).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-xs uppercase tracking-[0.3em] text-slate-400/70">
                Plantation (optional)
                <select
                  value={form.plantationId}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      plantationId: event.target.value,
                    }))
                  }
                  className="mt-1 w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
                >
                  <option value="">None</option>
                  {plantations.map((plantation) => (
                    <option key={plantation.id} value={plantation.id}>
                      {plantation.seedName}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="block text-xs uppercase tracking-[0.3em] text-slate-400/70">
              Title
              <input
                type="text"
                value={form.title}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, title: event.target.value }))
                }
                placeholder="Brief summary of your request"
                className="mt-1 w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
                required
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
                rows={4}
                placeholder="Describe your issue, what you've tried, and what help you need..."
                className="mt-1 w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
                required
              />
            </label>

            <label className="block text-xs uppercase tracking-[0.3em] text-slate-400/70">
              Location (optional)
              <input
                type="text"
                value={form.location}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    location: event.target.value,
                  }))
                }
                placeholder="e.g. Ashanti, Ghana"
                className="mt-1 w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
              />
            </label>

            <label className="block text-xs uppercase tracking-[0.3em] text-slate-400/70">
              Attachment URL (optional)
              <div className="mt-1 flex gap-2">
                <input
                  type="url"
                  value={form.attachmentUrl}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      attachmentUrl: event.target.value,
                    }))
                  }
                  placeholder="https://example.com/photo.jpg"
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
                      onClick={() =>
                        setForm((prev) => ({
                          ...prev,
                          attachments: prev.attachments.filter((u) => u !== url),
                        }))
                      }
                      className="text-slate-400 hover:text-white"
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <button
              type="submit"
              disabled={!address || !form.title.trim() || !form.description.trim()}
              className="w-full rounded-full bg-leaf-500 px-5 py-2 text-sm font-semibold text-slate-950 shadow-lg transition hover:bg-leaf-400 focus:outline-none focus:ring-2 focus:ring-leaf-300 focus:ring-offset-2 focus:ring-offset-slate-900/60 disabled:cursor-not-allowed disabled:bg-slate-700/40 disabled:text-slate-300/60"
            >
              Submit request
            </button>
          </form>
        </div>

        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={filterStatus}
              onChange={(event) =>
                setFilterStatus(
                  event.target.value as HelpRequest["status"] | "all"
                )
              }
              className="rounded-full border border-slate-600/40 bg-slate-900/60 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-slate-200 focus:border-leaf-400/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
            >
              <option value="all">All statuses</option>
              {Object.entries(statusLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            <select
              value={filterCategory}
              onChange={(event) =>
                setFilterCategory(
                  event.target.value as HelpRequestCategory | "all"
                )
              }
              className="rounded-full border border-slate-600/40 bg-slate-900/60 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-slate-200 focus:border-leaf-400/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
            >
              <option value="all">All categories</option>
              {Object.entries(categoryLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-300/70">
            Community requests ({filteredRequests.length})
          </h3>

          {filteredRequests.length === 0 ? (
            <p className="text-sm text-slate-300/80">
              No help requests match the current filters.
            </p>
          ) : (
            <ul className="space-y-3 max-h-[600px] overflow-y-auto">
              {filteredRequests.map((request) => (
                <li
                  key={request.id}
                  className={cn(
                    "rounded-2xl border p-4 cursor-pointer transition",
                    selectedRequestId === request.id
                      ? "border-leaf-400/60 bg-leaf-500/10"
                      : "border-slate-700/40 bg-slate-900/50 hover:border-slate-500/60"
                  )}
                  onClick={() =>
                    setSelectedRequestId(
                      selectedRequestId === request.id ? null : request.id
                    )
                  }
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-semibold text-white">
                          {request.title}
                        </h4>
                        <span
                          className={cn(
                            "rounded-full px-2 py-0.5 text-xs font-semibold",
                            request.priority === "urgent" &&
                              "bg-rose-500/20 text-rose-300",
                            request.priority === "high" &&
                              "bg-amber-500/20 text-amber-300",
                            request.priority === "medium" &&
                              "bg-sky-500/20 text-sky-300",
                            request.priority === "low" &&
                              "bg-slate-500/20 text-slate-300"
                          )}
                        >
                          {priorityLabels[request.priority]}
                        </span>
                        <span className="rounded-full bg-slate-800/80 px-2 py-0.5 text-xs text-slate-300/70">
                          {categoryLabels[request.category]}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-slate-300/70 line-clamp-2">
                        {request.description}
                      </p>
                      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-400/80">
                        <span>
                          {new Date(request.createdAt).toLocaleDateString()}
                        </span>
                        {request.location && (
                          <span>• {request.location}</span>
                        )}
                        <span>• {request.responses.length} response{request.responses.length === 1 ? "" : "s"}</span>
                      </div>
                    </div>
                    <span
                      className={cn(
                        "rounded-full px-2 py-1 text-xs font-semibold",
                        request.status === "resolved" &&
                          "bg-emerald-500/20 text-emerald-300",
                        request.status === "in_progress" &&
                          "bg-sky-500/20 text-sky-300",
                        request.status === "open" &&
                          "bg-amber-500/20 text-amber-300",
                        request.status === "closed" &&
                          "bg-slate-500/20 text-slate-300"
                      )}
                    >
                      {statusLabels[request.status]}
                    </span>
                  </div>

                  {selectedRequestId === request.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-4 space-y-4 border-t border-slate-700/40 pt-4"
                    >
                      <div>
                        <p className="text-sm text-slate-200">{request.description}</p>
                        {request.attachments.length > 0 && (
                          <ul className="mt-2 flex flex-wrap gap-2">
                            {request.attachments.map((url) => (
                              <li key={url}>
                                <a
                                  href={url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-xs text-leaf-300 underline hover:text-leaf-200"
                                >
                                  View attachment
                                </a>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>

                      <div>
                        <h5 className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-300/70 mb-2">
                          Responses ({request.responses.length})
                        </h5>
                        {request.responses.length === 0 ? (
                          <p className="text-xs text-slate-300/80">
                            No responses yet. Be the first to help!
                          </p>
                        ) : (
                          <ul className="space-y-2">
                            {request.responses.map((response) => (
                              <li
                                key={response.id}
                                className="rounded-xl border border-slate-700/40 bg-slate-950/60 p-3"
                              >
                                <div className="flex items-start justify-between gap-2">
                                  <div className="flex-1">
                                    <p className="text-xs font-semibold text-slate-200">
                                      {response.responderName ||
                                        `${response.responderWalletAddress.slice(0, 6)}...${response.responderWalletAddress.slice(-4)}`}
                                    </p>
                                    <p className="mt-1 text-xs text-slate-300/80">
                                      {response.message}
                                    </p>
                                    <p className="mt-1 text-[10px] text-slate-400/70">
                                      {new Date(response.createdAt).toLocaleString()}
                                    </p>
                                  </div>
                                  {response.helpful && (
                                    <span className="text-xs text-emerald-300">
                                      ✓ Helpful
                                    </span>
                                  )}
                                </div>
                                {!response.helpful &&
                                  request.walletAddress === address && (
                                    <button
                                      type="button"
                                      onClick={() =>
                                        markResponseHelpful(request.id, response.id)
                                      }
                                      className="mt-2 text-xs text-leaf-300 hover:text-leaf-200"
                                    >
                                      Mark as helpful
                                    </button>
                                  )}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>

                      {request.status === "open" && address && (
                        <div>
                          <label className="block text-xs uppercase tracking-[0.3em] text-slate-400/70 mb-2">
                            Add response
                          </label>
                          <div className="flex gap-2">
                            <textarea
                              value={responseText[request.id] ?? ""}
                              onChange={(event) =>
                                setResponseText((prev) => ({
                                  ...prev,
                                  [request.id]: event.target.value,
                                }))
                              }
                              rows={2}
                              placeholder="Share your advice or solution..."
                              className="flex-1 rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-xs text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
                            />
                            <button
                              type="button"
                              onClick={() => handleSubmitResponse(request.id)}
                              disabled={
                                !responseText[request.id]?.trim() ||
                                address === request.walletAddress
                              }
                              className="rounded-full bg-leaf-500 px-4 py-2 text-xs font-semibold text-slate-950 transition hover:bg-leaf-400 disabled:cursor-not-allowed disabled:bg-slate-700/40 disabled:text-slate-300/60"
                            >
                              Send
                            </button>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </motion.section>
  );
}

