import { useState, useEffect, useMemo } from "react";
import { Conversation } from "@/components/chat/ConversationSidebar";

export type SortOption = "newest" | "oldest";

export function useConversationSearch(conversations: Conversation[]) {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("newest");

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Filter and sort conversations
  const filteredAndSortedConversations = useMemo(() => {
    let filtered = conversations;

    // Filter by search query
    if (debouncedQuery.trim()) {
      const query = debouncedQuery.toLowerCase();
      filtered = conversations.filter(
        (conv) =>
          conv.title.toLowerCase().includes(query) ||
          conv.lastMessage.toLowerCase().includes(query)
      );
    }

    // Sort conversations
    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === "newest") {
        return b.timestamp.getTime() - a.timestamp.getTime();
      } else {
        return a.timestamp.getTime() - b.timestamp.getTime();
      }
    });

    return sorted;
  }, [conversations, debouncedQuery, sortBy]);

  // Group conversations by date
  const groupedConversations = useMemo(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const thisWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    const groups = {
      today: [] as Conversation[],
      thisWeek: [] as Conversation[],
      earlier: [] as Conversation[],
    };

    filteredAndSortedConversations.forEach((conv) => {
      const convDate = new Date(conv.timestamp.getFullYear(), conv.timestamp.getMonth(), conv.timestamp.getDate());
      
      if (convDate.getTime() === today.getTime()) {
        groups.today.push(conv);
      } else if (convDate.getTime() > thisWeek.getTime()) {
        groups.thisWeek.push(conv);
      } else {
        groups.earlier.push(conv);
      }
    });

    return groups;
  }, [filteredAndSortedConversations]);

  return {
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    filteredAndSortedConversations,
    groupedConversations,
  };
}