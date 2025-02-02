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
          <TableRow className="hover:bg-black">
            {headers.map((x) => (
              <TableHead key={x.id} className={`${x.className}`}>
                {x.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((x) => {
            return (
              <TableRow className="hover:bg-gray-800">
                {x.map((y: any) => (
                  <TableCell key={y.id} className={`${y.className}`}>
                    {y.label}
                  </TableCell>
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
