
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface WelcomeScreenProps {
  onGenerate: () => void;
}

export function WelcomeScreen({ onGenerate }: WelcomeScreenProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6">
      <div className="text-center space-y-6 max-w-md">
        <h1 className="text-3xl font-bold">User Story Generator</h1>
        <p className="text-muted-foreground">
          Generate user stories for your project based on project requirements and best practices.
        </p>
        <Button 
          size="lg" 
          onClick={onGenerate} 
          className="w-full gap-2"
        >
          <Sparkles className="h-5 w-5" />
          Generate User Stories
        </Button>
      </div>
    </div>
  );
}
