
import { Clock, Loader2, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { useDocumentGeneration } from "@/context/DocumentGenerationContext";
import { useMemo } from "react";

// Map document IDs to sidebar item paths
const documentToSidebarMap: Record<string, string> = {
  "user-stories": "User Stories",
  "acceptance-criteria": "Requirements",
  "api-documentation": "API Docs",
  "database-schema": "DB Schema",
  "flow-chart": "Logic Charts",
  "test-cases": "Test Cases",
  "landing-page": "Field Labels",
  "knowledge-base": "Missing Frames"
};

export function AdvancedTools() {
  const { documentStatus, isGeneratingDocuments } = useDocumentGeneration();

  // Simple flat list of tools as requested
  const tools = useMemo(() => [
    {
      name: "User Stories",
      path: "/user-stories",
      docId: "user-stories"
    },
    {
      name: "Test Cases",
      path: "#",
      docId: "test-cases"
    },
    {
      name: "DB Schema",
      path: "/database-schema",
      docId: "database-schema"
    },
    {
      name: "API Docs",
      path: "/api-docs",
      docId: "api-documentation"
    },
    {
      name: "Validation",
      path: "#"
    },
    {
      name: "Chat",
      path: "/chat"
    }
  ], []);

  // Function to get the appropriate status icon
  const getStatusIcon = (docId?: string) => {
    if (!docId || !isGeneratingDocuments) return null;
    
    const status = documentStatus[docId];
    if (!status) return null;
    
    switch (status) {
      case "waiting":
        return <Clock className="h-4 w-4 text-muted-foreground animate-pulse ml-auto" />;
      case "in-progress":
        return <Loader2 className="h-4 w-4 text-primary animate-spin ml-auto" />;
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500 ml-auto" />;
      default:
        return null;
    }
  };

  return (
    <SidebarMenu>
      {tools.map(tool => {
        const statusIcon = getStatusIcon(tool.docId);
        
        return (
          <SidebarMenuItem key={tool.name}>
            <SidebarMenuButton asChild>
              <Link
                to={tool.path}
                className="flex items-center justify-between px-6 py-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <span>{tool.name}</span>
                {statusIcon}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}
