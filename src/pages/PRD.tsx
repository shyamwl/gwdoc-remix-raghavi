
import { FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function PRD() {
  const [content, setContent] = useState("");

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log("Saving PRD content:", content);
  };

  return (
    <div className="container mx-auto max-w-6xl space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Product Requirements Document (PRD)</h1>
        </div>
        <Button onClick={handleSave} className="ml-auto">
          Save Document
        </Button>
      </div>
      
      <p className="text-muted-foreground max-w-4xl">
        Create and maintain product requirements documentation. Define product vision, user stories, success metrics, and feature specifications.
      </p>

      <Card>
        <CardHeader>
          <CardTitle>Document Editor</CardTitle>
          <CardDescription>
            Write your product requirements document here. Include product vision, target audience, feature requirements, and success metrics.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Start writing your Product Requirements Document here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[500px] font-mono text-sm"
          />
        </CardContent>
      </Card>
    </div>
  );
}
