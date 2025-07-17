
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { Epic } from "@/types/project";

interface EpicsTableProps {
  epics: Epic[];
}

export function EpicsTable({ epics }: EpicsTableProps) {
  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Epic Name</TableHead>
            <TableHead>Creator</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Last Modified</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {epics.map(epic => (
            <TableRow key={epic.id}>
              <TableCell className="font-medium">{epic.name}</TableCell>
              <TableCell>{epic.creator}</TableCell>
              <TableCell>
                {format(epic.createdAt, "MMM d, yyyy")}
              </TableCell>
              <TableCell>
                {format(epic.lastModified, "MMM d, yyyy")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
