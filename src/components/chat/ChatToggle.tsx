import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { useChat } from "@/context/ChatContext";
import { cn } from "@/lib/utils";

interface ChatToggleProps {
  className?: string;
}

export function ChatToggle({ className }: ChatToggleProps) {
  const { toggleChat, isChatOpen } = useChat();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleChat}
      className={cn(
        "fixed bottom-6 right-6 h-12 w-12 rounded-full shadow-lg z-40",
        isChatOpen && "bg-primary text-primary-foreground",
        className
      )}
      title={isChatOpen ? "Close chat" : "Open chat"}
    >
      <MessageSquare className="h-5 w-5" />
    </Button>
  );
}