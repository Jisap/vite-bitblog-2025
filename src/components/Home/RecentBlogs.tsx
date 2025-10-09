import { cn } from "@/lib/utils"
import { motion, stagger } from "motion/react"
import { useLoaderData } from "react-router"
import type { Variants } from "motion/react";
import type { HomeLoaderResponse } from '../../routes/loaders/user/homeLoader';




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
  
  const { recentBlog } = useLoaderData<HomeLoaderResponse>();
  
  return (
    <section className={cn("section", className)} {...props}>
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1,
            transition: {
              duration: 0.5,
              ease: "easeOut",
            },
          }}
        >
          Recent blog posts
        </motion.h2>

      </div>
    </section>
  )
}

