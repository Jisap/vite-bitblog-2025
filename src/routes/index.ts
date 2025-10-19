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
import { Dashboard } from "@/pages/admin/Dashboard";
import dashboardLoader from "./loaders/admin/dashboardLoader";
import blogEditAction from "./actions/admin/blogEditAction";
import blogsAction from "./actions/admin/blogsAction";
import allUserAction from "./actions/admin/allUserAction";
import { BlogsAdmin } from "@/pages/admin/Blogs";
import allBlogsLoader from "./loaders/admin/allBlogsLoader";
import allCommentLoader from "./loaders/admin/allCommentLoader";
import { CommentsAdmin } from "@/pages/admin/Comments";

import allUserLoader from "./loaders/admin/allUserLoader";
import { UsersAdmin } from "@/pages/admin/Users";




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
        Component: Dashboard,
        loader: dashboardLoader,
        handle: { breadcrumb: "Dashboard" }
      },
      {
        path: "blogs",
        Component: BlogsAdmin,
        loader: allBlogsLoader,
        action: blogsAction,
        handle: { breadcrumb: "Blogs" }
      },
      {
        path: "blogs/create",
        handle: { breadcrumb: "Create a new Blog" }
      },
      {
        path: "blogs/:slug/edit",
        action: blogEditAction,
        handle: { breadcrumb: "Edit Blog" }
      },
      {
        path: "comments",
        Component: CommentsAdmin,
        loader: allCommentLoader,
        handle: { breadcrumb: "Comments" }
      },
      {
        path: "users",
        Component: UsersAdmin,
        loader: allUserLoader,
        action: allUserAction,
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
