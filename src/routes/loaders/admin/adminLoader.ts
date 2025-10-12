import { bitblogApi } from "@/api";
import { data, redirect } from "react-router";
import type { LoaderFunction } from "react-router";
import { AxiosError } from "axios";




const adminLoader: LoaderFunction = async () => {

  const accessToken = localStorage.getItem("accessToken");
  if(!accessToken) return redirect("/");


  try {

    const { data } = await bitblogApi.get(`/users/current`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    if(data.user.role !== "admin") return redirect("/");

    return data;


  } catch (error) {
    if (error instanceof AxiosError) {
      // Si el error es 401 (No autorizado), significa que el token no es válido.
      // Limpiamos cualquier dato de sesión residual y redirigimos al login.
      if (error.response?.status === 401) {
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        return redirect("/login");
      }

      throw data({ message: error.response?.data?.message || error.message }, {
        status: error.response?.status || error.status,
        statusText: error.response?.statusText || "Error"
      });
    }
  }
}

export default adminLoader;