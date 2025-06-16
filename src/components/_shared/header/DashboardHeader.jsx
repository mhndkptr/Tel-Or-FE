"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import CustomBadge from "../badge/CustomBadge";
import { useAuth } from "@/contexts/authContext";

export function DashboardHeader({ title }) {
  const { user, role } = useAuth();

  return (
    <>
      <div className="sticky top-0 z-30 w-full border-b bg-background lg:px-6 lg:py-4 md:px-5 py-3.5 px-3">
        <div className="flex items-center space-x-2">
          <div className="flex items-center gap-4 md:hidden">
            <SidebarTrigger />
          </div>
          <div className="flex flex-1 items-start justify-between">
            <div className="space-y-1">
              <h1 className="font-bold lg:text-2xl md:text-xl text-lg">{title}</h1>
              {user && (
                <div className="flex items-center md:gap-3 gap-1">
                  <h3 className="md:text-base text-sm font-semibold">👋 Halo, {user.fullname}!</h3>
                  {role && (
                    <CustomBadge type="info" rounded="full" weight="semibold" className="md:block hidden">
                      <p className="capitalize">{role.toLowerCase()}</p>
                    </CustomBadge>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
