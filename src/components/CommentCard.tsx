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
      <p>Content: {content}</p>
      <p>Likes: {likesCount}</p>
      <p>User: {user?.username}</p>
      <p>Created: {createdAt}</p>
    </div>
  )
}

