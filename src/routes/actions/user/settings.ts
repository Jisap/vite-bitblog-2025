import { bitblogApi } from "@/api";
import { AxiosError } from "axios";
import { redirect } from "react-router";
import type { ActionFunction } from 'react-router';


const settingsAction: ActionFunction = async ({ request }) => {
  const data = await request.json();

  const accessToken = localStorage.getItem("accessToken");
  if(!accessToken) return redirect("/");

  try {
    const response = await bitblogApi.put("/users/current", data, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      withCredentials: true,
    });

    const responseData = response.data;

    localStorage.setItem("user", JSON.stringify(responseData.user));

    return {
      ok: true,
      data: responseData
    } 

  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        ok: false,
        err: error.response?.data
      } 
    }

    throw error;
  }
  
}

export default settingsAction

