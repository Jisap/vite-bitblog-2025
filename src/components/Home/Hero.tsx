import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import type { Variants } from "motion/react";
import type React from "react";

const HERO = {
  headline: "Inside Design: Stories and interviews",
  text: "subscribe to learn abour new products features, the latest in technology, and updates."
} as const;

const containerVariants: Variants = {
  to: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const childVariants: Variants = {
  from: { opacity: 0, filter: "blur(10px)" },
  to: {
    opacity: 1,
    filter: "blur(0)",
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  }
}


export const Hero = ({ className, ...props }: React.ComponentProps<"section">) => {
  return (
    <section className={cn("section", className)} {...props}>
      <motion.div
        className="container"
        initial="from"
        whileInView="to"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <motion.h1
          className="text-3xl font-semibold text-balance text-center md:text-4xl xl:text-5xl"
          variants={childVariants}
        >
          {HERO.headline}
        </motion.h1>

        <motion.p
          className="text-center text-muted-foreground mt-5 mb-8 md:text-xl"
          variants={childVariants}
        >
          {HERO.text}
        </motion.p>
      </motion.div>
    </section>
  )
}

