
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, BookOpen, Database, GitBranch, TestTube, Layout, BookOpenCheck, FileCode, CheckSquare, Clock, CheckCircle, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "@/hooks/use-toast";
import { useDocumentGeneration } from "@/context/DocumentGenerationContext";

interface DocumentOption {
  id: string;
  label: string;
  icon: React.ReactNode;
  parentId?: string;
}

interface DocumentStatus {
  id: string;
  status: "waiting" | "in-progress" | "completed";
}

interface DocumentGenerationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DocumentGenerationDialog({ open, onOpenChange }: DocumentGenerationDialogProps) {
  const navigate = useNavigate();
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [documentStatus, setDocumentStatus] = useState<DocumentStatus[]>([]);
  const { setDocumentStatus: setGlobalDocumentStatus, setIsGeneratingDocuments } = useDocumentGeneration();

  // Clear document status when dialog closes
  useEffect(() => {
    if (!open) {
      setSelectedDocuments([]);
      setDocumentStatus([]);
    }
  }, [open]);

  const documentOptions: DocumentOption[] = [
    { id: "user-stories", label: "User Stories", icon: <FileText className="h-5 w-5" /> },
    { id: "acceptance-criteria", label: "Acceptance Criteria", icon: <CheckSquare className="h-5 w-5" />, parentId: "user-stories" },
    { id: "api-documentation", label: "API Documentation", icon: <FileCode className="h-5 w-5" /> },
    { id: "database-schema", label: "Database Schema", icon: <Database className="h-5 w-5" /> },
    { id: "flow-chart", label: "Flow Chart", icon: <GitBranch className="h-5 w-5" /> },
    { id: "test-cases", label: "Test Cases", icon: <TestTube className="h-5 w-5" /> },
    { id: "landing-page", label: "Landing Page Content", icon: <Layout className="h-5 w-5" /> },
    { id: "knowledge-base", label: "Knowledge Base Article", icon: <BookOpen className="h-5 w-5" /> },
  ];

  const toggleDocument = (documentId: string) => {
    setSelectedDocuments((prev) => {
      if (prev.includes(documentId)) {
        // Remove the document and any of its children
        return prev.filter((id) => id !== documentId && 
          !documentOptions.some((doc) => doc.parentId === documentId && id === doc.id));
      } else {
        // Add the document
        return [...prev, documentId];
      }
    });
  };

  const handleGenerateDocuments = () => {
    if (selectedDocuments.length === 0) {
      toast({
        title: "No documents selected",
        description: "Please select at least one document to generate",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setIsGeneratingDocuments(true);
    
    // Initialize document status
    const initialStatus: DocumentStatus[] = selectedDocuments.map(id => ({
      id,
      status: "waiting"
    }));
    setDocumentStatus(initialStatus);
    
    // Update global status
    const globalStatus: Record<string, "waiting" | "in-progress" | "completed" | null> = {};
    selectedDocuments.forEach(id => {
      globalStatus[id] = "waiting";
    });
    setGlobalDocumentStatus(globalStatus);

    // Simulate document generation process with sequential status updates
    const processTasks = async () => {
      for (const docId of selectedDocuments) {
        // Update status to in-progress
        setDocumentStatus(prev => 
          prev.map(doc => doc.id === docId ? { ...doc, status: "in-progress" as const } : doc)
        );
        
        // Update global status
        setGlobalDocumentStatus(prev => ({
          ...prev,
          [docId]: "in-progress"
        }));
        
        // Simulate processing time (random between 1-2 seconds)
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
        
        // Update status to completed
        setDocumentStatus(prev => 
          prev.map(doc => doc.id === docId ? { ...doc, status: "completed" as const } : doc)
        );
        
        // Update global status
        setGlobalDocumentStatus(prev => ({
          ...prev,
          [docId]: "completed"
        }));
      }
      
      // All documents completed
      setTimeout(() => {
        toast({
          title: "Documents generated",
          description: `${selectedDocuments.length} document(s) have been generated successfully`,
        });
        setIsGenerating(false);
        setIsGeneratingDocuments(false);
        onOpenChange(false);
        navigate("/project-library");
      }, 500);
    };

    processTasks();
  };

  const isDocumentDisabled = (document: DocumentOption) => {
    if (!document.parentId) return false;
    return !selectedDocuments.includes(document.parentId);
  };

  const getStatusIcon = (documentId: string) => {
    const status = documentStatus.find(doc => doc.id === documentId)?.status;
    
    if (!status || !isGenerating) return null;
    
    switch (status) {
      case "waiting":
        return <Clock className="h-4 w-4 text-muted-foreground animate-pulse" />;
      case "in-progress":
        return <Loader2 className="h-4 w-4 text-primary animate-spin" />;
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={isGenerating ? undefined : onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Generate Project Documents</DialogTitle>
          <DialogDescription>
            Select documents to generate based on your screen documentation
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <p className="text-sm text-muted-foreground mb-4">
            Select the documents you would like to generate based on your screen documentation:
          </p>
          
          <div className="space-y-4">
            {documentOptions.map((document) => {
              const isDisabled = isDocumentDisabled(document);
              const isSelected = selectedDocuments.includes(document.id);
              const statusIcon = getStatusIcon(document.id);
              
              return (
                <div 
                  key={document.id} 
                  className={`flex items-center space-x-3 ${document.parentId ? 'ml-8' : ''} ${isDisabled ? 'opacity-50' : ''}`}
                >
                  <Checkbox 
                    id={document.id}
                    checked={isSelected}
                    onCheckedChange={() => !isDisabled && !isGenerating && toggleDocument(document.id)}
                    disabled={isDisabled || isGenerating}
                    className="rounded-sm"
                  />
                  <div className="flex items-center space-x-3">
                    {document.icon}
                    <label 
                      htmlFor={document.id}
                      className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${(isDisabled || isGenerating) ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      {document.label}
                    </label>
                  </div>
                  
                  {statusIcon && (
                    <div className="ml-auto">
                      {statusIcon}
                    </div>
                  )}
                  
                  {document.id === "api-documentation" && (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0 rounded-full ml-auto">
                          <span className="sr-only">Info</span>
                          <div className="h-4 w-4 rounded-full border border-foreground flex items-center justify-center text-xs">i</div>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80 p-3">
                        <p className="text-sm">
                          Generates API endpoints documentation based on screen interactions and data requirements.
                        </p>
                      </PopoverContent>
                    </Popover>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            disabled={isGenerating}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleGenerateDocuments}
            disabled={selectedDocuments.length === 0 || isGenerating}
            className="gap-2"
          >
            {isGenerating ? (
              <>
                <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <BookOpenCheck className="h-4 w-4" />
                Generate Documents
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
