export interface ChecklistItem {
  id: string;
  text: string;
  checked: boolean;
}

export interface EditHistory {
  id: string;
  userId: string;
  userName: string;
  timestamp: Date;
  field: string;
  oldValue: string;
  newValue: string;
}

export interface UserStory {
  id: string;
  title: string;
  status: "todo" | "in-progress" | "completed";
  assignee?: string;
  dueDate?: Date;
  description: string;
  checklist: ChecklistItem[];
  storyPoints?: number;
  editHistory?: EditHistory[];
}

export interface TeamMember {
  label: string;
  value: string;
}

export const teamMembers: TeamMember[] = [
  { label: "Alice Smith", value: "alice" },
  { label: "Bob Johnson", value: "bob" },
  { label: "Carol Williams", value: "carol" },
  { label: "Dave Brown", value: "dave" },
];
