"use client";

import { useState } from "react";
import { Briefcase, Link, Type, Loader2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface JobPanelProps {
  value: string;
  onChange: (value: string) => void;
}

type InputMode = "paste" | "url";

export function JobPanel({ value, onChange }: JobPanelProps) {
  const [mode, setMode] = useState<InputMode>("paste");
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFetchUrl = async () => {
    if (!url.trim()) {
      setError("Please enter a URL");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/fetch-job", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch content");
      }

      onChange(data.content);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch content");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 border-b border-border px-6 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Briefcase className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h2 className="font-semibold text-foreground">Job Description</h2>
          <p className="text-sm text-muted-foreground">
            Paste content or fetch from URL
          </p>
        </div>
      </div>

      {/* Mode Toggle */}
      <div className="flex gap-2 border-b border-border px-4 py-3">
        <button
          type="button"
          onClick={() => setMode("paste")}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            mode === "paste"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
        >
          <Type className="h-4 w-4" />
          Paste Content
        </button>
        <button
          type="button"
          onClick={() => setMode("url")}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            mode === "url"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
        >
          <Link className="h-4 w-4" />
          From URL
        </button>
      </div>

      <div className="flex flex-1 flex-col p-4">
        {mode === "url" && (
          <div className="mb-4 space-y-3">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <ExternalLink className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="url"
                  value={url}
                  onChange={(e) => {
                    setUrl(e.target.value);
                    setError("");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !isLoading) {
                      handleFetchUrl();
                    }
                  }}
                  placeholder="https://example.com/job-posting"
                  className="w-full rounded-lg border border-border bg-secondary/50 py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <Button
                onClick={handleFetchUrl}
                disabled={isLoading || !url.trim()}
                className="shrink-0"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Fetching
                  </>
                ) : (
                  "Fetch"
                )}
              </Button>
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>
        )}

        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={
            mode === "paste"
              ? `Paste the job description here...

Example:
- Job Title
- Company Overview
- Responsibilities
- Required Skills
- Qualifications
- Benefits`
              : "Fetched content will appear here. You can edit it after fetching."
          }
          className="h-full w-full flex-1 resize-none rounded-lg border border-border bg-secondary/50 p-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>
    </div>
  );
}
