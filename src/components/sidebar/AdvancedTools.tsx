
import { Clock, Loader2, CheckCircle, FileText, TestTube, Database, Code2, MessageSquare, ChevronRight, Clipboard, Laptop } from "lucide-react";
import { Link } from "react-router-dom";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarGroup } from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useDocumentGeneration } from "@/context/DocumentGenerationContext";
import { useMemo, useState } from "react";

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
  const [productTeamOpen, setProductTeamOpen] = useState(false);
  const [developerToolsOpen, setDeveloperToolsOpen] = useState(false);

  // Tool categories with their items (Chat removed)
  const toolCategories = useMemo(() => [
    {
      name: "Product Team Tools",
      icon: Clipboard,
      isOpen: productTeamOpen,
      setIsOpen: setProductTeamOpen,
      tools: [
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
        }
      ]
    },
    {
      name: "Developer Tools",
      icon: Laptop,
      isOpen: developerToolsOpen,
      setIsOpen: setDeveloperToolsOpen,
      tools: [
        {
          name: "Frontend",
          path: "/frontend",
          icon: Code2
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
        }
      ]
    }
  ], [productTeamOpen, developerToolsOpen]);

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

  // Render category-based tool sections following InitialSetup pattern
  return (
    <>
      <SidebarMenu>
        {/* Category dropdowns */}
        {toolCategories.map(category => {
          const CategoryIcon = category.icon;
          
          return (
            <SidebarMenuItem key={category.name}>
              <div className="px-6 py-2">
                <Collapsible 
                  open={category.isOpen} 
                  onOpenChange={category.setIsOpen}
                  className="w-full"
                >
                  <CollapsibleTrigger className="flex items-center justify-between w-full text-sm font-normal">
                    <span>{category.name}</span>
                    <ChevronRight className={`h-4 w-4 transition-transform ${category.isOpen ? 'rotate-90' : ''}`} />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-2">
                    {category.tools.map(tool => {
                      const statusIcon = getStatusIcon(tool.docId);
                      const IconComponent = tool.icon;
                      
                      return (
                        <SidebarMenuItem key={tool.name}>
                          <SidebarMenuButton asChild>
                            <Link 
                              to={tool.path} 
                              className="flex items-center gap-3 px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-accent relative group"
                            >
                              <div className="flex items-center gap-3">
                                <IconComponent className="h-5 w-5" />
                              </div>
                              <span>{tool.name}</span>
                              {statusIcon}
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })}
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </SidebarMenuItem>
          );
        })}

        {/* Standalone Chat item */}
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link 
              to="/chat" 
              className="flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors hover:bg-sidebar-accent relative group"
            >
              <div className="flex items-center gap-3">
                <MessageSquare className="h-5 w-5" />
              </div>
              <span>Chat</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </>
  );
}
