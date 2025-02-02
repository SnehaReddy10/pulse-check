import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

function Grid({
  title,
  headers,
  rows,
}: {
  title: string;
  headers: any[];
  rows: any[];
}) {
  return (
    <div>
      <Table>
        <TableCaption>{title}</TableCaption>
        <TableHeader>
          <TableRow>
            {headers.map((x) => (
              <TableHead className={`${x.className}`}>{x.label}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((x) => {
            return (
              <TableRow>
                {x.map((y: any) => (
                  <TableCell className={`${y.className}`}>{y.label}</TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

export default Grid;
