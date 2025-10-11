import { Outlet } from "react-router"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "../AppSidebar"




export const AdminLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
    </SidebarProvider>
  )

}