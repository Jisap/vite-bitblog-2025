import { cn } from "@/lib/utils"
import { motion, stagger } from "motion/react"
import { useLoaderData } from "react-router"
import type { Variants } from "motion/react";
import type React from "react";

const listVariant: Variants = {
  to: {
    transition: {
      staggerChildren: 0.05,
    }
  }
}

const itemVariant: Variants = {
  from: { opacity: 0 },
  to: {
    opacity: 1,
    transition: {
      duration: 1,
      ease: "backInOut",
    }
  }
}

export const RecentBlogs = ({ className, ...props}: React.ComponentProps<"section">) => {
  return (
    <section className={cn("section", className)} {...props}>
      RecentBlogs
    </section>
  )
}

