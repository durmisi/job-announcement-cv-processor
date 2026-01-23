"use client";

import React from "react";

import { useCallback, useState } from "react";
import { FileText, Upload, X, File } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CVPanelProps {
  content: string;
  fileName: string | null;
  onContentChange: (content: string, fileName: string | null) => void;
}

export function CVPanel({ content, fileName, onContentChange }: CVPanelProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const processFile = useCallback(
    async (file: File) => {
      setIsProcessing(true);
      try {
        const text = await file.text();
        onContentChange(text, file.name);
      } catch {
        console.error("Error reading file");
      } finally {
        setIsProcessing(false);
      }
    },
    [onContentChange],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const file = e.dataTransfer.files[0];
      if (file) {
        const validTypes = [
          "application/pdf",
          "text/plain",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ];
        if (
          validTypes.includes(file.type) ||
          file.name.endsWith(".txt") ||
          file.name.endsWith(".pdf") ||
          file.name.endsWith(".doc") ||
          file.name.endsWith(".docx")
        ) {
          processFile(file);
        }
      }
    },
    [processFile],
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        processFile(file);
      }
    },
    [processFile],
  );

  const clearFile = useCallback(() => {
    onContentChange("", null);
  }, [onContentChange]);

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 border-b border-border px-6 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <FileText className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h2 className="font-semibold text-foreground">Your CV</h2>
          <p className="text-sm text-muted-foreground">
            Upload or drop your resume
          </p>
        </div>
      </div>
      <div className="flex-1 p-4">
        {!content ? (
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`flex h-full flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors ${
              isDragging
                ? "border-primary bg-primary/5"
                : "border-border bg-secondary/30"
            }`}
          >
            <div className="flex flex-col items-center gap-4 p-8 text-center">
              <div
                className={`flex h-16 w-16 items-center justify-center rounded-full transition-colors ${
                  isDragging ? "bg-primary/20" : "bg-secondary"
                }`}
              >
                <Upload
                  className={`h-8 w-8 transition-colors ${
                    isDragging ? "text-primary" : "text-muted-foreground"
                  }`}
                />
              </div>
              <div>
                <p className="font-medium text-foreground">
                  {isProcessing ? "Processing..." : "Drop your CV here"}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Supports PDF, Word, and TXT files
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-px w-12 bg-border" />
                <span className="text-xs text-muted-foreground">or</span>
                <div className="h-px w-12 bg-border" />
              </div>
              <label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <Button variant="outline" asChild>
                  <span className="cursor-pointer">Browse Files</span>
                </Button>
              </label>
            </div>
          </div>
        ) : (
          <div className="flex h-full flex-col gap-3">
            <div className="flex items-center justify-between rounded-lg bg-secondary/50 px-4 py-3">
              <div className="flex items-center gap-3">
                <File className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-foreground">
                  {fileName || "CV Content"}
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={clearFile}
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <textarea
              value={content}
              onChange={(e) => onContentChange(e.target.value, fileName)}
              className="flex-1 resize-none rounded-lg border border-border bg-secondary/50 p-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Or paste your CV content here..."
              style={{ whiteSpace: "pre-wrap" }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
