import { Login } from "@/pages/auth/Login";
import SignUp from "@/pages/auth/SignUp";
import { createBrowserRouter } from "react-router";

import signupAction from "@/routes/actions/auth/signup";
import { Home } from "@/pages/user/Home";
import loginAction from "./actions/auth/login";
import refreshTokenLoader from "./loaders/refreshToken";
import { RootLayout } from "@/components/layouts/Roots";
import settingsAction from "./actions/user/settings";
import homeLoader from "./loaders/user/homeLoader";
import { Blogs } from "@/pages/user/Blogs";
import userBlogLoader from "./loaders/user/userBlogLoader";
import { BlogDetail } from "@/pages/user/BlogDetail";
import blogDetailLoader from "./loaders/user/BlogDetailLoader";
import { AdminLayout } from "@/components/layouts/AdminLayout";


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
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
        loader: homeLoader,
      },
      {
        path: "blogs",
        Component: Blogs,
        loader: userBlogLoader
      },
      {
        path: "blogs/:slug",
        Component: BlogDetail,
        loader: blogDetailLoader
      }    
    ]
  },
  {
    path: "/admin",
    Component: AdminLayout,
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
    action: settingsAction
  }
]);

export default router;
