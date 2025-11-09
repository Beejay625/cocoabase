export type QualityGrade = "premium" | "grade-a" | "grade-b" | "grade-c" | "reject";

export type QualityMetric = {
  name: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  weight: number;
};

export interface QualityAssessment {
  id: string;
  plantationId: string;
  harvestId?: string;
  assessedAt: Date;
  assessedBy: string;
  grade: QualityGrade;
  score: number;
  metrics: QualityMetric[];
  notes?: string;
}

export const calculateQualityScore = (metrics: QualityMetric[]): number => {
  if (metrics.length === 0) return 0;

  let totalWeight = 0;
  let weightedScore = 0;

  metrics.forEach((metric) => {
    const normalizedValue = Math.max(
      0,
      Math.min(
        100,
        ((metric.value - metric.min) / (metric.max - metric.min)) * 100
      )
    );
    weightedScore += normalizedValue * metric.weight;
    totalWeight += metric.weight;
  });

  return totalWeight > 0 ? weightedScore / totalWeight : 0;
};

export const determineQualityGrade = (score: number): QualityGrade => {
  if (score >= 90) return "premium";
  if (score >= 80) return "grade-a";
  if (score >= 70) return "grade-b";
  if (score >= 60) return "grade-c";
  return "reject";
};

export const assessQuality = (metrics: QualityMetric[]): {
  score: number;
  grade: QualityGrade;
} => {
  const score = calculateQualityScore(metrics);
  const grade = determineQualityGrade(score);
  return { score, grade };
};

export const getQualityGradeColor = (grade: QualityGrade): string => {
  const colors: Record<QualityGrade, string> = {
    premium: "text-purple-600 bg-purple-100",
    "grade-a": "text-green-600 bg-green-100",
    "grade-b": "text-blue-600 bg-blue-100",
    "grade-c": "text-yellow-600 bg-yellow-100",
    reject: "text-red-600 bg-red-100",
  };
  return colors[grade];
};

export const getQualityGradeLabel = (grade: QualityGrade): string => {
  const labels: Record<QualityGrade, string> = {
    premium: "Premium",
    "grade-a": "Grade A",
    "grade-b": "Grade B",
    "grade-c": "Grade C",
    reject: "Reject",
  };
  return labels[grade];
};

export const compareQualityAssessments = (
  assessment1: QualityAssessment,
  assessment2: QualityAssessment
): {
  scoreChange: number;
  gradeChange: "improved" | "declined" | "stable";
} => {
  const scoreChange = assessment2.score - assessment1.score;
  const gradeOrder: QualityGrade[] = ["reject", "grade-c", "grade-b", "grade-a", "premium"];
  const grade1Index = gradeOrder.indexOf(assessment1.grade);
  const grade2Index = gradeOrder.indexOf(assessment2.grade);
  
  let gradeChange: "improved" | "declined" | "stable" = "stable";
  if (grade2Index > grade1Index) {
    gradeChange = "improved";
  } else if (grade2Index < grade1Index) {
    gradeChange = "declined";
  }

  return { scoreChange, gradeChange };
};

export const getAverageQualityScore = (assessments: QualityAssessment[]): number => {
  if (assessments.length === 0) return 0;
  const sum = assessments.reduce((acc, assessment) => acc + assessment.score, 0);
  return sum / assessments.length;
};

export const getQualityTrend = (
  assessments: QualityAssessment[]
): "improving" | "declining" | "stable" => {
  if (assessments.length < 2) return "stable";

  const recent = assessments.slice(-5);
  const older = assessments.slice(0, Math.max(0, assessments.length - 5));

  if (older.length === 0) return "stable";

  const recentAvg = getAverageQualityScore(recent);
  const olderAvg = getAverageQualityScore(older);

  const diff = recentAvg - olderAvg;
  if (diff > 5) return "improving";
  if (diff < -5) return "declining";
  return "stable";
};

