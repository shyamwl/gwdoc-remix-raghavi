
import { AppWindow, ChevronDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const dummyProjects = [{
  id: 1,
  name: "My First Project"
}, {
  id: 2,
  name: "E-commerce App"
}, {
  id: 3,
  name: "Task Manager"
}, {
  id: 4,
  name: "Portfolio Website"
}, {
  id: 5,
  name: "Mobile App"
}];

export function ProjectSwitcher() {
  return <div className="flex items-center gap-2">
      <div className="flex items-center gap-2 min-w-fit">
        <AppWindow className="h-6 w-6 text-primary" />
        <span className="font-semibold">GravityDoc</span>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="gap-1 h-8">
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[280px] p-2">
          <DropdownMenuLabel className="text-base">Switch Project</DropdownMenuLabel>
          <div className="relative my-2">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input className="pl-8 h-8 bg-background" placeholder="Search projects..." />
          </div>
          <DropdownMenuSeparator className="bg-border" />
          <div className="max-h-[300px] overflow-y-auto">
            {dummyProjects.map(project => <DropdownMenuItem key={project.id} className="py-2 cursor-pointer hover:bg-accent">
                {project.name}
              </DropdownMenuItem>)}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>;
}
