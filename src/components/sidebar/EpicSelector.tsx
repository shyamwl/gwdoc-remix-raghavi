
import { useState } from "react";
import { ChevronDown, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { CreateEpicDialog } from "@/components/epics/CreateEpicDialog";

// Dummy data for epics
const dummyEpics = [
  { id: 1, name: "User Authentication" },
  { id: 2, name: "Dashboard Features" },
  { id: 3, name: "Payment Processing" },
  { id: 4, name: "Content Management" },
  { id: 5, name: "Analytics Module" },
];

interface EpicSelectorProps {
  selectedEpic: { id: number; name: string } | null;
  setSelectedEpic: (epic: { id: number; name: string } | null) => void;
}

export function EpicSelector({ selectedEpic, setSelectedEpic }: EpicSelectorProps) {
  const [isCreateEpicDialogOpen, setIsCreateEpicDialogOpen] = useState(false);
  const [searchEpic, setSearchEpic] = useState("");

  const filteredEpics = dummyEpics.filter(epic => 
    epic.name.toLowerCase().includes(searchEpic.toLowerCase())
  );

  const handleCreateEpic = () => {
    setIsCreateEpicDialogOpen(true);
  };

  const handleSaveEpic = (epicData: any) => {
    // This would typically save the new epic to your backend
    console.log("Epic data saved:", epicData);
    setIsCreateEpicDialogOpen(false);
  };

  return (
    <>
      <div className="px-6 py-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              {selectedEpic ? selectedEpic.name : "Select an Epic"}
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[280px] p-2">
            <div className="relative my-2">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                className="pl-8 h-8 bg-background" 
                placeholder="Search epics..." 
                value={searchEpic}
                onChange={(e) => setSearchEpic(e.target.value)}
              />
            </div>
            <Separator className="my-1" />
            <div className="max-h-[300px] overflow-y-auto">
              {filteredEpics.map(epic => (
                <DropdownMenuItem 
                  key={epic.id} 
                  className="py-2 cursor-pointer hover:bg-accent"
                  onClick={() => {
                    setSelectedEpic(epic);
                    setSearchEpic("");
                  }}
                >
                  {epic.name}
                </DropdownMenuItem>
              ))}
            </div>
            <Separator className="my-1" />
            <DropdownMenuItem 
              className="py-2 cursor-pointer flex items-center gap-2 text-primary"
              onClick={handleCreateEpic}
            >
              <Plus className="h-4 w-4" />
              <span>Create New Epic</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Use the new CreateEpicDialog component */}
      <CreateEpicDialog 
        open={isCreateEpicDialogOpen} 
        onOpenChange={setIsCreateEpicDialogOpen}
        onSave={handleSaveEpic}
      />
    </>
  );
}
