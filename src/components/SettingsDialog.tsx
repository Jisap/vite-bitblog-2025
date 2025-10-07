import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useFetcher } from "react-router";
import z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs"
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import { InputPassword } from "./InputPassword";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useUser } from "@/hooks/useUser";
import { AtSignIcon, Loader2Icon, MailIcon } from "lucide-react";


import type { DialogProps } from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";


const profileSchema = z.object({
  firstName: z
    .string()
    .max(20, "First name must be than 20 characters" ),
  lastName: z
    .string()
    .max(20, "Last name must be than 20 characters" ),
  email: z
    .email({ message: "Invalid email address" })
    .max(50, "Email must be less than 50 characters"),
  username: z.string().max(20, "Username must be less than 20 characters")
});

const ProfileSettings = () => {
  return (
    <div>
      Profile Settings Form
    </div>
  )
}

const passwordFormSchema = z.object({
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters" }),
  confirm_Password: z
    .string()
})
.refine((data) => data.password === data.confirm_Password, {
  message: "Passwords do not match",
  path: ["confirm_Password"],
});

const PasswordSettingsForm = () => {
  return (
    <div>
      Password Settings Form
    </div>
  )
}


export const SettingsDialog = ({ children, ...props }: React.PropsWithChildren<DialogProps>) => {
  return (
    <div>
      Settings Dialog
    </div>
  )
}
  