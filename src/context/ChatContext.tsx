import React, { createContext, useContext, useState, useRef, useEffect } from "react";
import { toast } from "@/hooks/use-toast";

// Types from Chat.tsx
interface SpeechRecognitionEvent extends Event {
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
    };
  };
}

interface SpeechRecognitionConstructor {
  new(): SpeechRecognition;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: Event) => void;
  onend: () => void;
}

declare global {
  interface Window {
    webkitSpeechRecognition: SpeechRecognitionConstructor;
    SpeechRecognition: SpeechRecognitionConstructor;
  }
}

export interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  attachments?: {
    name: string;
    size: number;
    type: string;
    url: string;
  }[];
}

export interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
  isActive?: boolean;
}

interface ChatContextType {
  // Panel state
  isChatOpen: boolean;
  toggleChat: () => void;
  openChat: () => void;
  closeChat: () => void;
  
  // Conversation state
  conversations: Conversation[];
  activeConversationId: string | null;
  messages: Message[];
  
  // Input state
  inputValue: string;
  setInputValue: (value: string) => void;
  selectedFiles: File[];
  setSelectedFiles: (files: File[]) => void;
  isListening: boolean;
  isTyping: boolean;
  
  // Actions
  sendMessage: (content: string, files?: File[]) => void;
  createNewConversation: () => void;
  selectConversation: (id: string) => void;
  deleteConversation: (id: string) => void;
  renameConversation: (id: string, title: string) => void;
  handleVoiceInput: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  // Panel state
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  // Conversation state
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  
  // Input state
  const [inputValue, setInputValue] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  
  // Refs
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        setIsListening(false);
        toast({
          title: "Voice input received",
          description: "You can review and edit before sending.",
        });
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
        toast({
          title: "Voice input error",
          description: "Please try again or type your message.",
          variant: "destructive",
        });
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  // Load conversations on mount
  useEffect(() => {
    const savedConversations = localStorage.getItem('gravity-doc-conversations');
    if (savedConversations) {
      const parsed = JSON.parse(savedConversations);
      const conversationsWithDates = parsed.map((conv: any) => ({
        ...conv,
        timestamp: new Date(conv.timestamp),
      }));
      setConversations(conversationsWithDates);
      
      if (conversationsWithDates.length > 0 && !activeConversationId) {
        const mostRecent = conversationsWithDates.sort((a: Conversation, b: Conversation) => 
          b.timestamp.getTime() - a.timestamp.getTime()
        )[0];
        setActiveConversationId(mostRecent.id);
        loadConversationMessages(mostRecent.id);
      }
    } else {
      createNewConversation();
    }
  }, []);

  // Save conversations
  useEffect(() => {
    if (conversations.length > 0) {
      localStorage.setItem('gravity-doc-conversations', JSON.stringify(conversations));
    }
  }, [conversations]);

  // Panel actions
  const toggleChat = () => setIsChatOpen(!isChatOpen);
  const openChat = () => setIsChatOpen(true);
  const closeChat = () => setIsChatOpen(false);

  // Conversation management
  const createNewConversation = () => {
    const newConversation: Conversation = {
      id: Date.now().toString(),
      title: "New Chat",
      lastMessage: "Start a conversation...",
      timestamp: new Date(),
    };
    
    setConversations(prev => [newConversation, ...prev]);
    setActiveConversationId(newConversation.id);
    
    const initialMessage: Message = {
      id: "1",
      content: "Hello! I'm GravityDoc AI, your interactive assistant. I can help you customize your workspace, answer questions about your documentation, and make changes to your project. You can type or use voice input to communicate with me.",
      sender: "ai",
      timestamp: new Date(),
    };
    
    setMessages([initialMessage]);
    saveConversationMessages(newConversation.id, [initialMessage]);
  };

  const selectConversation = (conversationId: string) => {
    setActiveConversationId(conversationId);
    loadConversationMessages(conversationId);
  };

  const deleteConversation = (conversationId: string) => {
    setConversations(prev => prev.filter(conv => conv.id !== conversationId));
    localStorage.removeItem(`gravity-doc-messages-${conversationId}`);
    
    if (conversationId === activeConversationId) {
      const remaining = conversations.filter(conv => conv.id !== conversationId);
      if (remaining.length > 0) {
        selectConversation(remaining[0].id);
      } else {
        createNewConversation();
      }
    }
  };

