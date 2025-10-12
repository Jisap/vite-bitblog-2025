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

import { AdminLayout } from "@/components/layouts/AdminLayout";
import blogDetailLoader from "./loaders/user/blogDetailLoader";
import adminLoader from "./loaders/admin/adminLoader";
import { RootErrorBoundary } from "@/pages/error/Root";


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
    loader: adminLoader,
    ErrorBoundary: RootErrorBoundary,
    children: [
      {
        path: "dashboard",
        handle: { breadcrumb: "Dashboard" }
      },
      {
        path: "blogs",
        handle: { breadcrumb: "Blogs" }
      },
      {
        path: "blogs/create",
        handle: { breadcrumb: "Create a new Blog" }
      },
      {
        path: "blogs/:slug/edit",
        handle: { breadcrumb: "Edit Blog" }
      },
      {
        path: "comments",
        handle: { breadcrumb: "Comments" }
      },
      {
        path: "users",
        handle: { breadcrumb: "Users" }
      }
    ]
  },
  {
    path: "/settings",
    action: settingsAction
  }
]);

export default router;
