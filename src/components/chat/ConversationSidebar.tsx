import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, MessageSquare, ChevronLeft, ChevronRight, MoreHorizontal, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
  isActive?: boolean;
}

interface ConversationSidebarProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onNewChat: () => void;
  onDeleteConversation?: (id: string) => void;
  className?: string;
}

export function ConversationSidebar({
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewChat,
  onDeleteConversation,
  className,
}: ConversationSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Load sidebar state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('chat-sidebar-collapsed');
    if (saved) {
      setIsCollapsed(JSON.parse(saved));
    }
  }, []);

  // Save sidebar state to localStorage
  useEffect(() => {
    localStorage.setItem('chat-sidebar-collapsed', JSON.stringify(isCollapsed));
  }, [isCollapsed]);

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) {
      return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (days === 1) {
      return 'Yesterday';
    } else if (days < 7) {
      return `${days} days ago`;
    } else {
      return timestamp.toLocaleDateString();
    }
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div 
      className={cn(
        "relative bg-background border-r border-border transition-all duration-300 ease-in-out",
        isCollapsed ? "w-14" : "w-64",
        className
      )}
    >
      {/* Collapse/Expand Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-4 z-10 h-6 w-6 rounded-full border bg-background shadow-md hover:bg-accent"
        title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? (
          <ChevronRight className="h-3 w-3" />
        ) : (
          <ChevronLeft className="h-3 w-3" />
        )}
      </Button>

      <div className="flex h-full flex-col">
        {/* Header with New Chat Button */}
        <div className="p-3 border-b border-border">
          <Button
            onClick={onNewChat}
            variant="outline"
            className={cn(
              "w-full justify-start gap-2 transition-all duration-200",
              isCollapsed && "justify-center px-2"
            )}
            title="Start new chat"
          >
            <Plus className="h-4 w-4 flex-shrink-0" />
            {!isCollapsed && <span>New Chat</span>}
          </Button>
        </div>

        {/* Conversations List */}
        <ScrollArea className="flex-1">
          <div className="p-2 space-y-1">
            {conversations.length === 0 && !isCollapsed && (
              <div className="text-center text-muted-foreground text-sm py-8">
                <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No conversations yet</p>
                <p className="text-xs">Start a new chat to begin</p>
              </div>
            )}
            
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className={cn(
                  "group relative flex items-start gap-2 rounded-lg p-2 transition-colors cursor-pointer hover:bg-accent",
                  activeConversationId === conversation.id && "bg-accent",
                  isCollapsed && "justify-center p-2"
                )}
                onClick={() => onSelectConversation(conversation.id)}
                title={isCollapsed ? conversation.title : undefined}
              >
                <MessageSquare className="h-4 w-4 flex-shrink-0 mt-0.5 text-muted-foreground" />
                
                {!isCollapsed && (
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-start justify-between gap-1">
                      <h3 className="text-sm font-medium leading-none truncate">
                        {truncateText(conversation.title || "Untitled Chat", 25)}
                      </h3>
                      
                      {/* Options menu */}
                      {onDeleteConversation && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <MoreHorizontal className="h-3 w-3" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-32">
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation();
                                onDeleteConversation(conversation.id);
                              }}
                              className="text-destructive focus:text-destructive"
                            >
                              <Trash2 className="h-3 w-3 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {truncateText(conversation.lastMessage, 40)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatTimestamp(conversation.timestamp)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}