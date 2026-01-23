"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { JobPanel } from "@/components/job-panel";
import { CVPanel } from "@/components/cv-panel";
import { AnalysisPanel, type AnalysisData } from "@/components/analysis-panel";

export default function Home() {
  const [jobDescription, setJobDescription] = useState("");
  const [cvContent, setCvContent] = useState("");
  const [cvFileName, setCvFileName] = useState<string | null>(null);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);

  const handleCVChange = (content: string, fileName: string | null) => {
    setCvContent(content);
    setCvFileName(fileName);
  };

  const handleFileChange = (file: File | null) => {
    setCvFile(file);
  };

  const canAnalyze = jobDescription.trim() && cvContent.trim() && cvFile;

  const handleAnalyze = async () => {
    if (!canAnalyze || !cvFile) return; // Require file

    setIsAnalyzing(true);
    setShowAnalysis(true);
    setAnalysis(null);

    try {
      const formData = new FormData();
      formData.append("cv_file", cvFile);
      formData.append("job_content", jobDescription);

      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setAnalysis("OK");
      } else {
        setAnalysis(data.detail || "An error occurred");
      }
    } catch {
      setAnalysis("An error occurred while analyzing. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <main className="flex h-screen flex-col bg-background">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-border px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">CV Match</h1>
            <p className="text-xs text-muted-foreground">
              AI-Powered Job Matching
            </p>
          </div>
        </div>
        <Button
          onClick={handleAnalyze}
          disabled={!canAnalyze || isAnalyzing}
          className="gap-2"
        >
          <Sparkles className="h-4 w-4" />
          Analyze Match
        </Button>
      </header>

      {/* Split Screen */}
      <div className="flex flex-1 flex-col overflow-hidden md:flex-row">
        {/* Left Panel - Job Description */}
        <div className="h-1/2 border-b border-border md:h-full md:w-1/2 md:border-b-0 md:border-r">
          <JobPanel value={jobDescription} onChange={setJobDescription} />
        </div>

        {/* Right Panel - CV Upload */}
        <div className="h-1/2 md:h-full md:w-1/2">
          <CVPanel
            content={cvContent}
            fileName={cvFileName}
            file={cvFile}
            onContentChange={handleCVChange}
            onFileChange={handleFileChange}
          />
        </div>
      </div>

      {/* Analysis Modal */}
      {showAnalysis && (
        <AnalysisPanel
          analysis={analysis}
          isLoading={isAnalyzing}
          onClose={() => setShowAnalysis(false)}
        />
      )}
    </main>
  );
}
