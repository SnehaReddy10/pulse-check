import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '../ui/button';
import { Pencil, Trash } from 'lucide-react';

function Grid({
  title,
  headers,
  rows,
  onEdit,
  onDelete,
}: {
  title: string;
  headers: any[];
  rows: any[];
  onEdit: any;
  onDelete: any;
}) {
  return (
    <div>
      <Table>
        <TableCaption>{title}</TableCaption>
        <TableHeader>
          <TableRow className="hover:bg-black">
            {headers.map((x) => (
              <TableHead key={x.id} className={`${x.className}`}>
                {x.label}
              </TableHead>
            ))}
            <TableHead className="text-center w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((x) => {
            return (
              <TableRow className="hover:bg-gray-800" key={x.id}>
                {x.map((y: any) => (
                  <TableCell className={`${y.className}`}>{y.label}</TableCell>
                ))}
                <TableCell className="flex gap-2 justify-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(x[0]?.id)}
                    className="hover:bg-transparent"
                  >
                    <Pencil size={16} color="yellow" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(x[0]?.id)}
                  >
                    <Trash size={16} color="red" />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

export default Grid;
