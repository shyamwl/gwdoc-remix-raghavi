
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Outlet } from "react-router-dom";
import { DocumentGenerationProvider } from "@/context/DocumentGenerationContext";

export function AppLayout() {
  return (
    <SidebarProvider defaultOpen={true}>
      <DocumentGenerationProvider>
        <div className="flex w-full">
          <AppSidebar />
          <SidebarInset className="px-6 py-4 flex-1">
            <Outlet />
          </SidebarInset>
        </div>
      </DocumentGenerationProvider>
    </SidebarProvider>
  );
}
