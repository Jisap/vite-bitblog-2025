import { Link } from "react-router";
import { Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { cn } from "@/lib/utils";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { formatDistanceToNowStrict } from "date-fns";
 

interface BlogCardProps extends React.ComponentProps<"div"> {
  bannerUrl: string;
  bannerWidth: number;
  bannerHeight: number;
  title: string;
  content: string;
  slug: string;
  authorName: string;
  publishedAt: string;
  size?: "default" | "sm"
}

export const BlogCard = ({
  bannerUrl,
  bannerWidth,
  bannerHeight,
  title,
  content,
  slug,
  authorName,
  publishedAt,
  size = "default",
  className,
  ...props
}: BlogCardProps) => {
  return (
    <div>BlogCard</div>
  )
}

