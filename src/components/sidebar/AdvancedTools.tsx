
import { Clock, Loader2, CheckCircle, FileText, TestTube, Database, Code2, Shield, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarGroup, SidebarGroupContent, SidebarGroupLabel } from "@/components/ui/sidebar";
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

  // Tools with icons
  const tools = useMemo(() => [
    {
      name: "User Stories",
      path: "/user-stories",
      docId: "user-stories",
      icon: FileText
    },
    {
      name: "Test Cases",
      path: "#",
      docId: "test-cases",
      icon: TestTube
    },
    {
      name: "DB Schema",
      path: "/database-schema",
      docId: "database-schema",
      icon: Database
    },
    {
      name: "API Docs",
      path: "/api-docs",
      docId: "api-documentation",
      icon: Code2
    },
    {
      name: "Validation",
      path: "#",
      icon: Shield
    },
    {
      name: "Chat",
      path: "/chat",
      icon: MessageSquare
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
    <SidebarGroup>
      <SidebarGroupLabel className="px-6 text-sm font-medium text-muted-foreground">Tools</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {tools.map(tool => {
            const statusIcon = getStatusIcon(tool.docId);
            const IconComponent = tool.icon;
            
            return (
              <SidebarMenuItem key={tool.name}>
                <SidebarMenuButton asChild>
                  <Link
                    to={tool.path}
                    className="flex items-center justify-between px-6 py-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <IconComponent className="h-5 w-5" />
                      <span>{tool.name}</span>
                    </div>
                    {statusIcon}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
