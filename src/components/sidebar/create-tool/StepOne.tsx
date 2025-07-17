
import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle } from "lucide-react";

interface StepOneProps {
  requirement: string;
  setRequirement: (value: string) => void;
  example: string;
  setExample: (value: string) => void;
  handleCreateTool: () => void;
  errors: {
    requirement?: string;
  };
}

export function StepOne({
  requirement,
  setRequirement,
  example,
  setExample,
  handleCreateTool,
  errors
}: StepOneProps) {
  return (
    <div className="grid gap-4 py-4 animate-in fade-in duration-300">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="requirement" className="text-sm font-medium">
            What do you need?
          </label>
          {errors.requirement && (
            <span className="text-xs text-destructive flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {errors.requirement}
            </span>
          )}
        </div>
        <Textarea 
          id="requirement" 
          placeholder="Describe what you want the tool to do..." 
          value={requirement} 
          onChange={e => setRequirement(e.target.value)} 
          className={`h-24 transition-all duration-200 focus:ring-2 focus:ring-primary/50 ${
            errors.requirement ? 'border-destructive focus:ring-destructive/50' : ''
          }`}
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="example" className="text-sm font-medium">
          Example output (optional)
        </label>
        <Textarea 
          id="example" 
          placeholder="Provide an example of the expected output..." 
          value={example} 
          onChange={e => setExample(e.target.value)} 
          className="h-24 transition-all duration-200 focus:ring-2 focus:ring-primary/50" 
        />
      </div>
      <div className="flex justify-end">
        <Button 
          type="button" 
          onClick={handleCreateTool}
          className="transition-all duration-200 hover:scale-105"
        >
          Next Step
        </Button>
      </div>
    </div>
  );
}
