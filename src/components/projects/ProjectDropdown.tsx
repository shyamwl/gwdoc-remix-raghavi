
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronDown, Plus } from "lucide-react";
import { Project } from "@/types/project";

interface ProjectDropdownProps {
  projects: Project[];
  selectedProject: Project | null;
  projectDropdownOpen: boolean;
  setProjectDropdownOpen: (open: boolean) => void;
  handleCreateProject: () => void;
  selectProject: (project: Project) => void;
}

export function ProjectDropdown({
  projects,
  selectedProject,
  projectDropdownOpen,
  setProjectDropdownOpen,
  handleCreateProject,
  selectProject,
}: ProjectDropdownProps) {
  return (
    <Popover open={projectDropdownOpen} onOpenChange={setProjectDropdownOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={projectDropdownOpen} className="w-[250px] justify-between">
          {selectedProject ? selectedProject.name : "Select project"}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0">
        <Command>
          <CommandInput placeholder="Search projects..." />
          <CommandList>
            <CommandEmpty>No projects found.</CommandEmpty>
            <CommandGroup heading="Projects">
              {projects.map(project => (
                <CommandItem 
                  key={project.id} 
                  onSelect={() => selectProject(project)} 
                  className="cursor-pointer"
                >
                  {project.name}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandGroup>
              <CommandItem 
                onSelect={handleCreateProject} 
                className="cursor-pointer text-primary"
              >
                <Plus className="mr-2 h-4 w-4" />
                Create New Project
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
