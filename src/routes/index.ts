import { Login } from "@/pages/auth/Login";
import SignUp from "@/pages/auth/SignUp";
import { createBrowserRouter } from "react-router";
import signupAction from "@/routes/actions/auth/signup";


const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/signup",
    Component: SignUp,
    action: signupAction,
  },
  {
    path: "/refresh-token",
  },
  {
    path: "/",
    children: [
      {
        index: true,
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