  const renameConversation = (conversationId: string, newTitle: string) => {
    setConversations(prev => prev.map(conv => 
      conv.id === conversationId 
        ? { ...conv, title: newTitle, timestamp: new Date() }
        : conv
    ));
    toast({
      title: "Conversation renamed",
      description: `Renamed to "${newTitle}"`,
    });
  };

  const saveConversationMessages = (conversationId: string, messages: Message[]) => {
    localStorage.setItem(`gravity-doc-messages-${conversationId}`, JSON.stringify(messages));
  };

  const loadConversationMessages = (conversationId: string) => {
    const savedMessages = localStorage.getItem(`gravity-doc-messages-${conversationId}`);
    if (savedMessages) {
      const parsed = JSON.parse(savedMessages);
      const messagesWithDates = parsed.map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp),
      }));
      setMessages(messagesWithDates);
    }
  };

  // Message sending
  const sendMessage = async (content: string, files: File[] = []) => {
    if (!content.trim() && files.length === 0) return;

    const attachments = files.map(file => ({
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file),
    }));

    const userMessage: Message = {
      id: Date.now().toString(),
      content: content || "📎 File attachment",
      sender: "user",
      timestamp: new Date(),
      attachments: attachments.length > 0 ? attachments : undefined,
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputValue("");
    setSelectedFiles([]);
    setIsTyping(true);

    // Update conversation title if it's the first user message
    if (activeConversationId && updatedMessages.filter(m => m.sender === "user").length === 1) {
      const title = content.length > 30 ? content.substring(0, 30) + "..." : content;
      renameConversation(activeConversationId, title || "New Chat");
    }

    // Generate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(content);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: "ai",
        timestamp: new Date(),
      };
      
      const finalMessages = [...updatedMessages, aiMessage];
      setMessages(finalMessages);
      setIsTyping(false);

      if (activeConversationId) {
        saveConversationMessages(activeConversationId, finalMessages);
        setConversations(prev => prev.map(conv => 
          conv.id === activeConversationId 
            ? { 
                ...conv, 
                lastMessage: aiResponse.length > 50 ? aiResponse.substring(0, 50) + "..." : aiResponse,
                timestamp: new Date() 
              }
            : conv
        ));
      }
    }, 1500);
  };

  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes("add") && input.includes("api")) {
      return "I can help you add a new API documentation section. I'll create a new API Docs tab in your navigation with endpoints, authentication details, and example requests/responses. Would you like me to proceed with this change?";
    }
    
    if (input.includes("change") && input.includes("icon")) {
      return "I can help you change icons in your interface. Which specific icon would you like to modify? For example, I can update icons in the sidebar navigation, screen documentation, or other sections of GravityDoc.";
    }
    
    if (input.includes("note") && input.includes("screen")) {
      return "I'll add a helpful note to your Screen Documentation section. This could include usage tips, best practices, or important reminders for your team. What specific note would you like me to add?";
    }
    
    if (input.includes("remove") || input.includes("delete")) {
      return "I can help you remove or reorganize sections in GravityDoc. Please specify which feature or section you'd like me to remove, and I'll make that change for you.";
    }
    
    if (input.includes("help") || input.includes("what can you do")) {
      return "I can help you with various tasks:\n\n• Add new documentation sections\n• Modify existing features and layouts\n• Change icons and styling\n• Reorganize content structure\n• Answer questions about your project\n• Provide guidance on best practices\n\nJust tell me what you'd like to change or ask any questions!";
    }
    
    return "I understand your request. As your GravityDoc assistant, I'm here to help you customize and improve your documentation workspace. Could you provide more specific details about what you'd like me to help you with?";
  };

  const handleVoiceInput = () => {
    if (!recognitionRef.current) {
      toast({
        title: "Voice input not supported",
        description: "Your browser doesn't support voice input.",
        variant: "destructive",
      });
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setIsListening(true);
      recognitionRef.current.start();
      toast({
        title: "Listening...",
        description: "Speak your message now.",
      });
    }
  };

  const value: ChatContextType = {
    // Panel state
    isChatOpen,
    toggleChat,
    openChat,
    closeChat,
    
    // Conversation state
    conversations,
    activeConversationId,
    messages,
    
    // Input state
    inputValue,
    setInputValue,
    selectedFiles,
    setSelectedFiles,
    isListening,
    isTyping,
    
    // Actions
    sendMessage,
    createNewConversation,
    selectConversation,
    deleteConversation,
    renameConversation,
    handleVoiceInput,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}