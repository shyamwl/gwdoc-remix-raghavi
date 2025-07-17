
import { Clock, Loader2, CheckCircle, FileText, TestTube, Database, Code2, MessageSquare, ChevronDown, Clipboard, Laptop } from "lucide-react";
import { Link } from "react-router-dom";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarGroup, SidebarGroupContent, SidebarGroupLabel } from "@/components/ui/sidebar";
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
  const [chatOpen, setChatOpen] = useState(false);

  // Tool categories with their items
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
          path: "#",
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
    },
    {
      name: "Chat",
      icon: MessageSquare,
      isOpen: chatOpen,
      setIsOpen: setChatOpen,
      tools: [
        {
          name: "Chat",
          path: "/chat",
          icon: MessageSquare
        }
      ]
    }
  ], [productTeamOpen, developerToolsOpen, chatOpen]);

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
    <SidebarGroup className="mt-6">
      {toolCategories.map(category => {
        const CategoryIcon = category.icon;
        
        return (
          <Collapsible key={category.name} open={category.isOpen} onOpenChange={category.setIsOpen}>
            <CollapsibleTrigger asChild>
              <SidebarGroupLabel className="px-6 text-sm font-bold text-muted-foreground hover:text-foreground cursor-pointer flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <CategoryIcon className="h-4 w-4" />
                  <span>{category.name}</span>
                </div>
                <ChevronDown className={`h-4 w-4 transition-transform ${category.isOpen ? "rotate-180" : ""}`} />
              </SidebarGroupLabel>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {category.tools.map(tool => {
                    const statusIcon = getStatusIcon(tool.docId);
                    const IconComponent = tool.icon;
                    
                    return (
                      <SidebarMenuItem key={tool.name}>
                        <SidebarMenuButton asChild>
                          <Link
                            to={tool.path}
                            className="flex items-center justify-between px-8 py-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <IconComponent className="h-5 w-5 stroke-[2.5]" />
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
            </CollapsibleContent>
          </Collapsible>
        );
      })}
    </SidebarGroup>
  );
}
