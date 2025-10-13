
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { motion } from "motion/react";
import { Link } from "react-router";
import  { Editor } from "@tiptap/react";
import { formatDistanceToNowStrict } from "date-fns";
import { cn, getUsername } from "@/lib/utils";
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


export const columns:ColumnDef<Blog>[] = [ // Cada objeto en este array define una columna
  {
    accessorKey: "title", // De qué propiedad del objeto 'Blog' sacar los datos
    header: "Blog",       // El texto que aparecerá en la cabecera <th>
    // La función `cell` es el corazón de la personalización.
    // Recibe el contexto de la celda (incluida la fila completa con `row.original`)
    // y nos permite devolver cualquier JSX que queramos para renderizar esa celda.
    // Esto nos da control total sobre el aspecto de cada celda.
    cell: ({ row }) => {  /* ... JSX para renderizar la celda ... */

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
    header: "Author",
    cell: ({ row }) => {
      const author = row.getValue("author") as User;
    
      return (
        <div className="flex items-center gap-2">
          <Avatar 
            email={author.email} 
            size="24" 
            className="rounded-md"
          />

          <div>
            {getUsername(author)}
          </div>
        </div>
      )
    }
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as "draft" | "published";
    
      return (
        <Badge
          variant="outline"
          className={cn(
            "gap-1.5 capitalize",
            status === "published"
              ? "border-emerald-300 darl:border-emerald-800 bg-emerald-100/20 dark:ng-emerald-800/20"
              : "border-amber-300 dark:border-amber-800 bg-amber-100/20 dark:bg-amber-800/20"
          )}
        >
          <div className={cn(
            "w-1.5 h-1.5 rounded-full",
            status === "published"
              ? "bg-emerald-500 dark:bg-emerald-600"
              : "bg-amber-500 dark:bg-amber-600"
          )}></div>
            {status}
        </Badge>
      )
    }
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


// Este componente es genérico gracias a <TData, TValue>.
// Puede renderizar una tabla para cualquier tipo de datos (TData),
// no solo para blogs, siempre que se le pasen las `columns` y `data` correctas.
export const BlogTable = <TData, TValue>({ columns, data }: BlogTableProps<TData, TValue>) => {
  
  const table = useReactTable({        // Le pasamos la data y las columnas y tanstack nos devuelve un objeto table
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table>
      <TableHeader>
        {/* Itera sobre las cabeceras para crear los <th>. */}
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
          //  Itera sobre las filas para crear los <tr>.
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
                  {/* flexRender es la utilidad de TanStack Table que ejecuta y renderiza
                      el JSX que definimos en las propiedades `header` y `cell` de nuestras columnas.
                      Desacopla la lógica de la tabla de su presentación. */}
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
