
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, Send } from "lucide-react";

const Chat = () => {
  return (
    <main className="flex-1 flex flex-col bg-background">
      {/* Chat Header */}
      <header className="border-b p-4">
        <div className="mx-auto flex max-w-3xl items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          <h1 className="text-lg font-semibold">Documentation Chat</h1>
        </div>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-auto p-4">
        <div className="mx-auto max-w-3xl space-y-8">
          {/* AI Message */}
          <div className="flex gap-4">
            <div className="h-8 w-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div className="flex-1 space-y-2">
              <p className="text-sm font-medium">Documentation AI</p>
              <div className="rounded-lg bg-muted p-4">
                <p className="text-sm">
                  Hello! I'm here to help you navigate through your documentation. You can ask me questions about your project's features, requirements, or any specific details from your documentation.
                </p>
              </div>
            </div>
          </div>

          {/* User Message */}
          <div className="flex gap-4">
            <div className="h-8 w-8 rounded-lg border bg-background flex items-center justify-center">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div className="flex-1 space-y-2">
              <p className="text-sm font-medium">You</p>
              <div className="rounded-lg border p-4">
                <p className="text-sm">What are the main features of this project?</p>
              </div>
            </div>
          </div>

          {/* AI Response */}
          <div className="flex gap-4">
            <div className="h-8 w-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div className="flex-1 space-y-2">
              <p className="text-sm font-medium">Documentation AI</p>
              <div className="rounded-lg bg-muted p-4">
                <p className="text-sm">
                  Based on your documentation, the main features include:
                </p>
                <ul className="mt-2 list-disc pl-4 text-sm space-y-1">
                  <li>Project Library Management</li>
                  <li>UI Image Upload and Organization</li>
                  <li>Documentation Generation</li>
                  <li>Team Collaboration Tools</li>
                  <li>Developer Documentation Support</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Input */}
      <div className="border-t bg-background p-4">
        <div className="mx-auto max-w-3xl">
          <form className="flex gap-4">
            <Input
              className="flex-1"
              placeholder="Ask a question about your documentation..."
            />
            <Button type="submit">
              <Send className="h-4 w-4" />
              <span className="ml-2">Send</span>
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Chat;
