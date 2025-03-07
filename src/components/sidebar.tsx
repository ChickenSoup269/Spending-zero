// components/AppSidebar.jsx
"use client"

import { useState } from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Home,
  Calendar,
  Menu,
  User,
  LogIn,
  Sun,
  Moon,
  Settings,
  ChevronDown,
  ChevronUp,
  ArrowUp,
} from "lucide-react"

// Dữ liệu menu mẫu
const menuItems = [
  {
    title: "Dashboard",
    items: [
      { label: "Home", icon: Home, href: "/" },
      { label: "Calendar", icon: Calendar, href: "/calendar" },
    ],
  },
  {
    title: "Account",
    items: [
      { label: "Profile", icon: User, href: "/profile" },
      {
        label: "Settings",
        icon: Settings,
        subItems: [
          { label: "Ngôn ngữ", href: "/settings/language" },
          { label: "Tài khoản", href: "/settings/account" },
          { label: "Liên kết", href: "/settings/links" },
        ],
      },
    ],
  },
  {
    title: "Khác",
    items: [
      {
        label: "API",
        icon: ArrowUp, // Icon đại diện cho "Khác"
        subItems: [{ label: "Giá vàng", href: "/gold-price" }],
      },
    ],
  },
]

export default function AppSidebar() {
  const [isOpen, setIsOpen] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle("dark")
  }

  const toggleSubMenu = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label)
  }

  return (
    <SidebarProvider>
      {/* Sidebar chính cho desktop */}
      <div
        className={`flex transition-all duration-300 ${
          isOpen ? "md:w-64" : "md:w-0"
        }`}
      >
        <Sidebar
          collapsible="icon"
          className={`hidden md:flex ${
            isOpen ? "w-64" : "w-0 overflow-hidden"
          }`}
        >
          <SidebarHeader className="p-4">
            <div className="flex items-center justify-between w-full">
              <h2 className="text-lg font-bold">My App</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </SidebarHeader>

          <SidebarContent>
            {menuItems.map((group, index) => (
              <SidebarGroup key={index}>
                <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {group.items.map((item, idx) => (
                      <SidebarMenuItem key={idx}>
                        {item.subItems ? (
                          <>
                            <SidebarMenuButton
                              onClick={() => toggleSubMenu(item.label)}
                              className="flex items-center justify-between w-full"
                            >
                              <div className="flex items-center gap-2">
                                <item.icon className="h-4 w-4" />
                                <span>{item.label}</span>
                              </div>
                              {openDropdown === item.label ? (
                                <ChevronUp className="h-4 w-4" />
                              ) : (
                                <ChevronDown className="h-4 w-4" />
                              )}
                            </SidebarMenuButton>
                            {openDropdown === item.label && (
                              <div className="pl-6">
                                {item.subItems.map((subItem, subIdx) => (
                                  <SidebarMenuButton
                                    key={subIdx}
                                    asChild
                                    className="w-full justify-start text-sm"
                                  >
                                    <a href={subItem.href}>{subItem.label}</a>
                                  </SidebarMenuButton>
                                ))}
                              </div>
                            )}
                          </>
                        ) : (
                          <SidebarMenuButton asChild>
                            <a
                              href={item.href}
                              className="flex items-center gap-2"
                            >
                              <item.icon className="h-4 w-4" />
                              <span>{item.label}</span>
                            </a>
                          </SidebarMenuButton>
                        )}
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
          </SidebarContent>

          <SidebarFooter className="p-4 space-y-2">
            <SidebarMenuButton
              onClick={toggleDarkMode}
              className="w-full justify-start"
            >
              {darkMode ? (
                <Moon className="h-4 w-4 mr-2" />
              ) : (
                <Sun className="h-4 w-4 mr-2" />
              )}
              <span>{darkMode ? "Dark Mode" : "Light Mode"}</span>
            </SidebarMenuButton>

            <SidebarMenuButton className="w-full justify-start">
              <LogIn className="h-4 w-4 mr-2" />
              <span>Login</span>
            </SidebarMenuButton>
          </SidebarFooter>
        </Sidebar>

        {!isOpen && (
          <Button
            variant="outline"
            size="icon"
            className="hidden md:flex fixed top-4 left-4"
            onClick={() => setIsOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        )}
      </div>

      {/* Sheet cho mobile */}
      <div className="md:hidden flex items-center p-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] p-0">
            <Sidebar collapsible="none" className="h-full">
              <SidebarHeader className="p-4">
                <div className="flex items-center justify-between w-full">
                  <h2 className="text-lg font-bold">My App</h2>
                </div>
              </SidebarHeader>

              <SidebarContent>
                {menuItems.map((group, index) => (
                  <SidebarGroup key={index}>
                    <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
                    <SidebarGroupContent>
                      <SidebarMenu>
                        {group.items.map((item, idx) => (
                          <SidebarMenuItem key={idx}>
                            {item.subItems ? (
                              <>
                                <SidebarMenuButton
                                  onClick={() => toggleSubMenu(item.label)}
                                  className="flex items-center justify-between w-full"
                                >
                                  <div className="flex items-center gap-2">
                                    <item.icon className="h-4 w-4" />
                                    <span>{item.label}</span>
                                  </div>
                                  {openDropdown === item.label ? (
                                    <ChevronUp className="h-4 w-4" />
                                  ) : (
                                    <ChevronDown className="h-4 w-4" />
                                  )}
                                </SidebarMenuButton>
                                {openDropdown === item.label && (
                                  <div className="pl-6">
                                    {item.subItems.map((subItem, subIdx) => (
                                      <SidebarMenuButton
                                        key={subIdx}
                                        asChild
                                        className="w-full justify-start text-sm"
                                      >
                                        <a href={subItem.href}>
                                          {subItem.label}
                                        </a>
                                      </SidebarMenuButton>
                                    ))}
                                  </div>
                                )}
                              </>
                            ) : (
                              <SidebarMenuButton asChild>
                                <a
                                  href={item.href}
                                  className="flex items-center gap-2"
                                >
                                  <item.icon className="h-4 w-4" />
                                  <span>{item.label}</span>
                                </a>
                              </SidebarMenuButton>
                            )}
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </SidebarGroup>
                ))}
              </SidebarContent>

              <SidebarFooter className="p-4 space-y-2">
                <SidebarMenuButton
                  onClick={toggleDarkMode}
                  className="w-full justify-start"
                >
                  {darkMode ? (
                    <Moon className="h-4 w-4 mr-2" />
                  ) : (
                    <Sun className="h-4 w-4 mr-2" />
                  )}
                  <span>{darkMode ? "Dark Mode" : "Light Mode"}</span>
                </SidebarMenuButton>

                <SidebarMenuButton className="w-full justify-start">
                  <LogIn className="h-4 w-4 mr-2" />
                  <span>Login</span>
                </SidebarMenuButton>
              </SidebarFooter>
            </Sidebar>
          </SheetContent>
        </Sheet>
      </div>
    </SidebarProvider>
  )
}
