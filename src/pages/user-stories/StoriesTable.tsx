
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Check, Calendar, User, GripVertical } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { format } from "date-fns";
import { UserStory, teamMembers } from "./types";

interface StoriesTableProps {
  stories: UserStory[];
  onSelectStory: (story: UserStory) => void;
  onStatusChange: (storyId: string, status: "todo" | "in-progress" | "completed") => void;
  onAssigneeChange: (storyId: string, assignee: string) => void;
  onDueDateChange: (storyId: string, date: Date | undefined) => void;
  onStoryPointsChange: (storyId: string, points: string) => void;
  onReorderStories?: (draggedId: string, targetId: string) => void;
}

export function StoriesTable({
  stories,
  onSelectStory,
  onStatusChange,
  onAssigneeChange,
  onDueDateChange,
  onStoryPointsChange,
  onReorderStories
}: StoriesTableProps) {
  const handleDragStart = (e: React.DragEvent<HTMLTableRowElement>, story: UserStory) => {
    e.dataTransfer.setData('storyId', story.id);
    e.currentTarget.classList.add('opacity-50');
  };

  const handleDragOver = (e: React.DragEvent<HTMLTableRowElement>) => {
    e.preventDefault();
    e.currentTarget.classList.add('bg-accent');
  };

  const handleDragLeave = (e: React.DragEvent<HTMLTableRowElement>) => {
    e.currentTarget.classList.remove('bg-accent');
  };

  const handleDrop = (e: React.DragEvent<HTMLTableRowElement>, targetStory: UserStory) => {
    e.preventDefault();
    e.currentTarget.classList.remove('bg-accent');
    
    const draggedId = e.dataTransfer.getData('storyId');
    if (draggedId !== targetStory.id && onReorderStories) {
      onReorderStories(draggedId, targetStory.id);
    }
  };

  const handleDragEnd = (e: React.DragEvent<HTMLTableRowElement>) => {
    e.currentTarget.classList.remove('opacity-50');
  };

  return (
    <div className="border rounded-md w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[5%]"></TableHead>
            <TableHead className="w-[30%]">Story</TableHead>
            <TableHead className="w-[15%]">Status</TableHead>
            <TableHead className="w-[15%]">Assignee</TableHead>
            <TableHead className="w-[15%]">Due Date</TableHead>
            <TableHead className="w-[15%]">Story Points</TableHead>
            <TableHead className="w-[15%]">Estimation</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stories.map((story) => (
            <TableRow 
              key={story.id} 
              className="cursor-pointer hover:bg-muted"
              draggable={true}
              onDragStart={(e) => handleDragStart(e, story)}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, story)}
              onDragEnd={handleDragEnd}
              onClick={() => onSelectStory(story)}
            >
              <TableCell className="pl-4 w-5">
                <div className="cursor-grab">
                  <GripVertical className="h-5 w-5 text-muted-foreground" />
                </div>
              </TableCell>
              <TableCell>
                <div className="font-medium text-base text-primary hover:underline">
                  {story.title}
                </div>
              </TableCell>
              <TableCell>
                <Button 
                  variant={story.status === 'completed' ? 'default' : 'outline'}
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onStatusChange(story.id, story.status === 'completed' ? 'todo' : 'completed');
                  }}
                  className="gap-2"
                >
                  <Check className={`h-4 w-4 ${story.status === 'completed' ? 'opacity-100' : 'opacity-50'}`} />
                  {story.status === 'completed' ? 'Completed' : 'Mark Complete'}
                </Button>
              </TableCell>
              <TableCell>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="sm" className="gap-2" onClick={(e) => e.stopPropagation()}>
                      <User className="h-4 w-4" />
                      {story.assignee ? 
                        teamMembers.find(m => m.value === story.assignee)?.label : 
                        "Assign"
                      }
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0" side="right">
                    <Command>
                      <CommandInput placeholder="Search team member..." />
                      <CommandList>
                        <CommandEmpty>No team member found.</CommandEmpty>
                        <CommandGroup>
                          {teamMembers.map((member) => (
                            <CommandItem
                              key={member.value}
                              onSelect={() => onAssigneeChange(story.id, member.value)}
                            >
                              <User className="mr-2 h-4 w-4" />
                              {member.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </TableCell>
              <TableCell>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="sm" className="gap-2" onClick={(e) => e.stopPropagation()}>
                      <Calendar className="h-4 w-4" />
                      {story.dueDate ? format(story.dueDate, "MMM d, yyyy") : "Set Due Date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={story.dueDate}
                      onSelect={(date) => onDueDateChange(story.id, date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min="1"
                    placeholder="Points"
                    value={story.storyPoints ?? ""}
                    onChange={(e) => {
                      e.stopPropagation();
                      onStoryPointsChange(story.id, e.target.value);
                    }}
                    onClick={(e) => e.stopPropagation()}
                    className="w-20"
                  />
                  {story.storyPoints && story.storyPoints > 0 && (
                    <span className="text-sm text-muted-foreground">
                      {story.storyPoints <= 10 ? 'Simple' : 
                       story.storyPoints <= 20 ? 'Medium' : 
                       story.storyPoints <= 30 ? 'Complex' : 'Very Complex'}
                    </span>
                  )}
                </div>
              </TableCell>
              <TableCell>
                {story.storyPoints && story.storyPoints > 0 && (
                  <div className="text-sm">
                    <span className="font-medium">
                      {story.storyPoints <= 10 ? Math.ceil(story.storyPoints * 0.5) : 
                       story.storyPoints <= 20 ? Math.ceil(story.storyPoints * 0.8) : 
                       Math.ceil(story.storyPoints * 1.2)} days
                    </span>
                    <div className="text-muted-foreground text-xs">
                      {story.storyPoints <= 10 ? 'Quick task' : 
                       story.storyPoints <= 20 ? 'Standard sprint' : 'Extended effort'}
                    </div>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
