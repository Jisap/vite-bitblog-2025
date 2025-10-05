import { Login } from "@/pages/auth/Login";
import SignUp from "@/pages/auth/SignUp";
import { createBrowserRouter } from "react-router";

import signupAction from "@/routes/actions/auth/signup";
import Home from "@/pages/Home";
import loginAction from "./actions/auth/login";
import refreshTokenLoader from "./loaders/refreshToken";


const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
    action: loginAction
  },
  {
    path: "/signup",
    Component: SignUp,
    action: signupAction,
  },
  {
    path: "/refresh-token",
    loader: refreshTokenLoader,
  },
  {
    path: "/",
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "blogs"
      },
      {
        path: "blogs/:slug",
      }    
    ]
  },
  {
    path: "/admin",
    children: [
      {
        path: "dashboard",
      },
      {
        path: "blogs",
      },
      {
        path: "blogs/create",
      },
      {
        path: "blogs/:slug/edit",
      },
      {
        path: "comments"
      },
      {
        path: "users"
      }
    ]
  },
  {
    path: "/settings",
  }
]);

export default router;
