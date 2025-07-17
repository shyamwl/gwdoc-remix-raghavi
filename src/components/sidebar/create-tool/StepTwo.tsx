
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";

interface StepTwoProps {
  toolName: string;
  setToolName: (value: string) => void;
  generatedPrompt: string;
  setGeneratedPrompt: (value: string) => void;
  toolScope: string;
  setToolScope: (value: string) => void;
  handleBack: () => void;
  handleCreateTool: () => void;
  errors: {
    toolName?: string;
    generatedPrompt?: string;
  };
}

export function StepTwo({
  toolName,
  setToolName,
  generatedPrompt,
  setGeneratedPrompt,
  toolScope,
  setToolScope,
  handleBack,
  handleCreateTool,
  errors
}: StepTwoProps) {
  return (
    <div className="grid gap-4 py-4 animate-in fade-in duration-300">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="toolName" className="text-sm font-medium">
            Tool Name
          </label>
          {errors.toolName && (
            <span className="text-xs text-destructive flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {errors.toolName}
            </span>
          )}
        </div>
        <Input 
          id="toolName" 
          placeholder="Enter a name for your tool..." 
          value={toolName} 
          onChange={e => setToolName(e.target.value)} 
          className={`transition-all duration-200 focus:ring-2 focus:ring-primary/50 ${
            errors.toolName ? 'border-destructive focus:ring-destructive/50' : ''
          }`}
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="finalPrompt" className="text-sm font-medium">
            Tool Prompt
          </label>
          {errors.generatedPrompt && (
            <span className="text-xs text-destructive flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {errors.generatedPrompt}
            </span>
          )}
        </div>
        <div className="relative">
          <Textarea 
            id="finalPrompt" 
            value={generatedPrompt} 
            onChange={e => {
              // Ensure the app_documentation placeholder remains
              if (!e.target.value.includes("{{app_documentation}}")) {
                e.target.value += "{{app_documentation}}";
              }
              setGeneratedPrompt(e.target.value);
            }} 
            className={`h-36 transition-all duration-200 focus:ring-2 focus:ring-primary/50 ${
              errors.generatedPrompt ? 'border-destructive focus:ring-destructive/50' : ''
            }`} 
          />
          <div className="absolute bottom-2 right-2 bg-muted text-muted-foreground text-xs px-1 py-0.5 rounded">
            {"{{app_documentation}}"}
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          The placeholder {"{{app_documentation}}"} will be automatically populated with relevant project information.
        </p>
      </div>
      <div className="space-y-3">
        <Label className="text-sm font-medium">Tool Availability</Label>
        <RadioGroup value={toolScope} onValueChange={setToolScope} className="gap-3">
          <div className="flex items-center space-x-2 transition-all duration-200 hover:bg-accent/20 p-2 rounded">
            <RadioGroupItem value="current-project" id="current-project" />
            <Label htmlFor="current-project">Add this tool only to this project</Label>
          </div>
          <div className="flex items-center space-x-2 transition-all duration-200 hover:bg-accent/20 p-2 rounded">
            <RadioGroupItem value="all-projects" id="all-projects" />
            <Label htmlFor="all-projects">Add this tool for all future projects</Label>
          </div>
        </RadioGroup>
      </div>
      <div className="flex justify-between">
        <Button 
          type="button" 
          variant="outline" 
          onClick={handleBack}
          className="transition-all duration-200 hover:scale-105"
        >
          Back
        </Button>
        <Button 
          type="button" 
          onClick={handleCreateTool}
          className="transition-all duration-200 hover:scale-105"
        >
          Create Tool
        </Button>
      </div>
    </div>
  );
}
