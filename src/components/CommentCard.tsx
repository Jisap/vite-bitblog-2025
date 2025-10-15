import { formatDistanceToNow } from "date-fns"
import Avatar from "react-avatar"
import { Link } from "react-router"
import { Button } from "./ui/button"
import { AspectRatio } from "./ui/aspect-ratio"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SquareArrowOutUpRightIcon, ThumbsUpIcon, TrashIcon } from "lucide-react"
import type { User, Blog } from "@/types";

type Props = {
  content: string;
  likesCount: number;
  user: User | null;
  blog: Blog;
  createdAt: string;
}


export const CommentCard = ({ content, likesCount, user, blog, createdAt }: Props) => {
  return (
    <div className="@container">
      <div className="group flex flex-col items-start gap-4 p-4 rounded-xl hover:bg-accent/25 @md:flex-row">
        <Avatar 
          email={user?.email} 
          size="40"
          round
        />

        <div className="flex flex-col gap-2 me-auto">
          <div className="flex items-center gap-2">
            {user ? (
              <div className="text-sm text-muted-foreground">
                @{user.username}
              </div>
            ):(
              <div className="text-sm text-destructive/80 italic">
                <Tooltip delayDuration={250}>
                  <TooltipTrigger>
                    Account deleted
                  </TooltipTrigger>

                  <TooltipContent>
                    This account has been deleted.
                  </TooltipContent>
                </Tooltip>
              </div>
            )}

            <div className="size-1 rounded-full bg-muted-foreground/50"></div>
          
            <div className="text-sm text-muted-foreground">
              <Tooltip delayDuration={250}>
                <TooltipTrigger>
                  {formatDistanceToNow(createdAt, {addSuffix: true})}
                </TooltipTrigger>

                <TooltipContent>
                  {new Date(createdAt).toLocaleString("en-US", {
                    dateStyle: "long",
                    timeStyle: "short",
                  })}
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          <div className="max-w-[60ch]">
            {content}
          </div>

          <div className="flex items-center gap-2 mt-1">
            <Button variant="ghost" aria-label="Like comment">
              <ThumbsUpIcon />

              {likesCount > 0 && (
                <span className="sr-only">Total likes: ${likesCount}</span>
              )}
            </Button>

            <Button variant="ghost" aria-label="Remove comment">
              <TrashIcon />
              Remove
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

