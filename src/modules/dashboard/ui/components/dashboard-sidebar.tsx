"use client";


import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { BotIcon, HomeIcon, StarIcon, VideoIcon } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { usePathname } from "next/navigation";
import { DashboardUserButton } from "./dashboard-user-button";
import { DashboardTrial } from "./dashboard-trial";



const firstSection = [
    {
        icon: HomeIcon,
        label: "Dashboard",
        href: "/",
    },
    {
        icon: VideoIcon,
        label: "Meetings",
        href: "/meetings",
    },
    {
        icon: BotIcon,
        label: "Agents",
        href: "/agents",
    },
];

const secondSection = [
    {
        icon: StarIcon,
        label: "Upgrade",
        href: "/upgrade",
    },
];

export const DashboardSidebar = () => {
    const pathName = usePathname();



    return (
        <Sidebar>
            <SidebarHeader className="text-sidebar-accent-foreground">
                <Link href="/" className="flex items-center gap-2 px-2 pt-2">
                    <Image src="/logo.svg" height={36} width={36} alt="Agentic Meet" />
                    <p className="text-2xl font-semibold">Agentic Meet</p>
                </Link>
            </SidebarHeader>
            <div className="px-4 py-2">
                <Separator className="bg-white/5" />
            </div>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {firstSection.map((item) => (
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton
                                        asChild
                                        className={cn(
                                            "h-10 rounded-xl border border-transparent hover:bg-[#1B254B] hover:border-[#0075FF]/20 transition-all duration-300",
                                            pathName === item.href && "bg-[#1B254B] border-[#0075FF]/30 shadow-[0_0_20px_rgba(0,117,255,0.15)]"
                                        )}
                                        isActive={pathName === item.href}
                                    >
                                        <Link href={item.href}>
                                            <item.icon className="size-5" />
                                            <span className="text-sm font-medium tracking-tight">
                                                {item.label}
                                            </span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <div className="px-4 py-2">
                    <Separator className="bg-white/5" />
                </div>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {secondSection.map((item) => (
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton
                                        asChild
                                        className={cn(
                                            "h-10 rounded-xl border border-transparent hover:bg-[#1B254B] hover:border-[#0075FF]/20 transition-all duration-300",
                                            pathName === item.href && "bg-[#1B254B] border-[#0075FF]/30 shadow-[0_0_20px_rgba(0,117,255,0.15)]"
                                        )}
                                        isActive={pathName === item.href}
                                    >
                                        <Link href={item.href}>
                                            <item.icon className="size-5" />
                                            <span className="text-sm font-medium tracking-tight">
                                                {item.label}
                                            </span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="text-white">
                <DashboardTrial />
                <div className="flex items-center justify-between px-2">
                    <DashboardUserButton />
                    <ThemeToggle />
                </div>
            </SidebarFooter>
        </Sidebar>
    )
};