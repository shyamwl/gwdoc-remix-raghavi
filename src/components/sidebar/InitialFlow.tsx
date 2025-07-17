
import { useState } from "react";
import { LayoutDashboard } from "lucide-react";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { EpicSelector } from "./EpicSelector";
import { InitialSetup } from "./InitialSetup";

export function InitialFlow() {
  const [selectedEpic, setSelectedEpic] = useState<{ id: number; name: string } | null>(null);

  return (
    <>
      <SidebarMenu>
        {/* Epic Library (renamed from Project Library) */}
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link to="/project-library" className="flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors hover:bg-sidebar-accent relative group">
              <div className="flex items-center gap-3">
                <LayoutDashboard className="h-5 w-5" />
              </div>
              <span>Epics Library</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
        
        {/* Epic Selector Dropdown */}
        <SidebarMenuItem>
          <EpicSelector 
            selectedEpic={selectedEpic}
            setSelectedEpic={setSelectedEpic}
          />
        </SidebarMenuItem>

        <div className="px-6 py-2">
          <Separator className="bg-sidebar-border" />
        </div>

        {/* Initial Setup Accordion */}
        <InitialSetup />
      </SidebarMenu>
    </>
  );
}
