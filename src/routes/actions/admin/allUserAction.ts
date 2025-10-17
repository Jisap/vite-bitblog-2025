import { bitblogApi } from "@/api";
import { redirect, type ActionFunction } from "react-router";
import { AxiosError } from "axios";
import type { ActionResponse } from "@/types";



const allUserAction: ActionFunction = async ({ request }) => {
  const data = await request.json() as { userId: string };
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    return redirect("/login");
  }

  try {
    await bitblogApi.delete(`/users/${data.userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    });

    return {
      ok: true,
    } as ActionResponse

  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        ok: false,
        err: error.response?.data
      } as ActionResponse
    }

    throw error;
  }

}

export default allUserAction