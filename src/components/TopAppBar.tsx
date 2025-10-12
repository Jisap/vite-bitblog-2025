import { Link, useLocation, useNavigation } from "react-router"
import { Sidebar, SidebarTrigger } from "./ui/sidebar"
import { Separator } from "./ui/separator"
import { Button } from "./ui/button"
import { ThemeToggle } from "./ThemeToggle"
import { PlusIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { AppBreadcrumb } from "./AppBreadcrumb"



export const TopAppBar = ({ className, ...props }: React.ComponentProps<"header">) => {
  
  const location = useLocation();    // Obtenemos la ruta actual
  const navigation = useNavigation();// Obtenemos el objeto de navegación
  
  const isLoading = navigation.state === "loading";

  return (
    <header 
      className={cn(
        "relative flex h-16 shrink-0 items-center gap-2 px-4",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2">
        <SidebarTrigger />

        <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />

        <AppBreadcrumb />
      </div>
    </header>
  )
}

