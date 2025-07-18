
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, Send, Mic, MicOff, Plus } from "lucide-react";
import { toast } from "@/hooks/use-toast";

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
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm GravityDoc AI, your interactive assistant. I can help you customize your workspace, answer questions about your documentation, and make changes to your project. You can type or use voice input to communicate with me.",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputValue);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
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

  return (
    <main className="flex-1 flex flex-col bg-background">
      {/* Chat Header */}
      <header className="border-b p-4">
        <div className="mx-auto flex max-w-4xl items-center gap-2">
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
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="flex-shrink-0"
              title="Add attachment (coming soon)"
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
    </main>
  );
};

export default Chat;
