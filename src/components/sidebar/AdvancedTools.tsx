
import { ClipboardList, MessageSquare, Code2, TestTube, Pencil, Clock, Loader2, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { CreateToolDialog } from "./CreateToolDialog";
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

  // Prepare advanced tools array with status indicators
  const advancedTools = useMemo(() => [
    {
      title: "Product Owner Tools",
      icon: ClipboardList,
      items: [{
        name: "User Stories",
        path: "/user-stories",
        docId: "user-stories"
      }, "User Personas", {
        name: "Requirements",
        path: "#",
        docId: "acceptance-criteria"
      }, {
        name: "Project Quiz",
        path: "/quiz/list"
      }]
    }, {
      title: "All Teams",
      icon: MessageSquare,
      items: [{
        name: "Chat",
        path: "/chat"
      }, {
        name: "Custom Prompts",
        path: "#"
      }]
    }, {
      title: "Developer Tools",
      icon: Code2,
      items: [{
        name: "API Docs",
        path: "/api-docs",
        docId: "api-documentation"
      }, "Validation", {
        name: "DB Schema",
        path: "#",
        docId: "database-schema"
      }, {
        name: "Logic Charts",
        path: "#",
        docId: "flow-chart"
      }, "Routes"]
    }, {
      title: "Tester Tools",
      icon: TestTube,
      items: ["Test Plan", {
        name: "Test Cases",
        path: "#",
        docId: "test-cases"
      }]
    }, {
      title: "UI/UX Design",
      icon: Pencil,
      items: [{
        name: "Field Labels",
        path: "#",
        docId: "landing-page"
      }, {
        name: "Missing Frames",
        path: "#",
        docId: "knowledge-base"
      }]
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
      {advancedTools.map(section => (
        <SidebarMenuItem key={section.title}>
          <SidebarMenuButton asChild>
            <button className="w-full text-left">
              <div className="flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors hover:bg-sidebar-accent group">
                <section.icon className="h-5 w-5" />
                <span>{section.title}</span>
                <CreateToolDialog categoryTitle={section.title} />
              </div>
            </button>
          </SidebarMenuButton>
          <div className="pl-14 animate-content-fade">
            {section.items.map(item => {
              const itemName = typeof item === "string" ? item : item.name;
              const itemPath = typeof item === "string" ? "#" : item.path;
              const docId = typeof item === "string" ? undefined : item.docId;
              const statusIcon = getStatusIcon(docId);
              
              return (
                <Link
                  key={itemName}
                  to={itemPath}
                  className="flex items-center justify-between py-2 text-sm text-muted-foreground hover:text-foreground transition-colors mx-[9px]"
                >
                  <span>{itemName}</span>
                  {statusIcon}
                </Link>
              );
            })}
          </div>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
