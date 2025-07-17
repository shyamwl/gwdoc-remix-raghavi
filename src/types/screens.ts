
export interface ScreenItem {
  id: string;
  image: string;
  description: string;
  parentId: string | null;
  isExpanded?: boolean;
}

export interface DragTarget {
  index: number;
  isNested: boolean;
}
