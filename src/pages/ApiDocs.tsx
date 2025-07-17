
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RefreshCw, Code } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { FeedbackWidget } from "@/components/feedback/FeedbackWidget";

// Sample API documentation text that will be auto-typed
const sampleApiDocsText = `# API Documentation

## Authentication

### POST /api/auth/login

Authenticates a user and returns a JWT token.

**Request Body:**
\`\`\`json
{
  "email": "user@example.com",
  "password": "password123"
}
\`\`\`

**Response:**
\`\`\`json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "123",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
\`\`\`

### POST /api/auth/register

Registers a new user.

**Request Body:**
\`\`\`json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
\`\`\`

**Response:**
\`\`\`json
{
  "id": "123",
  "email": "user@example.com",
  "name": "John Doe"
}
\`\`\`

## Products

### GET /api/products

Returns a list of products.

**Query Parameters:**
- \`page\` (optional): Page number (default: 1)
- \`limit\` (optional): Number of items per page (default: 10)
- \`sort\` (optional): Sort field (default: "createdAt")
- \`order\` (optional): Sort order (default: "desc")

**Response:**
\`\`\`json
{
  "data": [
    {
      "id": "123",
      "name": "Product 1",
      "price": 100,
      "description": "Product 1 description"
    },
    {
      "id": "124",
      "name": "Product 2",
      "price": 200,
      "description": "Product 2 description"
    }
  ],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 10,
    "pages": 10
  }
}
\`\`\`

### GET /api/products/:id

Returns a single product by ID.

**Response:**
\`\`\`json
{
  "id": "123",
  "name": "Product 1",
  "price": 100,
  "description": "Product 1 description"
}
\`\`\`

### POST /api/products

Creates a new product.

**Request Body:**
\`\`\`json
{
  "name": "Product 1",
  "price": 100,
  "description": "Product 1 description"
}
\`\`\`

**Response:**
\`\`\`json
{
  "id": "123",
  "name": "Product 1",
  "price": 100,
  "description": "Product 1 description"
}
\`\`\`

### PUT /api/products/:id

Updates a product.

**Request Body:**
\`\`\`json
{
  "name": "Updated Product 1",
  "price": 150,
  "description": "Updated product 1 description"
}
\`\`\`

**Response:**
\`\`\`json
{
  "id": "123",
  "name": "Updated Product 1",
  "price": 150,
  "description": "Updated product 1 description"
}
\`\`\`

### DELETE /api/products/:id

Deletes a product.

**Response:**
\`\`\`json
{
  "success": true
}
\`\`\`
`;

export default function ApiDocs() {
  const [markdownContent, setMarkdownContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isTyping, setIsTyping] = useState(true);
  const [typewriterIndex, setTypewriterIndex] = useState(0);
  const { toast } = useToast();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Handle the auto-typing effect
  useEffect(() => {
    if (!isTyping) return;

    if (typewriterIndex < sampleApiDocsText.length) {
      const typingTimer = setTimeout(() => {
        setMarkdownContent(
          (prev) => prev + sampleApiDocsText.charAt(typewriterIndex)
        );
        setTypewriterIndex((prevIndex) => prevIndex + 1);

        // Auto-scroll textarea as text is typed
        if (textareaRef.current) {
          textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
        }
      }, 20); // Speed of typing - adjust as needed

      return () => clearTimeout(typingTimer);
    } else {
      setIsTyping(false);
      toast({
        title: "Auto-typing complete",
        description: "You can now edit the API documentation as needed",
      });
    }
  }, [typewriterIndex, isTyping, toast]);

  const handleRegenerate = () => {
    setIsGenerating(true);
    setIsTyping(true);
    setTypewriterIndex(0);
    setMarkdownContent("");

    // Simulate regeneration
    setTimeout(() => {
      setIsGenerating(false);
      toast({
        title: "Success",
        description: "API documentation has been regenerated",
      });
    }, 500);
  };

  return (
    <div className="container mx-auto py-8 max-w-5xl">
      <h1 className="text-2xl font-semibold mb-2">API Documentation</h1>
      <p className="text-muted-foreground mb-8">
        Here's your API documentation. Please review and make any necessary edits to ensure it's accurate and complete.
      </p>

      <div className="mb-6">
        <Button
          onClick={handleRegenerate}
          disabled={isGenerating || isTyping}
          variant="outline"
          className="flex items-center gap-2"
        >
          <RefreshCw
            className={`h-4 w-4 ${isGenerating ? "animate-spin" : ""}`}
          />
          {isGenerating
            ? "Regenerating..."
            : isTyping
            ? "Auto-typing in progress..."
            : "Regenerate API Docs"}
        </Button>
      </div>

      <div className="mb-6 border rounded-lg overflow-hidden">
        <div className="bg-muted px-4 py-2 border-b flex items-center gap-2">
          <Code className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">API Documentation</span>
        </div>
        <Textarea
          ref={textareaRef}
          value={markdownContent}
          onChange={(e) => !isTyping && setMarkdownContent(e.target.value)}
          placeholder={
            isTyping
              ? "Auto-typing in progress..."
              : "Your API documentation will appear here..."
          }
          className="min-h-[400px] p-4 resize-y border-0 focus-visible:ring-0"
          readOnly={isTyping}
        />
      </div>

      <FeedbackWidget feedbackType="API documentation" />
    </div>
  );
}
