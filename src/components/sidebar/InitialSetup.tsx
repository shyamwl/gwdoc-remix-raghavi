
import { useState } from "react";
import { ChevronRight, Image, LayoutList, FileText, FileCode, FileCheck, Check } from "lucide-react";
import { SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

export function InitialSetup() {
  const [isInitialSetupOpen, setIsInitialSetupOpen] = useState(true);
  const location = useLocation();
  
  // Determine which steps are completed
  const isUploadComplete = true; // Hardcoded for now, could be based on state
  const isDescribeComplete = location.pathname === "/backend-logics" || location.pathname === "/app-flow" || location.pathname === "/screen-docs";
  const isBackendLogicsComplete = location.pathname === "/app-flow" || location.pathname === "/screen-docs";
  const isAppFlowComplete = location.pathname === "/screen-docs";

  return (
    <SidebarMenuItem>
      <div className="px-6 py-2">
        <Collapsible 
          open={isInitialSetupOpen} 
          onOpenChange={setIsInitialSetupOpen}
          className="w-full"
        >
          <CollapsibleTrigger className="flex items-center justify-between w-full text-sm font-medium">
            <span>Initial Setup</span>
            <ChevronRight className={`h-4 w-4 transition-transform ${isInitialSetupOpen ? 'rotate-90' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2">
            {/* Upload UI Images with green tick mark */}
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/upload-ui-images" className="flex items-center gap-3 px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-accent relative group">
                  <div className="flex items-center gap-3">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full border text-xs">
                      1
                    </span>
                    <Image className="h-5 w-5" />
                  </div>
                  <span>Upload UI Images</span>
                  {isUploadComplete && <Check className="absolute right-3 h-4 w-4 text-green-500" />}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/* Arrange & Describe */}
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/describe-screens" className="flex items-center gap-3 px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-accent relative group">
                  <div className="flex items-center gap-3">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full border text-xs">
                      2
                    </span>
                    <LayoutList className="h-5 w-5" />
                  </div>
                  <span>Arrange & Describe</span>
                  {isDescribeComplete && <Check className="absolute right-3 h-4 w-4 text-green-500" />}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/* Backend Logics */}
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/backend-logics" className="flex items-center gap-3 px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-accent relative group">
                  <div className="flex items-center gap-3">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full border text-xs">
                      3
                    </span>
                    <FileCode className="h-5 w-5" />
                  </div>
                  <span>Backend Logics</span>
                  {isBackendLogicsComplete && <Check className="absolute right-3 h-4 w-4 text-green-500" />}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/* Confirm App Flow */}
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/app-flow" className="flex items-center gap-3 px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-accent relative group">
                  <div className="flex items-center gap-3">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full border text-xs">
                      4
                    </span>
                    <FileText className="h-5 w-5" />
                  </div>
                  <span>Confirm App Flow</span>
                  {isAppFlowComplete && <Check className="absolute right-3 h-4 w-4 text-green-500" />}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/* Screen Docs */}
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/screen-docs" className="flex items-center gap-3 px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-accent relative group">
                  <div className="flex items-center gap-3">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full border text-xs">
                      5
                    </span>
                    <FileCheck className="h-5 w-5" />
                  </div>
                  <span>Screen Docs</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </SidebarMenuItem>
  );
}
