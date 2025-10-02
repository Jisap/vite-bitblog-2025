import { useForm } from "react-hook-form";
import { Link, useFetcher, useNavigate } from "react-router"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { loginBanner } from "@/assets";
import { LoaderCircleIcon } from "lucide-react";


import type {ActionResponse, AuthResponse, ValidationError} from "@/types/index"

type LoginFieldName = "email" | "password";

const LOGIN_FORM = {
  title: "Welcome back",
  description: "Login to your BitBlog account",
  footerText: "Don't have an account? Sign up",
} as const;

const formSchema = z.object({
  email: z
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email is required" })
    .max(50, { message: "Email must be less than 50 characters" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters" })
})



export const LoginForm = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div 
      className={cn(
        "",
        className
      )}
      {...props}
    >
      LoginForm
    </div>
  )
}
