
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

// Import components
import { StepIndicator } from "./create-tool/StepIndicator";
import { LoadingScreen } from "./create-tool/LoadingScreen";
import { StepOne } from "./create-tool/StepOne";
import { StepTwo } from "./create-tool/StepTwo";

interface CreateToolDialogProps {
  categoryTitle: string;
}

interface ValidationErrors {
  requirement?: string;
  toolName?: string;
  generatedPrompt?: string;
}

export function CreateToolDialog({
  categoryTitle
}: CreateToolDialogProps) {
  const { toast } = useToast();
  const [requirement, setRequirement] = useState("");
  const [example, setExample] = useState("");
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [toolScope, setToolScope] = useState("current-project");
  const [step, setStep] = useState(1);
  const [toolName, setToolName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [streamedText, setStreamedText] = useState("");
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});

  // Validation function
  const validate = (): boolean => {
    const newErrors: ValidationErrors = {};
    
    if (step === 1) {
      if (!requirement.trim()) {
        newErrors.requirement = "This field is required";
      } else if (requirement.length < 10) {
        newErrors.requirement = "Provide a more detailed description";
      }
    } else if (step === 2) {
      if (!toolName.trim()) {
        newErrors.toolName = "Tool name is required";
      }
      
      if (!generatedPrompt.includes("{{app_documentation}}")) {
        newErrors.generatedPrompt = "Prompt must include the app_documentation placeholder";
      } else if (generatedPrompt.replace("{{app_documentation}}", "").trim().length < 10) {
        newErrors.generatedPrompt = "Provide a more detailed prompt";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Mark field as touched when its value changes
  useEffect(() => {
    setTouchedFields(prev => ({ ...prev, requirement: true }));
    if (touchedFields.requirement) validate();
  }, [requirement]);

  useEffect(() => {
    setTouchedFields(prev => ({ ...prev, toolName: true }));
    if (touchedFields.toolName) validate();
  }, [toolName]);

  useEffect(() => {
    setTouchedFields(prev => ({ ...prev, generatedPrompt: true }));
    if (touchedFields.generatedPrompt) validate();
  }, [generatedPrompt]);

  // Simulated streaming text effect
  useEffect(() => {
    if (isLoading) {
      const fullPrompt = `Creating a custom ${categoryTitle.toLowerCase()} tool that will:
1. Take user input about: ${requirement}
2. Consider this example: ${example}
3. Generate consistent and reliable results
4. Analyze patterns and optimize outputs
5. Apply machine learning techniques for improved accuracy`;
      
      let charIndex = 0;
      const interval = setInterval(() => {
        if (charIndex < fullPrompt.length) {
          setStreamedText(fullPrompt.substring(0, charIndex + 1));
          charIndex++;
        } else {
          clearInterval(interval);
          // After text streaming is complete, generate the actual prompt and move to step 2
          setTimeout(() => {
            const improvedPrompt = `Create a tool that will:
1. Take user input about: ${requirement}
2. Consider this example output: ${example}
3. Generate consistent and reliable results
{{app_documentation}}`;
            setGeneratedPrompt(improvedPrompt);
            setToolName(`Custom ${categoryTitle} Tool`);
            setIsLoading(false);
            setStep(2);
          }, 500); // Slight pause after text finishes streaming
        }
      }, 30); // Speed of the text stream
      
      return () => clearInterval(interval);
    }
  }, [isLoading, requirement, example, categoryTitle]);

  const handleCreateTool = () => {
    // Validate the current step
    if (!validate()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors before proceeding.",
        variant: "destructive"
      });
      return;
    }

    if (step === 1) {
      // Show loading screen when going from step 1 to step 2
      setIsLoading(true);
    } else {
      // Final tool creation
      toast({
        title: "Tool created",
        description: `Your custom tool has been added ${toolScope === "current-project" ? "to this project" : "for all future projects"}.`
      });
      handleClose();
    }
  };

  const handleBack = () => {
    setStep(1);
    // Clear errors from step 2
    const stepOneErrors = { ...errors };
    delete stepOneErrors.toolName;
    delete stepOneErrors.generatedPrompt;
    setErrors(stepOneErrors);
  };

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      setRequirement("");
      setExample("");
      setGeneratedPrompt("");
      setToolScope("current-project");
      setStep(1);
      setToolName("");
      setIsLoading(false);
      setStreamedText("");
      setErrors({});
      setTouchedFields({});
    }, 300);
  };

  // Function to navigate directly to a step when clicking the step indicator
  const goToStep = (stepNumber: number) => {
    // Only allow going to step 2 if requirement is filled
    if (stepNumber === 2 && !validate()) {
      toast({
        title: "Please fix the errors",
        description: "You need to provide proper inputs before proceeding.",
        variant: "destructive"
      });
      return;
    }
    
    if (stepNumber === 2 && step === 1) {
      // Generate the prompt when moving from step 1 to 2
      setIsLoading(true);
    } else {
      setStep(stepNumber);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open);
      if (!open) {
        handleClose();
      }
    }}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon" className="ml-auto h-5 w-5 p-0 text-neutral-600">
              <Plus className="h-4 w-4" />
              <span className="sr-only">Add custom tool</span>
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>Create custom tool</p>
        </TooltipContent>
      </Tooltip>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Custom Tool for {categoryTitle}</DialogTitle>
        </DialogHeader>
        
        {/* Step Indicator */}
        <StepIndicator currentStep={step} goToStep={goToStep} />
        
        {isLoading ? (
          <LoadingScreen 
            streamedText={streamedText} 
            requirement={requirement} 
            example={example} 
            categoryTitle={categoryTitle} 
          />
        ) : step === 1 ? (
          <StepOne 
            requirement={requirement} 
            setRequirement={setRequirement}
            example={example}
            setExample={setExample}
            handleCreateTool={handleCreateTool}
            errors={errors}
          />
        ) : (
          <StepTwo 
            toolName={toolName}
            setToolName={setToolName}
            generatedPrompt={generatedPrompt}
            setGeneratedPrompt={setGeneratedPrompt}
            toolScope={toolScope}
            setToolScope={setToolScope}
            handleBack={handleBack}
            handleCreateTool={handleCreateTool}
            errors={errors}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
