
import React, { createContext, useContext, useState } from "react";

export type DocumentStatus = "waiting" | "in-progress" | "completed" | null;

export interface DocumentStatusMap {
  [key: string]: DocumentStatus;
}

interface DocumentGenerationContextType {
  documentStatus: DocumentStatusMap;
  setDocumentStatus: React.Dispatch<React.SetStateAction<DocumentStatusMap>>;
  isGeneratingDocuments: boolean;
  setIsGeneratingDocuments: React.Dispatch<React.SetStateAction<boolean>>;
}

const DocumentGenerationContext = createContext<DocumentGenerationContextType | undefined>(undefined);

export const DocumentGenerationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [documentStatus, setDocumentStatus] = useState<DocumentStatusMap>({});
  const [isGeneratingDocuments, setIsGeneratingDocuments] = useState(false);

  return (
    <DocumentGenerationContext.Provider 
      value={{ 
        documentStatus, 
        setDocumentStatus, 
        isGeneratingDocuments, 
        setIsGeneratingDocuments 
      }}
    >
      {children}
    </DocumentGenerationContext.Provider>
  );
};

export const useDocumentGeneration = () => {
  const context = useContext(DocumentGenerationContext);
  if (context === undefined) {
    throw new Error("useDocumentGeneration must be used within a DocumentGenerationProvider");
  }
  return context;
};
