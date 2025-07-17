
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel } from "@/components/ui/sidebar";
import { PanelLeftClose, PanelLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectSwitcher } from "./sidebar/ProjectSwitcher";
import { ProfileMenu } from "./sidebar/ProfileMenu";
import { InitialFlow } from "./sidebar/InitialFlow";
import { AdvancedTools } from "./sidebar/AdvancedTools";
import { useSidebar } from "@/components/ui/sidebar";

export function AppSidebar() {
  const { toggleSidebar, state } = useSidebar();
  
  return (
    <Sidebar className="w-80 animate-sidebar-slide border-r border-sidebar-border">
      <div className="h-14 flex items-center px-3 md:px-6 border-b gap-2 justify-between">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar} 
            className="h-8 w-8"
            aria-label={state === "expanded" ? "Collapse sidebar" : "Expand sidebar"}
          >
            {state === "expanded" ? <PanelLeftClose className="h-4 w-4" /> : <PanelLeft className="h-4 w-4" />}
          </Button>
          <ProjectSwitcher />
        </div>
        <ProfileMenu />
      </div>

      <SidebarContent className="py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="px-6 text-sm font-medium text-muted-foreground">Project Name</SidebarGroupLabel>
          <SidebarGroupContent>
            <InitialFlow />
          </SidebarGroupContent>
        </SidebarGroup>

        <AdvancedTools />
      </SidebarContent>
    </Sidebar>
  );
}
