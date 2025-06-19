"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  History,
  LogOut,
  X,
  LayoutGrid,
  UserRoundCog,
  FileText,
  Calculator,
  Wallet,
  Menu,
  ShieldUser,
  Settings,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { useAuth } from "@/contexts/authContext";
import { ROLE } from "@/utils/constants";
import { useMediaQuery } from "@/hooks/use-media-query";

export function DashboardSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { logout, role } = useAuth();
  const { open, setOpen, toggleSidebar } = useSidebar();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [openSections, setOpenSections] = React.useState({
    management: true,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const closeAllSections = () => {
    setOpenSections({
      management: false,
    });
  };

  const handleSetOpen = (value) => {
    setOpen(value);
    if (!value) {
      closeAllSections();
    }
  };

  let sidebarMenus = [];

  if (role === ROLE.ADMIN)
    sidebarMenus = [
      {
        type: "single",
        name: "Dashboard",
        href: "/dashboard",
        icon: LayoutGrid,
        isActive: pathname === "/dashboard",
      },
      {
        type: "collapsible",
        name: "Management",
        icon: UserRoundCog,
        section: "management",
        isOpen: openSections.management,
        isActive: pathname.startsWith("/dashboard/management"),
        items: [
          {
            name: "User",
            href: "/dashboard/management/user",
            isActive: pathname.startsWith("/dashboard/management/user"),
          },
          {
            name: "Ormawa",
            href: "/dashboard/management/ormawa",
            isActive: pathname.startsWith("/dashboard/management/ormawa"),
          },
          {
            name: "Event",
            href: "/dashboard/management/event",
            isActive: pathname.startsWith("/dashboard/management/event"),
          },
          {
            name: "Faq",
            href: "/dashboard/management/faq",
            isActive: pathname.startsWith("/dashboard/management/faq"),
          },
        ],
      },
      {
        type: "single",
        name: "Setting",
        href: "/dashboard/setting",
        icon: Settings,
        isActive: pathname === "/dashboard/setting",
      },
    ];

  if (role === ROLE.ORGANIZER)
    sidebarMenus = [
      {
        type: "single",
        name: "Dashboard",
        href: "/dashboard",
        icon: LayoutGrid,
        isActive: pathname === "/dashboard",
      },
      {
        type: "collapsible",
        name: "Management",
        icon: UserRoundCog,
        section: "management",
        isOpen: openSections.management,
        isActive: pathname.startsWith("/dashboard/management"),
        items: [
          {
            name: "Ormawa",
            href: "/dashboard/management/ormawa",
            isActive: pathname.startsWith("/dashboard/management/ormawa"),
          },
          {
            name: "Event",
            href: "/dashboard/management/event",
            isActive: pathname.startsWith("/dashboard/management/event"),
          },
        ],
      },
      {
        type: "single",
        name: "Setting",
        href: "/dashboard/setting",
        icon: Settings,
        isActive: pathname === "/dashboard/setting",
      },
    ];

  return (
    <Sidebar collapsible="icon" className={"!bg-white"}>
      <SidebarHeader className="pt-6 pb-3 bg-white">
        <div
          className={`flex items-center ${
            open ? "gap-2 px-3 justify-between" : "justify-center"
          } transition-all duration-300 ease-in-out`}
        >
          <div
            onClick={() => {
              if (isMobile) {
                toggleSidebar();
              } else {
                handleSetOpen(!open);
              }
            }}
            className={`flex items-center gap-2 ${!open && "cursor-pointer"}`}
          >
            {!open && <Menu className="h-6 w-6" />}

            {open && (
              <Avatar className="h-8 w-8">
                <AvatarImage src="/assets/logos/logo-telkom-university-v.png" alt="Tel-Or Logo" />
                <AvatarFallback>PB</AvatarFallback>
              </Avatar>
            )}

            {open && <h2 className="md:text-base text-sm font-semibold">Tel-Or Backoffice</h2>}
          </div>
          <X
            onClick={() => {
              if (isMobile) {
                toggleSidebar();
              } else {
                handleSetOpen(!open);
              }
            }}
            className={`cursor-pointer ${!open && "hidden"}`}
          />
        </div>
      </SidebarHeader>
      <SidebarContent className="px-3 py-2 w-full bg-white">
        <SidebarMenu>
          {sidebarMenus.map((menu, index) => (
            <React.Fragment key={menu.name}>
              {menu.type === "single" ? (
                <SidebarMenuItem className="mx-auto w-full">
                  <SidebarMenuButton
                    asChild
                    isActive={menu.isActive}
                    tooltip={menu.name}
                    onClick={() => router.push(menu.href)}
                    className={`mx-auto cursor-pointer transition ${
                      menu.isActive ? "bg-[#F5F5F5] border border-[#D6D6D6]" : "bg-[#FCFCFC] hover:bg-[#F5F5F5]"
                    }`}
                  >
                    <div className="w-full flex justify-start items-center">
                      <menu.icon
                        className={`${
                          open ? "mr-1" : "mx-auto"
                        } md:size-5 size-4 transition-all duration-300 ease-in-out stroke-2`}
                      />
                      <p className={`${!open && "hidden"} transition-all duration-300 ease-in-out text-sm font-medium`}>
                        {menu.name}
                      </p>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ) : menu.type === "collapsible" ? (
                <SidebarMenuItem>
                  <Collapsible open={menu.isOpen} onOpenChange={() => toggleSection(menu.section)} className="w-full">
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        className={`w-full cursor-pointer mx-auto transition ${
                          menu.isActive ? "bg-[#F5F5F5] border border-[#D6D6D6]" : "bg-[#FCFCFC] hover:bg-[#F5F5F5]"
                        }  ${open ? "justify-between" : "justify-center"}`}
                        tooltip={menu.name}
                      >
                        <div className="flex items-center">
                          <menu.icon
                            className={`${
                              open ? "mr-2" : "mx-auto"
                            } md:size-5 size-4 transition-all duration-300 ease-in-out stroke-2`}
                          />
                          <p
                            className={`${
                              !open && "hidden"
                            } transition-all duration-300 ease-in-out text-sm font-medium`}
                          >
                            {menu.name}
                          </p>
                        </div>
                        {open && (
                          <ChevronDown
                            className={`h-4 w-4 transition-transform duration-300 ease-in-out ${
                              menu.isOpen ? "rotate-180" : ""
                            }`}
                          />
                        )}
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent
                      className={`${
                        open ? "pl-6" : "pl-0"
                      } pt-2 transition-all duration-300 ease-in-out bg-[#FCFCFC] rounded-md`}
                    >
                      <SidebarMenu>
                        {menu.items.map((item) => (
                          <SidebarMenuItem key={item.name} className="mx-auto w-full">
                            <SidebarMenuButton
                              asChild
                              isActive={pathname === item.href}
                              tooltip={item.name}
                              onClick={() => router.push(item.href)}
                              className={`mx-auto cursor-pointer py-1.5 transition ${
                                item.isActive ? "bg-[#F5F5F5] border border-[#D6D6D6]" : "hover:bg-[#F5F5F5]"
                              }`}
                            >
                              <p
                                className={`${
                                  !open && "hidden"
                                } transition-all duration-300 ease-in-out font-medium text-xs`}
                              >
                                {item.name}
                              </p>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                    </CollapsibleContent>
                  </Collapsible>
                </SidebarMenuItem>
              ) : null}
            </React.Fragment>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-3">
        <Button
          type="button"
          onClick={() => logout()}
          variant="ghostDestructive"
          className={`w-full ${open ? "justify-center" : "justify-center"}`}
          size="md"
        >
          <LogOut className={`${open ? "mr-2" : ""} size-5`} />
          {open && <p className="text-sm">Keluar Aplikasi</p>}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
