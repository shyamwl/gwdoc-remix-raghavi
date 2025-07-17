
export interface Project {
  id: string;
  name: string;
  description?: string;
  creator: string;
  createdAt: Date;
  lastModified: Date;
}

export interface Epic {
  id: string;
  name: string;
  creator: string;
  createdAt: Date;
  lastModified: Date;
}
