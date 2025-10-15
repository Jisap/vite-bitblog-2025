import { formatDistanceToNowStrict } from "date-fns"
import { useFetcher } from "react-router"
import { toast } from "sonner"
import { 
  Card,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
  CardAction,
  CardContent,
} from "./ui/card"
import Avatar from "react-avatar"
import { Badge } from "./ui/badge"
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from "./ui/alert-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "./ui/button"
import { Trash2Icon } from "lucide-react"
import type { UserResponse } from "@/hooks/useUser"


type Props = {
  userId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  username: string;
  role: "user" | "admin";
  createdAt: string;
  loggedInUser?: UserResponse;
  onUserDeleteSuccess?: () => void;
}



export const UserCard = ({ 
  userId, 
  email, 
  firstName, 
  lastName, 
  username, 
  role, 
  createdAt, 
  loggedInUser, 
  onUserDeleteSuccess 
}: Props) => {
  return (
    <div>UserCard</div>
  )
}

