import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  MessageSquare, 
  Send, 
  Mic, 
  MicOff, 
  Plus, 
  X, 
  FileText, 
  Image, 
  File,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ConversationSidebar } from "@/components/chat/ConversationSidebar";
import { useChat } from "@/context/ChatContext";

export function ChatPanel() {
  const {
    isChatOpen,
    closeChat,
    conversations,
    activeConversationId,
    messages,
    inputValue,
    setInputValue,
    selectedFiles,
    setSelectedFiles,
    isListening,
    isTyping,
    sendMessage,
    createNewConversation,
    selectConversation,
    deleteConversation,
    renameConversation,
    handleVoiceInput,
  } = useChat();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const maxSize = 10 * 1024 * 1024; // 10MB limit
    const allowedTypes = ['image/', 'text/', 'application/pdf', 'application/json'];
    
    const validFiles = files.filter(file => {
      if (file.size > maxSize) return false;
      return allowedTypes.some(type => file.type.startsWith(type));
    });
    
    if (validFiles.length > 0) {
      setSelectedFiles([...selectedFiles, ...validFiles]);
    }
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue, selectedFiles);
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

  const formatTimestamp = (timestamp: Date) => {
    return timestamp.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (!isChatOpen) return null;

  return (
    <div className="fixed right-0 top-0 h-screen w-96 bg-background border-l border-border shadow-lg z-50 flex">
      {/* Conversation Sidebar */}
      <ConversationSidebar
        conversations={conversations}
        activeConversationId={activeConversationId}
        onSelectConversation={selectConversation}
        onNewChat={createNewConversation}
        onDeleteConversation={deleteConversation}
        onRenameConversation={renameConversation}
        className="border-r"
      />

      {/* Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b border-border bg-background">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-primary" />
            <span className="font-medium text-sm">GravityDoc Chat</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={closeChat}
            className="h-6 w-6"
          >
            <ChevronRight className="h-3 w-3" />
          </Button>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-3">
          <div className="space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-2",
                  message.sender === "user" ? "justify-end" : "justify-start"
                )}
              >
                {message.sender === "ai" && (
                  <div className="h-6 w-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-1">
                    <MessageSquare className="h-3 w-3" />
                  </div>
                )}
                
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg p-2 text-xs",
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  )}
                >
                  <div className="flex items-center gap-1 mb-1">
                    <span className="font-medium">
                      {message.sender === "user" ? "You" : "AI"}
                    </span>
                    <span className="text-[10px] opacity-70">
                      {formatTimestamp(message.timestamp)}
                    </span>
                  </div>
                  <p className="whitespace-pre-line">{message.content}</p>
                  
                  {message.attachments && message.attachments.length > 0 && (
                    <div className="mt-1 space-y-1">
                      {message.attachments.map((attachment, index) => (
                        <div key={index} className="flex items-center gap-1 p-1 bg-white/50 rounded text-[10px]">
                          {getFileIcon(attachment.type)}
                          <span className="truncate">{attachment.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {message.sender === "user" && (
                  <div className="h-6 w-6 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center flex-shrink-0 mt-1">
                    <MessageSquare className="h-3 w-3" />
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-2 justify-start">
                <div className="h-6 w-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-1">
                  <MessageSquare className="h-3 w-3" />
                </div>
                <div className="bg-muted rounded-lg p-2 text-xs">
                  <div className="flex items-center gap-1 mb-1">
                    <span className="font-medium">AI</span>
                    <span className="text-[10px] opacity-70">typing...</span>
                  </div>
                  <div className="flex gap-1">
                    <div className="w-1 h-1 bg-primary rounded-full animate-bounce"></div>
                    <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t border-border p-3">
          {/* Selected Files */}
          {selectedFiles.length > 0 && (
            <div className="mb-2 p-2 bg-muted rounded-lg">
              <div className="text-xs font-medium mb-1">
                {selectedFiles.length} file(s) selected
              </div>
              <div className="space-y-1">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="flex items-center gap-1 text-xs">
                    {getFileIcon(file.type)}
                    <span className="flex-1 truncate">{file.name}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFile(index)}
                      className="h-4 w-4"
                    >
                      <X className="h-2 w-2" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <form onSubmit={handleSendMessage} className="flex gap-1">
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
              className="h-8 w-8 flex-shrink-0"
              onClick={() => fileInputRef.current?.click()}
            >
              <Plus className="h-3 w-3" />
            </Button>
            
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 h-8 text-xs"
              placeholder="Type your message..."
            />
            
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={handleVoiceInput}
              className={cn(
                "h-8 w-8 flex-shrink-0",
                isListening && "bg-red-100 text-red-600 border-red-200"
              )}
            >
              {isListening ? <MicOff className="h-3 w-3" /> : <Mic className="h-3 w-3" />}
            </Button>
            
            <Button type="submit" size="icon" className="h-8 w-8 flex-shrink-0">
              <Send className="h-3 w-3" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}