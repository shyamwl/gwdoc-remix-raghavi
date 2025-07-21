
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, Send, Mic, MicOff, Plus, X, FileText, Image, File } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { ConversationSidebar, type Conversation } from "@/components/chat/ConversationSidebar";

// Type declarations for Web Speech API
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

interface Message {
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

const Chat = () => {
  // Conversation state
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  
  // Message state
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm GravityDoc AI, your interactive assistant. I can help you customize your workspace, answer questions about your documentation, and make changes to your project. You can type or use voice input to communicate with me.",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load conversations from localStorage on mount
  useEffect(() => {
    const savedConversations = localStorage.getItem('gravity-doc-conversations');
    if (savedConversations) {
      const parsed = JSON.parse(savedConversations);
      const conversationsWithDates = parsed.map((conv: any) => ({
        ...conv,
        timestamp: new Date(conv.timestamp),
      }));
      setConversations(conversationsWithDates);
      
      // Set the most recent conversation as active if no conversation is selected
      if (conversationsWithDates.length > 0 && !activeConversationId) {
        const mostRecent = conversationsWithDates.sort((a: Conversation, b: Conversation) => 
          b.timestamp.getTime() - a.timestamp.getTime()
        )[0];
        setActiveConversationId(mostRecent.id);
        loadConversationMessages(mostRecent.id);
      }
    } else {
      // Create initial conversation if no conversations exist
      createNewConversation();
    }
  }, []);

  // Save conversations to localStorage whenever they change
  useEffect(() => {
    if (conversations.length > 0) {
      localStorage.setItem('gravity-doc-conversations', JSON.stringify(conversations));
    }
  }, [conversations]);

  useEffect(() => {
    // Initialize speech recognition
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

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const maxSize = 10 * 1024 * 1024; // 10MB limit
    const allowedTypes = ['image/', 'text/', 'application/pdf', 'application/json'];
    
    const validFiles = files.filter(file => {
      if (file.size > maxSize) {
        toast({
          title: "File too large",
          description: `${file.name} is larger than 10MB`,
          variant: "destructive",
        });
        return false;
      }
      
      const isValidType = allowedTypes.some(type => file.type.startsWith(type));
      if (!isValidType) {
        toast({
          title: "Invalid file type",
          description: `${file.name} is not a supported file type`,
          variant: "destructive",
        });
        return false;
      }
      
      return true;
    });
    
    if (validFiles.length > 0) {
      setSelectedFiles(prev => [...prev, ...validFiles]);
      toast({
        title: "Files selected",
        description: `${validFiles.length} file(s) ready to send`,
      });
    }
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() && selectedFiles.length === 0) return;

    // Create file attachments
    const attachments = selectedFiles.map(file => ({
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file), // In a real app, you'd upload to a server
    }));

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue || "📎 File attachment",
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
      const title = inputValue.length > 30 ? inputValue.substring(0, 30) + "..." : inputValue;
      updateConversationTitle(activeConversationId, title || "New Chat");
    }

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = attachments.length > 0 
        ? `I can see you've shared ${attachments.length} file(s). I can help analyze documents, images, and other files to assist with your GravityDoc project. ${generateAIResponse(inputValue)}`
        : generateAIResponse(inputValue);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: "ai",
        timestamp: new Date(),
      };
      
      const finalMessages = [...updatedMessages, aiMessage];
      setMessages(finalMessages);
      setIsTyping(false);

      // Save messages and update conversation
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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e as any);
    }
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) return <Image className="h-4 w-4" />;
    if (fileType.startsWith('text/') || fileType === 'application/json') return <FileText className="h-4 w-4" />;
    return <File className="h-4 w-4" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Conversation management functions
  const createNewConversation = () => {
    const newConversation: Conversation = {
      id: Date.now().toString(),
      title: "New Chat",
      lastMessage: "Start a conversation...",
      timestamp: new Date(),
    };
    
    setConversations(prev => [newConversation, ...prev]);
    setActiveConversationId(newConversation.id);
    
    // Reset messages to initial state
    setMessages([
      {
        id: "1",
        content: "Hello! I'm GravityDoc AI, your interactive assistant. I can help you customize your workspace, answer questions about your documentation, and make changes to your project. You can type or use voice input to communicate with me.",
        sender: "ai",
        timestamp: new Date(),
      },
    ]);
    
    // Save the new conversation's messages
    saveConversationMessages(newConversation.id, [
      {
        id: "1",
        content: "Hello! I'm GravityDoc AI, your interactive assistant. I can help you customize your workspace, answer questions about your documentation, and make changes to your project. You can type or use voice input to communicate with me.",
        sender: "ai",
        timestamp: new Date(),
      },
    ]);
  };

  const selectConversation = (conversationId: string) => {
    setActiveConversationId(conversationId);
    loadConversationMessages(conversationId);
  };

  const deleteConversation = (conversationId: string) => {
    setConversations(prev => prev.filter(conv => conv.id !== conversationId));
    
    // Remove messages from localStorage
    localStorage.removeItem(`gravity-doc-messages-${conversationId}`);
    
    // If we're deleting the active conversation, switch to another or create new
    if (conversationId === activeConversationId) {
      const remaining = conversations.filter(conv => conv.id !== conversationId);
      if (remaining.length > 0) {
        selectConversation(remaining[0].id);
      } else {
        createNewConversation();
      }
    }
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

  const updateConversationTitle = (conversationId: string, newTitle: string) => {
    setConversations(prev => prev.map(conv => 
      conv.id === conversationId 
        ? { ...conv, title: newTitle, timestamp: new Date() }
        : conv
    ));
  };

  const renameConversation = (conversationId: string, newTitle: string) => {
    updateConversationTitle(conversationId, newTitle);
    toast({
      title: "Conversation renamed",
      description: `Renamed to "${newTitle}"`,
    });
  };

  return (
    <div className="flex h-[calc(100vh-2rem)] bg-background -mx-6 -my-4 gap-4">
      {/* Conversation Sidebar */}
      <ConversationSidebar
        conversations={conversations}
        activeConversationId={activeConversationId}
        onSelectConversation={selectConversation}
        onNewChat={createNewConversation}
        onDeleteConversation={deleteConversation}
        onRenameConversation={renameConversation}
        className="border-r shadow-sm ml-4"
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-background min-w-0">
        {/* Chat Header */}
        <header className="border-b p-4 bg-background">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            <h1 className="text-lg font-semibold">GravityDoc Chat</h1>
            <span className="text-sm text-muted-foreground ml-2">Interactive Assistant</span>
          </div>
        </header>

        {/* Chat Messages */}
        <div className="flex-1 overflow-auto p-4">
          <div className="mx-auto max-w-4xl space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.sender === "ai" && (
                <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="h-4 w-4" />
                </div>
              )}
              
              <div
                className={`max-w-[70%] rounded-lg p-4 ${
                  message.sender === "user"
                    ? "bg-gray-100 text-gray-900 rounded-br-none"
                    : "bg-blue-50 text-blue-900 rounded-bl-none"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium">
                    {message.sender === "user" ? "You" : "GravityDoc"}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                </div>
                <p className="text-sm whitespace-pre-line">{message.content}</p>
                
                {/* Display attachments */}
                {message.attachments && message.attachments.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {message.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-white/50 rounded border">
                        {getFileIcon(attachment.type)}
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium truncate">{attachment.name}</p>
                          <p className="text-xs text-muted-foreground">{formatFileSize(attachment.size)}</p>
                        </div>
                        {attachment.type.startsWith('image/') && (
                          <img
                            src={attachment.url}
                            alt={attachment.name}
                            className="w-8 h-8 object-cover rounded"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {message.sender === "user" && (
                <div className="h-8 w-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="h-4 w-4" />
                </div>
              )}
            </div>
          ))}
          
          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-3 justify-start">
              <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                <MessageSquare className="h-4 w-4" />
              </div>
              <div className="bg-blue-50 text-blue-900 rounded-lg rounded-bl-none p-4 max-w-[70%]">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium">GravityDoc</span>
                  <span className="text-xs text-muted-foreground">typing...</span>
                </div>
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Chat Input */}
        <div className="border-t bg-background p-4">
          <div className="mx-auto max-w-4xl">
          {/* Selected Files Preview */}
          {selectedFiles.length > 0 && (
            <div className="mb-3 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  {selectedFiles.length} file(s) selected
                </span>
              </div>
              <div className="space-y-2">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-white rounded border">
                    {getFileIcon(file.type)}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate">{file.name}</p>
                      <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                      className="h-6 w-6 p-0"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleFileSelect}
              className="hidden"
              accept="image/*,text/*,.pdf,.json"
            />
            
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="flex-shrink-0"
              onClick={() => fileInputRef.current?.click()}
              title="Add file attachment"
            >
              <Plus className="h-4 w-4" />
            </Button>
            
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
              placeholder="Type your message or use voice input..."
            />
            
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={handleVoiceInput}
              className={`flex-shrink-0 ${
                isListening ? "bg-red-100 text-red-600 border-red-200" : ""
              }`}
              title={isListening ? "Stop listening" : "Voice input"}
            >
              {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </Button>
            
            <Button type="submit" className="flex-shrink-0">
              <Send className="h-4 w-4" />
            </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
