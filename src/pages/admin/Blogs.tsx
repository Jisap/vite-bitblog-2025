import { BlogTable, columns } from "@/components/BlogTable";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useFetcher, useLoaderData } from "react-router";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon, Loader2Icon } from "lucide-react";

import type { Blog, PaginatedResponse } from '../../types/index';
import { Label } from "@/components/ui/label";


type PaginateTo = "first" | "last" | "previous" | "next" | null;

const LIMITS = [5, 10, 20, 30, 40];



export const BlogsAdmin = () => {

  const fetcher = useFetcher();
  const loaderData = useLoaderData() as PaginatedResponse<Blog, "blogs">;  // Carga los datos del primer renderizado de la ruta (allBlogsLoader) con offset=0 y limit=10
  const fetcherData = fetcher.data as PaginatedResponse<Blog, "blogs">;    // Obtiene datos actualizados en la misma ruta sin recargarla. Ideal para paginación o flitrado despues de una búsqueda.   

  const { offset, limit, total, blogs} = fetcherData || loaderData;        // Aquí se decide que mostrar en la tabla y la paginación

  const [currentOffset, setCurrentOffset] = useState(0);
  const [currentLimit, setCurrentLimit] = useState(limit);
  const [paginateTo, setPaginateTo] = useState<PaginateTo>();

  const isPaginating = fetcher.state === "loading"           // Sirve pra mostrar un icono de carga en los botones
    && fetcher.formMethod === "GET"
    && fetcher.formAction === "/admin/blogs";

  const showingFrom = offset + 1;                            // Muestra el número de la primera página
  const showingTo = total <= limit ? total : offset + limit; // Muestra el número de la última página

  useEffect(() => {
    const searchParams = new URLSearchParams()
    searchParams.set("offset", currentOffset.toString());
    searchParams.set("limit", currentLimit.toString());

    fetcher.submit(searchParams.toString());
  },[currentOffset, currentLimit]);

  const totalPage = Math.ceil(total / limit);          // Calcula el número de páginas en cada renderizado
  const currentPage = Math.ceil((offset + 1) / limit); // Calcula la página actual

  return (
    <div className="container p-4 space-y-4">
      <h2 className="text-2xl font-semibold">All Blogs</h2>

      <BlogTable 
        columns={columns}
        data={blogs}
      />

      <div className="flex items-center justify-between px-4 pb-4">
        <div className="text-muted-foreground flex flex-1 text-sm font-medium">
          Showing {showingFrom} - {showingTo} of {total} results
        </div>

        <div className="flex w-fit items-center gap-8">
          <div className="flex items-center gap-2">
            <Label htmlFor="limit" className="text-sm font-medium">
              Rows per page
            </Label>

            <Select
              value={currentLimit.toString()}
              onValueChange={(limit) => {      // En el desplegable el usuario cambia el limite de blogs por página
                const limitN = Number(limit);  // Lo transformamos a número
                setCurrentLimit(limitN);       // Actualizamos el limite de blogs por página a mostrar -> useEffect -> petición con fetch al loader con nuevos parámetros -> re renderización del componente sin recargar la página
                setPaginateTo(null);

                const inLastPage = currentPage === totalPage;

                if(inLastPage && offset !== 0){
                  setCurrentOffset(total - (total % limitN || limitN));
                }
              
              }}
            >
              <SelectTrigger id="limit" size="sm" className="w-20">
                <SelectValue placeholder={limit} />
              </SelectTrigger>

              <SelectContent side="top">
                {LIMITS.map((limit) => (
                  <SelectItem 
                    key={limit} 
                    value={limit.toString()}
                  >
                    {limit}
                  </SelectItem>
                ))}                
              </SelectContent>
            </Select>
          </div>

          <div className="flex w-fit items-center justify-center text-sm font-medium">
            Page {currentPage} of {totalPage}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="size-8 p-0"
              disabled={currentPage <= 1}
              aria-label="Go to first page"
              onClick={() => {
                setCurrentOffset(0);
                setPaginateTo("first");
              }}
            >
              {isPaginating && paginateTo === "first"
                ? ( <Loader2Icon className="animate-spin" /> )
                : ( <ChevronsLeftIcon /> )
              }
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}