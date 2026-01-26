"use client";

import { useState } from "react";
import { Briefcase, Type } from "lucide-react";

interface JobPanelProps {
  value: string;
  onChange: (value: string) => void;
}

export function JobPanel({ value, onChange }: JobPanelProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 border-b border-border px-6 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Briefcase className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h2 className="font-semibold text-foreground">Job Description</h2>
          <p className="text-sm text-muted-foreground">Paste content</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`Paste the job description here...

Example:
- Job Title
- Company Overview
- Responsibilities
- Required Skills
- Qualifications
- Benefits`}
          className="h-full w-full flex-1 resize-none rounded-lg border border-border bg-secondary/50 p-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          style={{ whiteSpace: "pre-wrap" }}
        />
      </div>
    </div>
  );
}
