import { Link, useLocation, useNavigation } from "react-router"
import { Sidebar } from "./ui/sidebar"
import { Separator } from "./ui/separator"
import { Button } from "./ui/button"
import { ThemeToggle } from "./ThemeToggle"
import { PlusIcon } from "lucide-react"



export const TopAppBar = ({ className, ...props }: React.ComponentProps<"header">) => {
  
  const location = useLocation();    // Obtenemos la ruta actual
  const navigation = useNavigation();// Obtenemos el objeto de navegación
  
  return (
    <div>
      Header
    </div>
  )
}

