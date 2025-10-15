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

  const fetcher = useFetcher();


  return (
    <Card className="group py-4">
      <CardContent className="grid grid-cols-[max-content_minmax(0,1fr)_max-content] gap-4 px-4">
        <Avatar 
          email={email}
          size="40"
          name={firstName || lastName ? [firstName, lastName].join(" ") : email}
          className="rounded-lg"
        />

        <div>
          {/* Badge "admin" */}
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">
              {firstName || lastName 
                ? [firstName, lastName].join(" ") 
                : username
              }
            </h3>

            {role === "admin" && (
              <Badge variant="outline" className="capitalize">
                {role}
              </Badge>
            )}
          </div>

          {/* email */}
          <p className="text-sm text-muted-foreground">
            {email}
          </p>

          <div className="text-xs text-muted-foreground mt-2">
            <Tooltip delayDuration={250}>
              <TooltipTrigger>
                Joined{" "}
                {formatDistanceToNowStrict(createdAt, { addSuffix: true })}
              </TooltipTrigger>

              <TooltipContent side="right">
                {new Date(createdAt).toLocaleString("en-US", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

