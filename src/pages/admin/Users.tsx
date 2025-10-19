
import { Button } from "@/components/ui/button";
import { useEffect, useState, Fragment, useMemo, useCallback } from "react";
import { useFetcher, useLoaderData } from "react-router";
import { Loader2Icon } from "lucide-react";
import type { User, PaginatedResponse } from '../../types/index';
import { UserCard } from "@/components/UserCard";
import { useUser } from "@/hooks/useUser";



export const UsersAdmin = () => {

  const fetcher = useFetcher();
  const loggedInUser = useUser();
  const loaderData = useLoaderData() as PaginatedResponse<User, "users">;  // Carga los datos del primer renderizado de la ruta (allBlogsLoader) con offset=0 y limit=10
  const fetcherData = fetcher.data as PaginatedResponse<User, "users">;    // Obtiene datos actualizados en la misma ruta sin recargarla. Ideal para paginación o flitrado despues de una búsqueda.   

  const { offset, limit, total, users } = useMemo(
    () => fetcherData || loaderData,
    [fetcherData, loaderData]
  );

  const [allUsers, setAllUsers] = useState<User[]>([]);

  const handleMore = useCallback((offset: number) => {
    const searchParams = new URLSearchParams();    // Crea un objeto de parámetros de búsqueda
    searchParams.set("offset", offset.toString()); // Agrega el parámetro offset al objeto de parámetros

    fetcher.submit(searchParams.toString());       // Envía el objeto de parámetros al fetcher
  }, [fetcher]);

  const hasMoreUsers = offset + limit < total;
  const isLoading = fetcher.state === "loading" && fetcher.formAction === "/admin/users";

  useEffect(() => {
    // Si es la primera carga (loaderData), establecer los comentarios iniciales
    if (!fetcherData) {
      setAllUsers(users);
    } else {
      // Si hay datos del fetcher, añadir solo comentarios nuevos que no existan
      setAllUsers((prevUsers) => {
        const existingIds = new Set(prevUsers.map(c => c._id));
        const newUsers = users.filter(c => !existingIds.has(c._id));
        return [...prevUsers, ...newUsers];
      });
    }

  }, [users])

  return (
    <div className="container p-4 space-y-4">
      <h2 className="text-2xl font-semibold">Users</h2>

      <div className="grid gap-3 lg:grid-cols-2 xl:grid-cols-3">
        {allUsers.map(({ _id, username, firstName, lastName, email,role, createdAt }) => (
            <UserCard
              key={_id}
              userId={_id}
              username={username}
              firstName={firstName}
              lastName={lastName}
              email={email}
              role={role}
              createdAt={createdAt} 
              loggedInUser={loggedInUser}
              onUserDeleteSuccess={() => {
              setAllUsers((prevUsers) =>
                prevUsers.filter((user) => user._id !== _id)
              )}}
            />
        ))}
      </div>

      <div className="flex justify-center my-4">
        {hasMoreUsers
          ? (
            <Button
              variant="outline"
              onClick={() => handleMore(offset + limit)}
              disabled={isLoading}
            >
              Load more
              {isLoading && <Loader2Icon className="animate-spin" />}
            </Button>
          ) : (
            <p className="text-muted-foreground text-sm">No more Users</p>
          )
        }
      </div>

    </div>
  )
}