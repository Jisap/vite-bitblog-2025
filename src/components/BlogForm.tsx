import { AnimatePresence, motion } from "motion/react"
import React, { useMemo, useState } from "react"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { GalleryThumbnailsIcon, XIcon } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";



type BlogFormData = {
  banner_image?: Blob;
  title: string;
  content: string;
}

type BlogStatus = "draft" | "published";

type FormDefaultValue = {
  bannerUrl: string;
  title: string;
  content: string;
  status: BlogStatus;
}

type BlogFormProps = {
  defaultValue?: FormDefaultValue;
  onSubmit: (formData: BlogFormData, status: BlogStatus) => void;
}



export const BlogForm: React.FC<BlogFormProps> = ({ defaultValue, onSubmit }) => {
  return (
    <div>
      BlogForm
    </div>
  )
}
