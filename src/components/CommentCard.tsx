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
        <Avatar />
      </div>
    </div>
  )
}

