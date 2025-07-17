
import { useState } from "react";
import { ChevronDown, Plus, Upload, X, FileText, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const existingEpics = [
  { id: "1", name: "User Authentication" },
  { id: "2", name: "Dashboard Features" },
  { id: "3", name: "Payment Integration" },
];

interface DocumentSnippet {
  id: string;
  name: string;
  content: string;
}

interface UploadedFile {
  file: File;
  name: string;
}

interface CreateEpicDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (epicData: {
    name: string;
    purpose: string;
    reason: string;
    integrations: string;
    type: "new" | "existing";
    existingEpicId?: string;
    documentSnippets?: DocumentSnippet[];
    documents?: File[];
  }) => void;
}

export function CreateEpicDialog({ open, onOpenChange, onSave }: CreateEpicDialogProps) {
  const [epicFormData, setEpicFormData] = useState({
    name: "",
    purpose: "",
    reason: "",
    integrations: "",
    type: "new" as "new" | "existing",
    existingEpicId: "",
    documentSnippets: [] as DocumentSnippet[],
    documents: [] as File[]
  });
  
  const [newDocumentName, setNewDocumentName] = useState("");
  const [newDocumentContent, setNewDocumentContent] = useState("");
  const [editingSnippet, setEditingSnippet] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(epicFormData);
    setEpicFormData({
      name: "",
      purpose: "",
      reason: "",
      integrations: "",
      type: "new",
      existingEpicId: "",
      documentSnippets: [],
      documents: []
    });
    setNewDocumentName("");
    setNewDocumentContent("");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setEpicFormData({
        ...epicFormData,
        documents: files
      });
      
      const newUploadedFiles = files.map(file => ({
        file,
        name: file.name
      }));
      setUploadedFiles(newUploadedFiles);
    }
  };

  const handleFileNameChange = (index: number, newName: string) => {
    setUploadedFiles(prevFiles => {
      const newFiles = [...prevFiles];
      newFiles[index] = { ...newFiles[index], name: newName };
      return newFiles;
    });
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    setEpicFormData(prev => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index)
    }));
  };

  const addDocumentSnippet = () => {
    if (!newDocumentName.trim() || !newDocumentContent.trim()) return;
    
    const newSnippet: DocumentSnippet = {
      id: Math.random().toString(36).substring(2, 9),
      name: newDocumentName,
      content: newDocumentContent
    };
    
    setEpicFormData({
      ...epicFormData,
      documentSnippets: [...epicFormData.documentSnippets, newSnippet]
    });
    
    setNewDocumentName("");
    setNewDocumentContent("");
  };

  const editDocumentSnippet = (snippet: DocumentSnippet) => {
    setNewDocumentName(snippet.name);
    setNewDocumentContent(snippet.content);
    setEditingSnippet(snippet.id);
  };

  const updateDocumentSnippet = () => {
    if (!editingSnippet || !newDocumentName.trim() || !newDocumentContent.trim()) return;

    setEpicFormData({
      ...epicFormData,
      documentSnippets: epicFormData.documentSnippets.map(doc => 
        doc.id === editingSnippet 
          ? { ...doc, name: newDocumentName, content: newDocumentContent }
          : doc
      )
    });

    setNewDocumentName("");
    setNewDocumentContent("");
    setEditingSnippet(null);
  };
  
  const removeDocumentSnippet = (id: string) => {
    setEpicFormData({
      ...epicFormData,
      documentSnippets: epicFormData.documentSnippets.filter(doc => doc.id !== id)
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`sm:max-w-[800px] ${epicFormData.type === 'existing' ? 'sm:max-w-[1000px]' : ''}`}>
        <DialogHeader>
          <DialogTitle>Create New Epic</DialogTitle>
          <DialogDescription>
            Add details about your new epic.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[80vh]">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-3">
                <Label>What type of epic are you creating?</Label>
                <RadioGroup
                  value={epicFormData.type}
                  onValueChange={(value: "new" | "existing") => 
                    setEpicFormData({
                      ...epicFormData,
                      type: value
                    })
                  }
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="new" id="new" />
                    <Label htmlFor="new">New Feature</Label>
                    <span className="text-sm text-muted-foreground">- I am building a new feature from scratch</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="existing" id="existing" />
                    <Label htmlFor="existing">Existing Feature</Label>
                    <span className="text-sm text-muted-foreground">- I'm building on top of an existing feature</span>
                  </div>
                </RadioGroup>
              </div>

              {epicFormData.type === "new" ? (
                <>
                  <div className="space-y-2 relative">
                    <Label htmlFor="name">Epic Name</Label>
                    <Input 
                      id="name" 
                      value={epicFormData.name} 
                      onChange={e => setEpicFormData({
                        ...epicFormData,
                        name: e.target.value
                      })} 
                      required 
                      className="relative focus-within:z-10 overflow-visible"
                    />
                  </div>

                  <div className="space-y-2 relative">
                    <Label htmlFor="purpose">What does this product / feature do?</Label>
                    <Textarea 
                      id="purpose" 
                      value={epicFormData.purpose} 
                      onChange={e => setEpicFormData({
                        ...epicFormData,
                        purpose: e.target.value
                      })} 
                      required 
                      className="relative focus-within:z-10 overflow-visible"
                    />
                  </div>

                  <div className="space-y-2 relative">
                    <Label htmlFor="reason">Why was this product / feature created? (optional)</Label>
                    <Textarea 
                      id="reason" 
                      value={epicFormData.reason} 
                      onChange={e => setEpicFormData({
                        ...epicFormData,
                        reason: e.target.value
                      })} 
                      className="relative focus-within:z-10 overflow-visible"
                    />
                  </div>

                  <Collapsible className="space-y-2">
                    <CollapsibleTrigger className="flex items-center gap-2 text-sm">
                      <ChevronDown className="h-4 w-4" />
                      Advanced
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="space-y-2 pt-2 relative">
                        <Label htmlFor="integrations">Which 3rd party integrations are needed for this product?</Label>
                        <Textarea 
                          id="integrations" 
                          value={epicFormData.integrations} 
                          onChange={e => setEpicFormData({
                            ...epicFormData,
                            integrations: e.target.value
                          })} 
                          className="relative focus-within:z-10 overflow-visible"
                        />
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </>
              ) : (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label>Select an existing epic or add feature details</Label>
                    <Select 
                      value={epicFormData.existingEpicId}
                      onValueChange={(value) => setEpicFormData({
                        ...epicFormData,
                        existingEpicId: value
                      })}
                    >
                      <SelectTrigger className="bg-background border-input text-foreground">
                        <SelectValue placeholder="Select an existing epic" />
                      </SelectTrigger>
                      <SelectContent className="bg-background border-input z-50 shadow-lg">
                        {existingEpics.map((epic) => (
                          <SelectItem 
                            key={epic.id} 
                            value={epic.id}
                            className="hover:bg-accent focus:bg-accent"
                          >
                            {epic.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    <Label>Or add your feature details manually</Label>
                    
                    <div className="space-y-6">
                      <div className="border rounded-lg p-4">
                        <h4 className="text-sm font-medium mb-3">Add Document Snippets</h4>
                        
                        {/* Document snippets list */}
                        {epicFormData.documentSnippets.length > 0 && (
                          <div className="space-y-3 mb-4">
                            {epicFormData.documentSnippets.map((doc) => (
                              <div 
                                key={doc.id} 
                                className="bg-muted p-3 rounded-md relative group"
                              >
                                <div className="flex justify-between items-center mb-2">
                                  <Badge variant="outline" className="flex items-center gap-1">
                                    <FileText className="h-3 w-3" />
                                    {doc.name}
                                  </Badge>
                                  <div className="flex gap-2">
                                    <Button 
                                      type="button"
                                      variant="ghost" 
                                      size="icon"
                                      className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                      onClick={() => editDocumentSnippet(doc)}
                                    >
                                      <Edit2 className="h-4 w-4" />
                                      <span className="sr-only">Edit</span>
                                    </Button>
                                    <Button 
                                      type="button"
                                      variant="ghost" 
                                      size="icon" 
                                      className="h-6 w-6 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:text-destructive"
                                      onClick={() => removeDocumentSnippet(doc.id)}
                                    >
                                      <X className="h-4 w-4" />
                                      <span className="sr-only">Remove</span>
                                    </Button>
                                  </div>
                                </div>
                                <p className="text-sm text-muted-foreground line-clamp-2">{doc.content}</p>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {/* Add new document snippet form */}
                        <div className="space-y-3">
                          <div className="space-y-2">
                            <Label htmlFor="documentName">Document Name</Label>
                            <Input 
                              id="documentName"
                              placeholder="e.g., PRD, API Documentation, Database Schema"
                              value={newDocumentName}
                              onChange={(e) => setNewDocumentName(e.target.value)}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="documentContent">Document Content</Label>
                            <Textarea 
                              id="documentContent"
                              placeholder="Paste your document content here..."
                              value={newDocumentContent}
                              onChange={(e) => setNewDocumentContent(e.target.value)}
                              className="min-h-[100px]"
                            />
                          </div>
                          
                          <Button 
                            type="button" 
                            variant="outline" 
                            className="w-full gap-2"
                            onClick={editingSnippet ? updateDocumentSnippet : addDocumentSnippet}
                            disabled={!newDocumentName.trim() || !newDocumentContent.trim()}
                          >
                            {editingSnippet ? (
                              <>Update Document Snippet</>
                            ) : (
                              <>
                                <Plus className="h-4 w-4" />
                                Add Document Snippet
                              </>
                            )}
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="documents">Upload Documents</Label>
                        <div className="border-2 border-dashed rounded-lg p-4 hover:bg-accent/50 transition-colors">
                          <Input
                            id="documents"
                            type="file"
                            onChange={handleFileChange}
                            multiple
                            accept=".pdf,.doc,.docx,.txt"
                            className="hidden"
                          />
                          <label 
                            htmlFor="documents" 
                            className="flex flex-col items-center justify-center gap-2 cursor-pointer"
                          >
                            <Upload className="h-8 w-8 text-muted-foreground" />
                            <div className="text-center">
                              <p className="text-sm font-medium">
                                Click to upload or drag and drop
                              </p>
                              <p className="text-xs text-muted-foreground">
                                PDF, DOCX, or TXT files
                              </p>
                            </div>
                          </label>
                        </div>

                        {/* Display uploaded files with name inputs */}
                        {uploadedFiles.length > 0 && (
                          <div className="space-y-3 mt-4">
                            {uploadedFiles.map((uploadedFile, index) => (
                              <div key={index} className="flex items-center gap-3 bg-muted p-3 rounded-md">
                                <FileText className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
                                <div className="flex-grow">
                                  <Input
                                    value={uploadedFile.name}
                                    onChange={(e) => handleFileNameChange(index, e.target.value)}
                                    className="text-sm"
                                    placeholder="Enter document name"
                                  />
                                </div>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                  onClick={() => removeFile(index)}
                                >
                                  <X className="h-4 w-4" />
                                  <span className="sr-only">Remove file</span>
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <DialogFooter>
              <Button type="submit" onClick={handleSubmit}>Create Epic</Button>
            </DialogFooter>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

