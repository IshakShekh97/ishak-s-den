"use client";

import React from "react";
import { Dock, DockIcon } from "@/components/dock";
import { Home, FolderKanban, Mail, User, LogOut } from "lucide-react";
import Link from "next/link";
import ThemeToggleButton from "@/components/animated/theme-toggle-button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { redirect, usePathname } from "next/navigation";
import { authClient, useSession } from "@/lib/auth-client";
import { MdDashboard } from "react-icons/md";

export type IconProps = React.HTMLAttributes<SVGElement>;

export function NavBar() {
  const { data } = useSession();

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "About", href: "/about", icon: User },
    { name: "Projects", href: "/projects", icon: FolderKanban },
    { name: "Contact", href: "/contact", icon: Mail },
  ];

  const pathName = usePathname();
  return (
    <div className="fixed top-2 left-0 right-0 z-50 flex justify-center">
      <TooltipProvider>
        <Dock iconMagnification={60} iconDistance={100}>
          {navItems.map((item) => (
            <DockIcon key={item.name} className="bg-black/10 dark:bg-white/10">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    aria-label={item.name}
                    className={cn(
                      buttonVariants({ size: "icon" }),
                      "size-10 rounded-full",
                      pathName === item.href
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground bg-secondary hover:bg-secondary/50 dark:hover:bg-secondary/50"
                    )}
                  >
                    <item.icon className="size-4" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item.name}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}

          {data?.user && (
            <>
              <DockIcon className="bg-black/10 dark:bg-white/10">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href="/dashboard"
                      aria-label="Dashboard"
                      className={cn(
                        buttonVariants({ size: "icon" }),
                        "size-10 rounded-full",
                        pathName === "/dashboard"
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground bg-secondary hover:bg-secondary/50 dark:hover:bg-secondary/50"
                      )}
                    >
                      <MdDashboard className="size-4" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Dashboard</p>
                  </TooltipContent>
                </Tooltip>
              </DockIcon>
              <DockIcon className="bg-black/10 dark:bg-white/10">
                <Tooltip>
                  <TooltipTrigger
                    onClick={async () => {
                      await authClient.signOut();
                      redirect("/sign-in");
                    }}
                    className={cn(
                      buttonVariants({ size: "icon", variant: "destructive" }),
                      "size-10 rounded-full"
                    )}
                  >
                    <LogOut className="size-4" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Log Out</p>
                  </TooltipContent>
                </Tooltip>
              </DockIcon>
            </>
          )}

          <DockIcon>
            <ThemeToggleButton start="bottom-right" variant="polygon" />
          </DockIcon>
        </Dock>
      </TooltipProvider>
    </div>
  );
}
