import { Link } from "react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "./ui/button";
import { useUser } from "@/hooks/useUser";
import { ChevronsUpDownIcon, LayoutDashboardIcon, LogOutIcon, SettingsIcon } from "lucide-react";
import Avatar from "react-avatar"
import { useLogout } from "@/hooks/useLogout";
import { SettingsDialog } from "./SettingsDialog";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "./ui/sidebar";



export const SidebarUserMenu = () => {

  const { isMobile } = useSidebar();

  const user = useUser();

  const logout = useLogout();

  if (user) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton 
                size="lg" 
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar
                  email={user.email}
                  size="32"
                  className="rounded-sm"
                />

                <div className="grid flex-1 text-left text-sm leading-tight">
                  <div className="truncate font-medium">{user.username}</div>
                  <div className="truncate text-xs">{user.email}</div>
                </div>

                <ChevronsUpDownIcon className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent 
              align="end" 
              side={isMobile ? "bottom" : "right"}
              sideOffset={4}
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar
                    email={user.email}
                    size="32"
                    className="rounded-lg"
                  />

                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <div className="truncate font-medium">
                      {user.username}
                    </div>
                    <div className="truncate text-xs">
                      {user.email}
                    </div>
                  </div>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <SettingsDialog>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <SettingsIcon />
                    Settings
                  </DropdownMenuItem>
                </SettingsDialog>

                <DropdownMenuItem onClick={logout}>
                  <LogOutIcon />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>

    )
  }
}


