
import React from "react";

interface StepIndicatorProps {
  currentStep: number;
  goToStep: (stepNumber: number) => void;
}

export function StepIndicator({ currentStep, goToStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center mb-4">
      <div className="flex items-center">
        <div 
          className={`flex items-center justify-center w-6 h-6 rounded-full ${
            currentStep === 1 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-muted text-muted-foreground'
          } text-xs cursor-pointer transition-all duration-300 hover:scale-110`}
          onClick={() => goToStep(1)}
        >
          1
        </div>
        {/* Progress line with animation */}
        <div className="relative w-8 h-1 mx-1">
          <div className="absolute inset-0 bg-muted rounded-full"></div>
          <div 
            className={`absolute inset-0 bg-primary rounded-full transition-all duration-500 ease-in-out origin-left`}
            style={{ transform: currentStep > 1 ? 'scaleX(1)' : 'scaleX(0)' }}
          ></div>
        </div>
        <div 
          className={`flex items-center justify-center w-6 h-6 rounded-full ${
            currentStep === 2 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-muted text-muted-foreground'
          } text-xs cursor-pointer transition-all duration-300 hover:scale-110 ${
            currentStep === 1 ? 'animate-pulse' : ''
          }`}
          onClick={() => goToStep(2)}
        >
          2
        </div>
      </div>
    </div>
  );
}
