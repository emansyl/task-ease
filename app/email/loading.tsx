// app/emails/loading.tsx
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Inbox, ListFilter, Search } from "lucide-react";

export default function EmailsLoading() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Inbox size={30} /> Processed Emails
        </h1>
        <Skeleton className="h-9 w-40" />{" "}
        {/* Placeholder for How to Forward button */}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-6 w-48" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-4 w-full max-w-md" />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center gap-2 mb-4">
            <div className="relative flex-grow w-full sm:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Skeleton className="h-9 w-full rounded-lg pl-8" />{" "}
              {/* Placeholder for Search input */}
            </div>
            <Skeleton className="h-9 w-full sm:w-[180px] rounded-lg" />{" "}
            {/* Placeholder for Filter dropdown */}
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <Skeleton className="h-5 w-32" />
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    <Skeleton className="h-5 w-24" />
                  </TableHead>
                  <TableHead>
                    <Skeleton className="h-5 w-28" />
                  </TableHead>
                  <TableHead className="hidden sm:table-cell">
                    <Skeleton className="h-5 w-20" />
                  </TableHead>
                  <TableHead className="text-center">
                    <Skeleton className="h-5 w-16" />
                  </TableHead>
                  <TableHead className="text-right">
                    <Skeleton className="h-5 w-20" />
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[...Array(5)].map(
                  (
                    _,
                    i // Show 5 skeleton rows
                  ) => (
                    <TableRow key={i}>
                      <TableCell>
                        <Skeleton className="h-4 w-48" />
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Skeleton className="h-4 w-32" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-6 w-24 rounded-full" />
                      </TableCell>{" "}
                      {/* Badge placeholder */}
                      <TableCell className="hidden sm:table-cell">
                        <Skeleton className="h-4 w-24" />
                      </TableCell>
                      <TableCell className="text-center">
                        <Skeleton className="h-4 w-12 mx-auto" />
                      </TableCell>
                      <TableCell className="text-right">
                        <Skeleton className="h-8 w-24" />
                      </TableCell>{" "}
                      {/* Button placeholder */}
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </div>
          {/* Pagination Placeholder */}
          <div className="flex items-center justify-center space-x-2 py-4 mt-4 border-t">
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-9 w-24" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
