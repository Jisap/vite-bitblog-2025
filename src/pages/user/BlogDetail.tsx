import { Page } from "@/components/Page";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useCallback, useMemo } from "react";
import Avatar from "react-avatar";
import { useLoaderData, useNavigate } from "react-router";
import { toast } from "sonner";


import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { ArrowLeftIcon, Facebook, LinkedinIcon, LinkIcon, MessageSquareIcon, ShareIcon, ThumbsUpIcon, TwitterIcon } from "lucide-react";
import type { Blog } from "@/types";
import type { DropdownMenuProps } from "@radix-ui/react-dropdown-menu"
import { getReadingTime, getUsername } from "@/lib/utils";

interface ShareDropdownProps extends DropdownMenuProps {
  blogTitle: string,
}


export const BlogDetail = () => {

  const navigate = useNavigate();
  const { blog } = useLoaderData() as {blog: Blog};
  const editor = useEditor({
    extensions: [StarterKit],
    content: blog.content,
    editable: false,
    autofocus: false,
  });

  return (
    <Page>
      <article className="relative container max-w-[720px] pt-6 pb-12">
        <Button
          variant="outline"
          size="icon"
          className="sticky top-2'' -ms-16"
          onClick={() => navigate(-1)}
        >
          <ArrowLeftIcon />
        </Button>

        <h1 className="text-4xl leading-tight font-semibold -mt-10">
          {blog.title}
        </h1>

        <div className="flex items-centergap-3 my-8">
          <div className="flex items-center gap-3">
            <Avatar email={blog.author.email} size="32" round />

            <span>
              {getUsername(blog.author)}
            </span>

            {/* Sobreescribimos los valores por defecto de data-[orientation=vertical] para que el separador sea un círculo */}	
            <Separator 
              orientation="vertical" 
              className="data-[orientation=vertical]:h-1 data-[orientation=vertical]:w-1 rounded-full" 
            />

            <div className="text-muted-foreground">
              {getReadingTime(editor.getText() || "")} min read
            </div>

            <Separator
              orientation="vertical"
              className="data-[orientation=vertical]:h-1 data-[orientation=vertical]:w-1 rounded-full"
            />

            <div className="text-muted-foreground">
              {new Date(blog.publishedAt).toLocaleString("en-US", {
                dateStyle: "medium",
              })}
            </div>

            <div className="flex items-center gap-2 my-2">
              <Button variant="ghost">
                <ThumbsUpIcon />
                {blog.likesCount}
              </Button>

              <Button variant="ghost">
                <MessageSquareIcon />
                {blog.commentsCount}
              </Button>

              <Button variant="ghost" className="ms-auto">
                <ShareIcon />
                Share
              </Button>
            </div>
          </div>
        </div>
      </article>
    </Page>
  )
}