import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Database } from "lucide-react";

export default function DatabaseSchema() {
  const samplePrompt = `Design the database schema for {{epicName}}, using {{epicDescription}} and screen-level data from {{screen-docs}}. Include tables, fields, data types, and relationships based on {{app-flow}}.`;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Database className="h-6 w-6" />
        <h1 className="text-2xl font-bold">Database Schema</h1>
      </div>
      
      <p className="text-muted-foreground">
        Generate comprehensive database schemas with proper table structures, relationships, and data types. Automatically creates SQL-compatible schemas. Useful for planning new databases or mapping out existing ones for refactoring.
      </p>

      <Tabs defaultValue="get-prompt" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="get-prompt">Get Prompt for this</TabsTrigger>
          <TabsTrigger value="schema">Schema Output</TabsTrigger>
        </TabsList>
        
        <TabsContent value="get-prompt" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sample Prompt Template</CardTitle>
              <CardDescription>
                Use this template to generate database schemas for your project
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted rounded-lg p-4">
                <pre className="text-sm text-foreground font-mono whitespace-pre-wrap">
                  {samplePrompt}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="schema" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Generated Database Schema</CardTitle>
              <CardDescription>
                Your database schema will appear here once generated
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted rounded-lg p-4 min-h-[400px] flex items-center justify-center">
                <p className="text-muted-foreground">No schema generated yet. Use the prompt template to get started.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}