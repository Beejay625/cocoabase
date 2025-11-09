"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";
import Input from "./input";
import Button from "./button";
import {
  AssistantMessage,
  AssistantSuggestion,
  answerQuestion,
  generatePlantationSuggestions,
  prioritizeSuggestions,
} from "@/lib/ai-assistant-utils";

type AIAssistantProps = {
  plantationData?: {
    healthScore: number;
    stage: string;
    urgentTasks: number;
    lastWatered?: Date;
    soilMoisture?: number;
  };
  className?: string;
};

export default function AIAssistant({
  plantationData,
  className,
}: AIAssistantProps) {
  const [messages, setMessages] = useState<AssistantMessage[]>([]);
  const [input, setInput] = useState("");
  const [suggestions] = useState<AssistantSuggestion[]>(() => {
    return plantationData
      ? prioritizeSuggestions(generatePlantationSuggestions(plantationData))
      : [];
  });

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: AssistantMessage = {
      id: `msg-${Date.now()}`,
      type: "question",
      content: input,
      timestamp: new Date(),
    };

    const response = answerQuestion(input, {});
    const assistantMessage: AssistantMessage = {
      id: `msg-${Date.now() + 1}`,
      type: "info",
      content: response,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage, assistantMessage]);
    setInput("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("rounded-xl bg-white border border-cream-200 p-6", className)}
    >
      <h3 className="text-lg font-semibold text-cocoa-800 mb-4">AI Assistant</h3>

      {suggestions.length > 0 && (
        <div className="mb-4 space-y-2">
          <div className="text-sm font-medium text-cocoa-700 mb-2">Suggestions</div>
          {suggestions.slice(0, 3).map((suggestion) => (
            <div
              key={suggestion.id}
              className={cn(
                "rounded-lg border p-2 text-xs",
                suggestion.priority === "high"
                  ? "bg-red-50 border-red-200 text-red-800"
                  : suggestion.priority === "medium"
                  ? "bg-yellow-50 border-yellow-200 text-yellow-800"
                  : "bg-blue-50 border-blue-200 text-blue-800"
              )}
            >
              <div className="font-medium">{suggestion.title}</div>
              <div className="opacity-75">{suggestion.description}</div>
            </div>
          ))}
        </div>
      )}

      <div className="space-y-2 mb-4 max-h-64 overflow-y-auto">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, x: message.type === "question" ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={cn(
                "rounded-lg p-2 text-xs",
                message.type === "question"
                  ? "bg-cocoa-100 text-cocoa-800 ml-auto max-w-[80%]"
                  : "bg-cream-100 text-cocoa-700 mr-auto max-w-[80%]"
              )}
            >
              {message.content}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask a question..."
          className="flex-1"
        />
        <Button onClick={handleSend} variant="primary">
          Send
        </Button>
      </div>
    </motion.div>
  );
}

