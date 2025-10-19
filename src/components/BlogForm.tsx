import { AnimatePresence, motion } from "motion/react"
import React, { useMemo, useState } from "react"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { GalleryThumbnailsIcon, XIcon } from "lucide-react"
import { data } from 'react-router';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { de } from "zod/v4/locales"
import { Tiptap } from "./Tiptap"



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

  const[data, setData] = useState<BlogFormData>({
    title: defaultValue?.title || "",
    content: defaultValue?.content || "",
  });

  const [bannerPreviewUrl, setBannerPreviewUrl] = useState<string | undefined>(defaultValue?.bannerUrl);

  const status = defaultValue?.status || "draft";
  const hasBanner = useMemo(() => Boolean(bannerPreviewUrl), [bannerPreviewUrl])

  return (
    <div className="relative space-y-5">
      {/* Banner input image */}
      <div className="relative min-h-9 isolate">
        {!hasBanner && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                className="absolute top-0.5 left-0.5 overflow-hidden"
                asChild
              >
                <Label>
                  <GalleryThumbnailsIcon />
                  Add a cover

                  <Input 
                    type="file"
                    accept=",jpg, jpeg, png, webp"
                    name="banner_image"
                    className="sr-only"
                    onChange={(event) => {
                      if(!event.target.files) return;

                      setData((prevData) => ({
                        ...prevData,
                        banner_image: event.target.files?.[0]
                      }))
                      setBannerPreviewUrl(
                        URL.createObjectURL(event.target.files?.[0]))
                    }}
                  />
                </Label>
              </Button>
            </TooltipTrigger>

            <TooltipContent side="right">
              Maximum banner size 2mb <br/> Format should be JPG, PNG, or WEBP
            </TooltipContent>
          </Tooltip>
        )}

        {hasBanner && (
          <Button
            variant="outline"
            size="icon"
            className="absolute top2 lef-2 z-30"
            aria-label="Remove banner image"
            onClick={() => {
              setData((prevData) => ({
                ...prevData,
                banner_image: undefined
              }))
              setBannerPreviewUrl(undefined)
            }}
          >
            <XIcon />
          </Button>
        )}

        <AnimatePresence>
          {hasBanner && (
            <motion.figure 
              className="rounded-xl overflow-hidden border"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 240 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{
                type: "spring",
                visualDuration: 0.25,
                bounce: 0.2,
              }}
            >
              <img 
                src={bannerPreviewUrl}
                alt="Banner"
                className="w-full h-full object-cover"
              />
            </motion.figure>
          )}
        </AnimatePresence>
      </div>

      <Textarea 
        name="title"
        maxLength={180}
        className="!text-4xl font-semibold tracking-tight border-none !ring-0 !bg-transparent px-0 resize-none shadow-none"
        placeholder="New post title here..."
        onChange={(evente) => 
          setData((prevData) => ({
            ...prevData,
            title: evente.target.value
          }))
        }
        value={data.title}
      />

      <div className="relative border inset-ring-border rounded-xl">
        <Tiptap 
          onUpdate={({ editor }) => setData((prevData) => ({...prevData, content: editor.getHTML() }))}
          content={data.content}
        />
      </div>
    </div>
  )
}
