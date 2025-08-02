"use client";

import React from "react";
import { Dock, DockIcon } from "@/components/dock";
import {
  Home,
  BadgePercent,
  Atom,
  GraduationCap,
  FolderKanban,
  Mail,
} from "lucide-react";
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

export type IconProps = React.HTMLAttributes<SVGElement>;

export function NavBar() {
  const navItems = [
    { name: "Home", href: "#home", icon: Home },
    { name: "Skills", href: "#skills", icon: BadgePercent },
    { name: "Technologies", href: "#technologies", icon: Atom },
    { name: "Education", href: "#education", icon: GraduationCap },
    { name: "Portfolio", href: "#portfolio", icon: FolderKanban },
    { name: "Contact", href: "#contact", icon: Mail },
  ];

  return (
    <div className="fixed bottom-2 left-0 right-0 z-50 flex justify-center">
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
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "size-12 rounded-full"
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

          <DockIcon>
            <ThemeToggleButton start="bottom-right" variant="circle-blur" />
          </DockIcon>
        </Dock>
      </TooltipProvider>
    </div>
  );
}
