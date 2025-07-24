
import { FileCheck, Sparkles, Download, Copy } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import jsPDF from 'jspdf';

export default function FRD() {
  const [content, setContent] = useState("");
  const [showContent, setShowContent] = useState(false);
  const { toast } = useToast();

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log("Saving FRD content:", content);
    toast({
      title: "Document saved",
      description: "Your FRD has been saved successfully.",
    });
  };

  const handleGenerate = () => {
    setShowContent(true);
  };

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(content);
      toast({
        title: "Text copied",
        description: "Document content has been copied to clipboard.",
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Failed to copy text to clipboard.",
        variant: "destructive",
      });
    }
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.height;
    const margin = 20;
    const lineHeight = 10;
    
    // Add title
    doc.setFontSize(20);
    doc.text("Functional Requirements Document", margin, margin);
    
    // Add content
    doc.setFontSize(12);
    const lines = doc.splitTextToSize(content || "No content to export", doc.internal.pageSize.width - 2 * margin);
    
    let y = margin + 20;
    lines.forEach((line: string) => {
      if (y + lineHeight > pageHeight - margin) {
        doc.addPage();
        y = margin;
      }
      doc.text(line, margin, y);
      y += lineHeight;
    });
    
    doc.save("FRD.pdf");
    toast({
      title: "PDF exported",
      description: "Your FRD has been exported as PDF.",
    });
  };

  const handleExportDOCX = () => {
    const docContent = `Functional Requirements Document\n\n${content}`;
    const blob = new Blob([docContent], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'FRD.docx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "DOCX exported",
      description: "Your FRD has been exported as DOCX.",
    });
  };

  if (!showContent) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="text-center space-y-6 max-w-md">
          <h1 className="text-3xl font-bold">Functional Requirements Document</h1>
          <p className="text-muted-foreground">
            Generate a comprehensive FRD for your project based on system behavior, user interactions, and technical specifications.
          </p>
          <Button 
            size="lg" 
            onClick={handleGenerate} 
            className="w-full gap-2"
          >
            <Sparkles className="h-5 w-5" />
            Generate FRD
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-6xl space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileCheck className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Functional Requirements Document (FRD)</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={handleCopyText} variant="outline" size="sm">
            <Copy className="h-4 w-4 mr-2" />
            Copy Text
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={handleExportPDF}>
                Export as PDF
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleExportDOCX}>
                Export as DOCX
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button onClick={handleSave}>
            Save Document
          </Button>
        </div>
      </div>
      
      <p className="text-muted-foreground max-w-4xl">
        Create and maintain functional requirements documentation. Define system behavior, user interactions, and technical specifications for your project.
      </p>

      <Card>
        <CardHeader>
          <CardTitle>Document Editor</CardTitle>
          <CardDescription>
            Write your functional requirements document here. Include system behavior, user workflows, and technical specifications.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Start writing your Functional Requirements Document here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[500px] font-mono text-sm"
          />
        </CardContent>
      </Card>
    </div>
  );
}
