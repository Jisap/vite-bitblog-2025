import { BlogTable, columns } from "@/components/BlogTable";
import { Button } from "@/components/ui/button";
import { useEffect, useState, Fragment, useMemo, useCallback } from "react";
import { useFetcher, useLoaderData } from "react-router";
import { Separator } from "@/components/ui/separator";
import { CommentCard } from "@/components/CommentCard";
import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon, Loader2Icon } from "lucide-react";

import type { Comment, PaginatedResponse } from '../../types/index';
import { Label } from "@/components/ui/label";
import { set } from "zod";



export const CommentsAdmin = () => {

  const fetcher = useFetcher();
  const loaderData = useLoaderData() as PaginatedResponse<Comment, "comments">;  // Carga los datos del primer renderizado de la ruta (allBlogsLoader) con offset=0 y limit=10
  const fetcherData = fetcher.data as PaginatedResponse<Comment, "comments">;    // Obtiene datos actualizados en la misma ruta sin recargarla. Ideal para paginación o flitrado despues de una búsqueda.   

  const { offset, limit, total, comments } = useMemo(
    () => fetcherData || loaderData, 
    [fetcherData, loaderData]
  );        

  const [allComments, setAllComments] = useState<Comment[]>([]);

  const handleMore = useCallback((offset: number) => {
    
  },[]);

  const hasMoreComments = offset + limit < total;
  const isLoading = fetcher.state === "loading" && fetcher.formAction === "/admin/comments";

  useEffect(() => {
    setAllComments((prevComments) => [...prevComments, ...comments]);
  },[comments])

  return (
    <div className="container p-4 space-y-4">
      <h2 className="text-2xl font-semibold">Comments</h2>

      <div>
        {allComments.map(({ _id, content, likesCount, user, blog, createdAt }, index, array ) => (
          <Fragment key={_id}>
            <CommentCard
              content={content}
              likesCount={likesCount}
              user={user}
              blog={blog}
              createdAt={createdAt} 
            />
          </Fragment>
        ))}
      </div>
      
    </div>
  )
}