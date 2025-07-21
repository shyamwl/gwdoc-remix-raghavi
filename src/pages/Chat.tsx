
import { MessageSquare } from "lucide-react";

const Chat = () => {
  return (
    <div className="flex h-[calc(100vh-8rem)] items-center justify-center">
      <div className="text-center space-y-4">
        <MessageSquare className="h-16 w-16 text-muted-foreground mx-auto" />
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-2">GravityDoc Chat</h1>
          <p className="text-muted-foreground">
            Click the chat button in the bottom right to start a conversation with your AI assistant.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chat;
