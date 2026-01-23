"use client";

import {
  X,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Award,
  Target,
  Lightbulb,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface AnalysisData {
  score: number;
  summary: string;
  strengths: string[];
  gaps: string[];
  skills: {
    name: string;
    status: "strong" | "partial" | "missing";
  }[];
  experience: {
    category: string;
    match: number;
  }[];
  recommendations: string[];
}

interface AnalysisPanelProps {
  analysis: AnalysisData | null;
  isLoading: boolean;
  onClose: () => void;
}

function ScoreGauge({ score }: { score: number }) {
  const circumference = 2 * Math.PI * 58;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-400";
    if (score >= 60) return "text-primary";
    if (score >= 40) return "text-amber-400";
    return "text-red-400";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent Match";
    if (score >= 60) return "Good Match";
    if (score >= 40) return "Partial Match";
    return "Low Match";
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-36 w-36">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 128 128">
          <circle
            cx="64"
            cy="64"
            r="58"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-secondary"
          />
          <circle
            cx="64"
            cy="64"
            r="58"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className={cn(
              "transition-all duration-1000 ease-out",
              getScoreColor(score)
            )}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn("text-4xl font-bold", getScoreColor(score))}>
            {score}%
          </span>
        </div>
      </div>
      <span className="mt-2 text-sm font-medium text-muted-foreground">
        {getScoreLabel(score)}
      </span>
    </div>
  );
}

function SkillBadge({
  skill,
}: {
  skill: { name: string; status: "strong" | "partial" | "missing" };
}) {
  const styles = {
    strong: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    partial: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    missing: "bg-red-500/10 text-red-400 border-red-500/20",
  };

  const icons = {
    strong: <CheckCircle2 className="h-3.5 w-3.5" />,
    partial: <AlertCircle className="h-3.5 w-3.5" />,
    missing: <X className="h-3.5 w-3.5" />,
  };

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-lg border px-3 py-2",
        styles[skill.status]
      )}
    >
      {icons[skill.status]}
      <span className="text-sm font-medium">{skill.name}</span>
    </div>
  );
}

function ProgressBar({ value, label }: { value: number; label: string }) {
  const getColor = (value: number) => {
    if (value >= 80) return "bg-emerald-400";
    if (value >= 60) return "bg-primary";
    if (value >= 40) return "bg-amber-400";
    return "bg-red-400";
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="text-foreground">{label}</span>
        <span className="font-medium text-muted-foreground">{value}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-secondary">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-700 ease-out",
            getColor(value)
          )}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

export function AnalysisPanel({
  analysis,
  isLoading,
  onClose,
}: AnalysisPanelProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm">
      <div className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-xl border border-border bg-card shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Target className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">Match Analysis</h2>
              <p className="text-sm text-muted-foreground">
                AI-powered compatibility report
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          {isLoading ? (
            <div className="flex h-96 flex-col items-center justify-center gap-4">
              <div className="relative h-16 w-16">
                <div className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
                <div className="absolute inset-2 animate-pulse rounded-full bg-primary/40" />
                <div className="absolute inset-4 rounded-full bg-primary" />
              </div>
              <div className="text-center">
                <p className="font-medium text-foreground">
                  Analyzing your match...
                </p>
                <p className="text-sm text-muted-foreground">
                  This may take a few seconds
                </p>
              </div>
            </div>
          ) : analysis ? (
            <div className="p-6">
              {/* Score and Summary */}
              <div className="mb-8 flex flex-col items-center gap-6 rounded-xl bg-secondary/50 p-6 md:flex-row md:items-start">
                <ScoreGauge score={analysis.score} />
                <div className="flex-1 text-center md:text-left">
                  <h3 className="mb-2 text-lg font-semibold text-foreground">
                    Summary
                  </h3>
                  <p className="leading-relaxed text-muted-foreground">
                    {analysis.summary}
                  </p>
                </div>
              </div>

              {/* Main Grid */}
              <div className="grid gap-6 md:grid-cols-2">
                {/* Strengths */}
                <div className="rounded-xl border border-border bg-card p-5">
                  <div className="mb-4 flex items-center gap-2">
                    <Award className="h-5 w-5 text-emerald-400" />
                    <h3 className="font-semibold text-foreground">
                      Key Strengths
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {analysis.strengths.map((strength, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Gaps */}
                <div className="rounded-xl border border-border bg-card p-5">
                  <div className="mb-4 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-amber-400" />
                    <h3 className="font-semibold text-foreground">
                      Areas to Address
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {analysis.gaps.map((gap, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                        <span>{gap}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Skills Match */}
              <div className="mt-6 rounded-xl border border-border bg-card p-5">
                <h3 className="mb-4 font-semibold text-foreground">
                  Skills Match
                </h3>
                <div className="flex flex-wrap gap-2">
                  {analysis.skills.map((skill, i) => (
                    <SkillBadge key={i} skill={skill} />
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-6 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    Strong Match
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-amber-400" />
                    Partial Match
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-red-400" />
                    Missing
                  </div>
                </div>
              </div>

              {/* Experience Alignment */}
              <div className="mt-6 rounded-xl border border-border bg-card p-5">
                <h3 className="mb-4 font-semibold text-foreground">
                  Experience Alignment
                </h3>
                <div className="space-y-4">
                  {analysis.experience.map((item, i) => (
                    <ProgressBar
                      key={i}
                      value={item.match}
                      label={item.category}
                    />
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-5">
                <div className="mb-4 flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-foreground">
                    Recommendations
                  </h3>
                </div>
                <ul className="space-y-3">
                  {analysis.recommendations.map((rec, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-muted-foreground"
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-medium text-primary">
                        {i + 1}
                      </span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
