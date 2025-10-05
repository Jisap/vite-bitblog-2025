import { cn } from "@/lib/utils"
import { MenuIcon, XIcon } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Logo } from "./Logo"




export const Header = ( { className, ...props }: React.ComponentProps<'header'>) => {
  return (
    <header 
      className={cn(
        "border-b fixed top-0 left-0 w-full h-16 grid items-center bg-background z-40",
        className
      )}
    {...props}
    >
      <div className="container py-3 flex items-center gap-4">
        <Logo />
      </div>
    </header>
  )
}

