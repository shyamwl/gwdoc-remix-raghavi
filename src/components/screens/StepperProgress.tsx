
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";

export function StepperProgress() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine the current step based on the URL path
  const currentStep = location.pathname === "/upload-ui-images" ? 1 :
                     location.pathname === "/describe-screens" ? 2 :
                     location.pathname === "/backend-logics" ? 3 :
                     location.pathname === "/app-flow" ? 4 :
                     location.pathname === "/screen-docs" ? 5 : 0;
  
  return (
    <div className="mb-8">
      <Button
        variant="ghost"
        className="text-sm text-muted-foreground hover:text-foreground mb-4"
        onClick={() => navigate("/project-library")}
      >
        ← Back to Projects
      </Button>
      <div className="flex items-center justify-between mt-4">
        <div 
          className={`flex items-center gap-4 ${currentStep >= 1 ? "cursor-pointer" : ""}`}
          onClick={() => currentStep >= 1 && navigate("/upload-ui-images")}
        >
          <div className={`flex items-center justify-center w-8 h-8 ${currentStep >= 1 ? "bg-primary text-white" : "border"} rounded-full`}>
            <span className="text-sm">{currentStep > 1 ? "✓" : "1"}</span>
          </div>
          <span className={currentStep === 1 ? "font-medium" : "text-muted-foreground"}>Upload Screens</span>
        </div>
        <div className="flex-1 mx-4 h-[1px] bg-border" />
        <div 
          className={`flex items-center gap-4 ${currentStep >= 2 ? "cursor-pointer" : ""}`}
          onClick={() => currentStep >= 2 && navigate("/describe-screens")}
        >
          <div className={`flex items-center justify-center w-8 h-8 ${currentStep >= 2 ? "bg-primary text-white" : "border"} rounded-full`}>
            <span className="text-sm">{currentStep > 2 ? "✓" : "2"}</span>
          </div>
          <span className={currentStep === 2 ? "font-medium" : "text-muted-foreground"}>Describe Screens</span>
        </div>
        <div className="flex-1 mx-4 h-[1px] bg-border" />
        <div 
          className={`flex items-center gap-4 ${currentStep >= 3 ? "cursor-pointer" : ""}`}
          onClick={() => currentStep >= 3 && navigate("/backend-logics")}
        >
          <div className={`flex items-center justify-center w-8 h-8 ${currentStep >= 3 ? "bg-primary text-white" : "border"} rounded-full`}>
            <span className="text-sm">{currentStep > 3 ? "✓" : "3"}</span>
          </div>
          <span className={currentStep === 3 ? "font-medium" : "text-muted-foreground"}>Backend Logics</span>
        </div>
        <div className="flex-1 mx-4 h-[1px] bg-border" />
        <div 
          className={`flex items-center gap-4 ${currentStep >= 4 ? "cursor-pointer" : ""}`}
          onClick={() => currentStep >= 4 && navigate("/app-flow")}
        >
          <div className={`flex items-center justify-center w-8 h-8 ${currentStep >= 4 ? "bg-primary text-white" : "border"} rounded-full`}>
            <span className="text-sm">{currentStep > 4 ? "✓" : "4"}</span>
          </div>
          <span className={currentStep === 4 ? "font-medium" : "text-muted-foreground"}>Create App Flow</span>
        </div>
        <div className="flex-1 mx-4 h-[1px] bg-border" />
        <div 
          className={`flex items-center gap-4 ${currentStep >= 5 ? "cursor-pointer" : ""}`}
          onClick={() => currentStep >= 5 && navigate("/screen-docs")}
        >
          <div className={`flex items-center justify-center w-8 h-8 ${currentStep >= 5 ? "bg-primary text-white" : "border"} rounded-full`}>
            <span className="text-sm">5</span>
          </div>
          <span className={currentStep === 5 ? "font-medium" : "text-muted-foreground"}>Screen wise documentation</span>
        </div>
      </div>
    </div>
  );
}
