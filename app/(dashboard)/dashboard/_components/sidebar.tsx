"use client";

"use client";

import { FreeCounter } from "@/components/FreeCounter";
import { cn } from "@/lib/utils";
import { BarChart2, Home, InspectionPanel, Layers3, LayoutDashboard, LucidePersonStanding, MessageSquare, Settings, Share2, ShareIcon, Wallet } from "lucide-react";

import { Montserrat } from "next/font/google";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const montserrat = Montserrat({
    weight: "600",
    subsets: ["latin"]
});

const routes = [
    {
        label: "Accueil",
        icon: Home,
        href: "/dashboard",
        color: "text-red-400"
    },
    {
        label: "Statistiques",
        icon: BarChart2,
        href: "/statistiques",
        color: "text-green-400"
    },
    {
        label: "Organizations",
        icon: Layers3,
        href: "/organizations",
        color: "text-blue-500"
    },
    {
        label: "Paiements",
        icon: Wallet,
        href: "/paiements",
        color: "text-yellow-700"
    },
    {
        label: "Affiliations",
        icon: Share2,
        href: "/affiliations",
        color: "text-yellow-500"
    },
    {
        label: "Paramètres",
        icon: Settings,
        href: "/settings",
    },
];

interface SidebarProps {
    apiLimitCount: number;
    isPro: boolean;
}

const DashboardSidebar = ({
    apiLimitCount = 0,
    isPro = false,
}: SidebarProps) => {

    const pathname = usePathname();

    return (
        <div className="space-y-4 py-4 flex flex-col
         h-full
         bg-[#111827] text-white
         ">
            <div className="px-3 py-2 flex-1">
                <Link href="/dashboard" className="flex items-center pl-3 mb-14">
                <div className="relative w-8 h-8 mr-4">
                    <Image
                        fill
                        alt="Logo" src="/logo.svg" />
                </div>
                <h1 className=
                {cn("text-2xl font-bold", montserrat.className)}>
                    Track Fans
                </h1>
                
                <FreeCounter apiLimitCount={apiLimitCount} isPro={isPro}>
                    </FreeCounter> 
            
                </Link>

                <div className="space-y-1">
                    {routes.map((route) => (
                        <Link
                            href={route.href}
                            key={route.href}
                            className={cn("text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white-white hover:bg-white/10 rounded-lg transition",
                            pathname === route.href ? "text-white bg-white/10" : 
                            "text-zinc-400"
                        )}
                        >

                            <div className="flex items-center flex-1">
                               <route.icon className={cn("h-5 w-5 mr-3 ", route.color)} />
                            {route.label}
                            </div>

                        </Link>
                    ))}
                </div>

            </div>
        </div>
    );
}

export default DashboardSidebar;