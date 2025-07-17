
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateEpicDialog } from "@/components/epics/CreateEpicDialog";
import { ProjectHeader } from "@/components/projects/ProjectHeader";
import { EpicsTable } from "@/components/projects/EpicsTable";
import { EmptyProjectState } from "@/components/projects/EmptyProjectState";
import { ProjectDialog } from "@/components/projects/ProjectDialog";
import { Project, Epic } from "@/types/project";

// Sample data - replace with real data when available
const sampleProjects: Project[] = [{
  id: "1",
  name: "E-commerce Platform",
  description: "Online shopping platform for retail products",
  creator: "John Doe",
  createdAt: new Date("2024-01-15"),
  lastModified: new Date("2024-03-20")
}, {
  id: "2",
  name: "Task Management App",
  description: "Tool for managing tasks and projects",
  creator: "Jane Smith",
  createdAt: new Date("2024-02-01"),
  lastModified: new Date("2024-03-19")
}];

const sampleEpics: Epic[] = [{
  id: "1",
  name: "User Authentication System",
  creator: "John Doe",
  createdAt: new Date("2024-02-15"),
  lastModified: new Date("2024-03-22")
}, {
  id: "2",
  name: "Product Catalog",
  creator: "Jane Smith",
  createdAt: new Date("2024-02-20"),
  lastModified: new Date("2024-03-21")
}];

export default function ProjectLibrary() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>(sampleProjects);
  const [epics, setEpics] = useState<Epic[]>(sampleEpics);
  const [selectedProject, setSelectedProject] = useState<Project | null>(projects[0] || null);
  const [isCreateEpicDialogOpen, setIsCreateEpicDialogOpen] = useState(false);
  const [isCreateProjectDialogOpen, setIsCreateProjectDialogOpen] = useState(false);
  const [isEditProjectDialogOpen, setIsEditProjectDialogOpen] = useState(false);
  const [projectDropdownOpen, setProjectDropdownOpen] = useState(false);
  const [projectFormData, setProjectFormData] = useState({
    name: "",
    description: ""
  });

  const handleCreateEpic = () => {
    setIsCreateEpicDialogOpen(true);
  };

  const handleCreateProject = () => {
    setIsCreateProjectDialogOpen(true);
    setProjectDropdownOpen(false);
  };

  const handleEditProject = () => {
    if (selectedProject) {
      setProjectFormData({
        name: selectedProject.name,
        description: selectedProject.description || ""
      });
      setIsEditProjectDialogOpen(true);
    }
  };

  const handleEpicSubmit = (epicData: any) => {
    console.log("Epic submitted:", epicData);
    setIsCreateEpicDialogOpen(false);
    // For demo only - navigation would be handled differently in real implementation
    navigate("/upload-ui-images");
  };

  const handleProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Just close the dialog for UI demo
    setIsCreateProjectDialogOpen(false);
    setIsEditProjectDialogOpen(false);
  };

  // No projects view
  if (projects.length === 0) {
    return (
      <EmptyProjectState
        isCreateProjectDialogOpen={isCreateProjectDialogOpen}
        setIsCreateProjectDialogOpen={setIsCreateProjectDialogOpen}
        handleProjectSubmit={handleProjectSubmit}
      />
    );
  }

  return (
    <div className="container mx-auto py-8">
      <ProjectHeader
        projects={projects}
        selectedProject={selectedProject}
        setSelectedProject={setSelectedProject}
        handleEditProject={handleEditProject}
        handleCreateProject={handleCreateProject}
        handleCreateEpic={handleCreateEpic}
        projectDropdownOpen={projectDropdownOpen}
        setProjectDropdownOpen={setProjectDropdownOpen}
      />

      <EpicsTable epics={epics} />

      {/* Use the CreateEpicDialog component */}
      <CreateEpicDialog 
        open={isCreateEpicDialogOpen} 
        onOpenChange={setIsCreateEpicDialogOpen}
        onSave={handleEpicSubmit}
      />

      {/* Edit Project Dialog */}
      <ProjectDialog
        isOpen={isEditProjectDialogOpen}
        onOpenChange={setIsEditProjectDialogOpen}
        title="Edit Project"
        formData={projectFormData}
        setFormData={setProjectFormData}
        onSubmit={handleProjectSubmit}
        submitButtonText="Save Changes"
      />

      {/* Create Project Dialog (for dropdown) */}
      <ProjectDialog
        isOpen={isCreateProjectDialogOpen}
        onOpenChange={setIsCreateProjectDialogOpen}
        title="Create New Project"
        formData={projectFormData}
        setFormData={setProjectFormData}
        onSubmit={handleProjectSubmit}
        submitButtonText="Create Project"
      />
    </div>
  );
}
