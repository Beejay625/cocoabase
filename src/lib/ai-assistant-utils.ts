export type AssistantMessageType = "question" | "suggestion" | "alert" | "info";

export interface AssistantMessage {
  id: string;
  type: AssistantMessageType;
  content: string;
  timestamp: Date;
  context?: Record<string, unknown>;
}

export interface AssistantSuggestion {
  id: string;
  category: string;
  title: string;
  description: string;
  action?: string;
  priority: "high" | "medium" | "low";
}

export const generatePlantationSuggestions = (
  plantationData: {
    healthScore: number;
    stage: string;
    urgentTasks: number;
    lastWatered?: Date;
    soilMoisture?: number;
  }
): AssistantSuggestion[] => {
  const suggestions: AssistantSuggestion[] = [];

  if (plantationData.healthScore < 70) {
    suggestions.push({
      id: "suggestion-health",
      category: "Health",
      title: "Improve Plantation Health",
      description: `Your plantation health score is ${plantationData.healthScore}. Consider addressing nutrient deficiencies and pest issues.`,
      action: "View health recommendations",
      priority: "high",
    });
  }

  if (plantationData.urgentTasks > 0) {
    suggestions.push({
      id: "suggestion-tasks",
      category: "Tasks",
      title: "Complete Urgent Tasks",
      description: `You have ${plantationData.urgentTasks} urgent task${plantationData.urgentTasks !== 1 ? "s" : ""} that need attention.`,
      action: "View urgent tasks",
      priority: "high",
    });
  }

  if (plantationData.lastWatered) {
    const daysSinceWatered = Math.floor(
      (Date.now() - plantationData.lastWatered.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (daysSinceWatered > 5) {
      suggestions.push({
        id: "suggestion-watering",
        category: "Irrigation",
        title: "Schedule Watering",
        description: `It's been ${daysSinceWatered} days since last watering. Consider irrigating soon.`,
        action: "Schedule irrigation",
        priority: "medium",
      });
    }
  }

  if (plantationData.soilMoisture !== undefined && plantationData.soilMoisture < 40) {
    suggestions.push({
      id: "suggestion-moisture",
      category: "Soil",
      title: "Low Soil Moisture",
      description: "Soil moisture is below optimal levels. Increase irrigation frequency.",
      action: "View irrigation schedule",
      priority: "medium",
    });
  }

  return suggestions;
};

export const answerQuestion = (
  question: string,
  context: Record<string, unknown>
): string => {
  const lowerQuestion = question.toLowerCase();

  if (lowerQuestion.includes("harvest") || lowerQuestion.includes("when")) {
    return "Based on your plantation data, the optimal harvest window is typically 180 days after planting. Check your harvest scheduler for specific dates.";
  }

  if (lowerQuestion.includes("water") || lowerQuestion.includes("irrigation")) {
    return "Cocoa plants typically need watering 2-3 times per week, depending on weather conditions. Monitor soil moisture levels regularly.";
  }

  if (lowerQuestion.includes("fertilizer") || lowerQuestion.includes("nutrient")) {
    return "Apply balanced fertilizer every 3 months. Ensure adequate nitrogen, phosphorus, and potassium levels based on soil tests.";
  }

  if (lowerQuestion.includes("pest") || lowerQuestion.includes("disease")) {
    return "Implement integrated pest management. Monitor regularly and apply appropriate treatments when issues are detected.";
  }

  if (lowerQuestion.includes("certification") || lowerQuestion.includes("compliance")) {
    return "Check your compliance tracker for certification status and upcoming deadlines. Maintain proper documentation for audits.";
  }

  return "I can help you with plantation management, harvest scheduling, irrigation, fertilization, pest control, and compliance. What specific area would you like to know more about?";
};

export const generateInsights = (
  data: {
    plantations: unknown[];
    tasks: unknown[];
    costs: unknown[];
    yields: unknown[];
  }
): AssistantMessage[] => {
  const insights: AssistantMessage[] = [];

  const plantationCount = Array.isArray(data.plantations) ? data.plantations.length : 0;
  const taskCount = Array.isArray(data.tasks) ? data.tasks.length : 0;
  const completedTasks = Array.isArray(data.tasks)
    ? data.tasks.filter((t: unknown) => (t as { status?: string }).status === "completed").length
    : 0;

  if (plantationCount > 0) {
    insights.push({
      id: `insight-${Date.now()}`,
      type: "info",
      content: `You have ${plantationCount} active plantation${plantationCount !== 1 ? "s" : ""}.`,
      timestamp: new Date(),
    });
  }

  if (taskCount > 0) {
    const completionRate = (completedTasks / taskCount) * 100;
    insights.push({
      id: `insight-${Date.now() + 1}`,
      type: completionRate >= 80 ? "info" : "suggestion",
      content: `Task completion rate: ${completionRate.toFixed(1)}%. ${completedTasks} of ${taskCount} tasks completed.`,
      timestamp: new Date(),
    });
  }

  return insights;
};

export const prioritizeSuggestions = (
  suggestions: AssistantSuggestion[]
): AssistantSuggestion[] => {
  const priorityOrder = { high: 3, medium: 2, low: 1 };
  return [...suggestions].sort(
    (a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]
  );
};

