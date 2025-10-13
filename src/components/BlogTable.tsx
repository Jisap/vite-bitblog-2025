
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { motion } from "motion/react";
import { Link } from "react-router";
import  { Editor } from "@tiptap/react";
import { formatDistanceToNowStrict } from "date-fns";
import { cn } from "@/lib/utils";
import StarterKit from "@tiptap/starter-kit";
import { 
  Table, 
  TableBody,
  TableRow, 
  TableCell, 
  TableHead, 
  TableHeader 
} from "./ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Avatar from "react-avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useMemo } from "react";
import { Loader2Icon, MoreHorizontalIcon } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import type { Blog, User } from "@/types";
import type { Variants } from "motion/react";


interface BlogTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

const tableBodyVariant: Variants = {
  to: {
    transition: {
      staggerChildren: 0.01
    }
  }
}

const tableRowVariant: Variants = {
  from: { opacity: 0 },
  to: {
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
}

const MotionTableBody = motion.create(TableBody);

const MotionTableRow = motion.create(TableRow);

export const columns:ColumnDef<Blog>[] = [
  {
    accessorKey: "title",
    header: "Blog",
    cell: ({ row }) => {

      const blog = row.original;

      const editor = new Editor({
        extensions: [StarterKit],
        content: row.original.content,
        editable: false,
        autofocus: false,
      })

      return (
        <Link 
          className="flex items-center gap-4 group"
          to={`/blogs/${blog.slug}`} 
          viewTransition 
        >
          <figure className="shrink-0 w-[120px] h-[68px] rounded-md overflow-hidden">
            <img 
              src={blog.banner.url} 
              alt={blog.title} 
              width={blog.banner.width}
              height={blog.banner.height}
              className="w-full h-full object-cover" 
            />
          </figure>

          <div>
            <div className="font-semibold mb-1 truncate max-w-[50ch] group-hover:underline">
              {blog.title}
            </div>

            <p className="text-muted-foreground line-clamp-2 max-w-[50ch] text-wrap">
              {editor.getText()}
            </p>
          </div>
        </Link>
      )
    }
  },
  {
    accessorKey: "author",
    header: "Author"
  },
  {
    accessorKey: "status",
    header: "Status"
  },
  {
    accessorKey: "updatedAt",
    header: "Last Updated",
  },
  {
    id: "actions",
    enableHiding: true,
  }

]





export const BlogTable = <TData, TValue>({ columns, data }: BlogTableProps<TData, TValue>) => {
  
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id} className="border-none">
            {headerGroup.headers.map((header) => (
              <TableHead
                key={header.id}
                colSpan={header.colSpan}
                className="bg-muted px-4 first:rounded-l-lg last:rounded-r-lg"
              >
                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>

      <MotionTableBody
        initial="from"
        animate="to"
        variants={tableBodyVariant}
      >
        {table.getRowModel().rows.length 
          ? ( table.getRowModel().rows.map((row) => (
            <MotionTableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
              variants={tableRowVariant}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  className="px-4 py-3 min-h-16 max-w-max"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </MotionTableRow>
          ))
        ) : (
            <TableRow>
              <TableCell 
                colSpan={columns.length}
                className="h-24 text-center"
              >
                No results 
              </TableCell>
            </TableRow>
        )}
      </MotionTableBody>
    </Table>
  )
}

