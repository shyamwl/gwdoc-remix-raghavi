import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Plus, 
  MessageSquare, 
  ChevronLeft, 
  ChevronRight, 
  MoreHorizontal, 
  Trash2, 
  Search, 
  Check, 
  X, 
  Edit3,
  ArrowUpDown
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useConversationSearch, type SortOption } from "@/hooks/useConversationSearch";

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
  onRenameConversation?: (id: string, newTitle: string) => void;
  className?: string;
}

export function ConversationSidebar({
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewChat,
  onDeleteConversation,
  onRenameConversation,
  className,
}: ConversationSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [visibleCount, setVisibleCount] = useState(20);
  
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const editInputRef = useRef<HTMLInputElement>(null);

  const {
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    filteredAndSortedConversations,
    groupedConversations,
  } = useConversationSearch(conversations);

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

  // Focus edit input when editing starts
  useEffect(() => {
    if (editingId && editInputRef.current) {
      editInputRef.current.focus();
      editInputRef.current.select();
    }
  }, [editingId]);

  // Lazy loading - load more conversations on scroll
  const handleScroll = useCallback((event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
    const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;
    
    if (scrollPercentage > 0.8 && visibleCount < filteredAndSortedConversations.length) {
      setVisibleCount(prev => Math.min(prev + 20, filteredAndSortedConversations.length));
    }
  }, [filteredAndSortedConversations.length, visibleCount]);

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

  const startRename = (conversation: Conversation) => {
    setEditingId(conversation.id);
    setEditingTitle(conversation.title);
  };

  const saveRename = () => {
    if (editingId && editingTitle.trim() && onRenameConversation) {
      onRenameConversation(editingId, editingTitle.trim());
    }
    setEditingId(null);
    setEditingTitle("");
  };

  const cancelRename = () => {
    setEditingId(null);
    setEditingTitle("");
  };

  const handleRenameKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      saveRename();
    } else if (e.key === "Escape") {
      cancelRename();
    }
  };

  const renderConversationGroup = (conversations: Conversation[], groupTitle?: string) => {
    const visibleConversations = conversations.slice(0, visibleCount);
    
    return (
      <div className="space-y-1">
        {groupTitle && !isCollapsed && conversations.length > 0 && (
          <div className="px-2 py-1">
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {groupTitle}
            </h3>
          </div>
        )}
        
        {visibleConversations.map((conversation) => (
          <div
            key={conversation.id}
            className={cn(
              "group relative flex items-start gap-2 rounded-lg p-2 transition-colors cursor-pointer hover:bg-accent",
              activeConversationId === conversation.id && "bg-accent border border-primary/20",
              isCollapsed && "justify-center p-2"
            )}
            onClick={() => !editingId && onSelectConversation(conversation.id)}
            title={isCollapsed ? conversation.title : undefined}
          >
            <MessageSquare className="h-4 w-4 flex-shrink-0 mt-0.5 text-muted-foreground" />
            
            {!isCollapsed && (
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-start justify-between gap-1">
                  {editingId === conversation.id ? (
                    <div className="flex items-center gap-1 flex-1">
                      <Input
                        ref={editInputRef}
                        value={editingTitle}
                        onChange={(e) => setEditingTitle(e.target.value)}
                        onKeyDown={handleRenameKeyPress}
                        className="h-6 text-xs px-1"
                        onClick={(e) => e.stopPropagation()}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={(e) => {
                          e.stopPropagation();
                          saveRename();
                        }}
                      >
                        <Check className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={(e) => {
                          e.stopPropagation();
                          cancelRename();
                        }}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ) : (
                    <>
                      <h3 className="text-sm font-medium leading-none truncate">
                        {truncateText(conversation.title || "Untitled Chat", 25)}
                      </h3>
                      
                      {/* Options menu */}
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
                        <DropdownMenuContent align="end" className="w-36 z-[9999] bg-background border shadow-xl">
                          {onRenameConversation && (
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation();
                                startRename(conversation);
                              }}
                              className="text-xs"
                            >
                              <Edit3 className="h-3 w-3 mr-2" />
                              Rename
                            </DropdownMenuItem>
                          )}
                          {onDeleteConversation && (
                            <>
                              {onRenameConversation && <DropdownMenuSeparator />}
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onDeleteConversation(conversation.id);
                                }}
                                className="text-destructive focus:text-destructive text-xs"
                              >
                                <Trash2 className="h-3 w-3 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </>
                  )}
                </div>
                
                {editingId !== conversation.id && (
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {truncateText(conversation.lastMessage, 40)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatTimestamp(conversation.timestamp)}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div 
      className={cn(
        "relative bg-background border-r border-border transition-all duration-300 ease-in-out flex flex-col",
        isCollapsed ? "w-14" : "w-64",
        "shadow-sm",
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

      {/* Search and Sort Controls */}
      {!isCollapsed && (
        <div className="p-3 space-y-2 border-b border-border relative z-50">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-3 w-3 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-7 h-8 text-xs"
            />
          </div>
          
          {/* Sort Options */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="h-3 w-3 text-muted-foreground flex-shrink-0" />
            <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
              <SelectTrigger className="h-7 text-xs flex-1">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent 
                className="z-[9999] bg-background border shadow-xl rounded-lg min-w-[120px]"
                sideOffset={4}
                align="start"
              >
                <SelectItem value="newest" className="text-xs">Newest First</SelectItem>
                <SelectItem value="oldest" className="text-xs">Oldest First</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* Conversations List */}
      <ScrollArea 
        className="flex-1 relative z-10" 
        ref={scrollAreaRef}
        onScrollCapture={handleScroll}
      >
        <div className="p-2">
          {filteredAndSortedConversations.length === 0 && !isCollapsed && (
            <div className="text-center text-muted-foreground text-sm py-8">
              <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
              {searchQuery ? (
                <>
                  <p>No conversations found</p>
                  <p className="text-xs">Try adjusting your search</p>
                </>
              ) : (
                <>
                  <p>No conversations yet</p>
                  <p className="text-xs">Start a new chat to begin</p>
                </>
              )}
            </div>
          )}
          
          {/* Grouped conversations or flat list */}
          {!searchQuery && !isCollapsed ? (
            <div className="space-y-4">
              {groupedConversations.today.length > 0 && 
                renderConversationGroup(groupedConversations.today, "Today")}
              {groupedConversations.thisWeek.length > 0 && 
                renderConversationGroup(groupedConversations.thisWeek, "This Week")}
              {groupedConversations.earlier.length > 0 && 
                renderConversationGroup(groupedConversations.earlier, "Earlier")}
            </div>
          ) : (
            renderConversationGroup(filteredAndSortedConversations)
          )}
          
          {/* Loading indicator for lazy loading */}
          {visibleCount < filteredAndSortedConversations.length && (
            <div className="text-center py-2">
              <p className="text-xs text-muted-foreground">
                Showing {visibleCount} of {filteredAndSortedConversations.length} conversations
              </p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}