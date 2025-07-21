
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Outlet } from "react-router-dom";
import { DocumentGenerationProvider } from "@/context/DocumentGenerationContext";
import { ChatProvider } from "@/context/ChatContext";
import { ChatPanel } from "@/components/chat/ChatPanel";
import { ChatToggle } from "@/components/chat/ChatToggle";

export function AppLayout() {
  return (
    <SidebarProvider defaultOpen={true}>
      <DocumentGenerationProvider>
        <ChatProvider>
          <div className="flex w-full min-h-screen">
            <AppSidebar />
            <SidebarInset className="px-6 py-4 flex-1">
              <Outlet />
            </SidebarInset>
            <ChatPanel />
            <ChatToggle />
          </div>
        </ChatProvider>
      </DocumentGenerationProvider>
    </SidebarProvider>
  );
}
