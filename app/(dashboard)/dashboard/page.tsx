"use client";

import { Card } from "@/components/ui/card";

import { cn } from "@/lib/utils";

import { ArrowRight, BarChart2, Home, Layers3, Settings, Share2, Wallet } from "lucide-react";

import { useRouter } from "next/navigation";

const tools = [
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

import AnalyticsDashboard from "@/components/AnalayticsDashboard";
import { getApiLimit } from "@/lib/api-limit";

const DashboardPage = () => {

    /*<div className='min-h-screen w-full py-12 flex justify-center items-center bg-black'>
        <div className='relative w-full max-w-6xl mx-auto text-white'>
            <AnalyticsDashboard
                subscriptions={220}
                tips={"$318,57"}
                messages={2150}
                referrals={11}
            />
        </div>
    </div>*/
    
    const router = useRouter();

    return (
        <div className="p-12px pt-12">
            <div className="mb-8 space-y-4">
                <h2 className="text-2xl md:text-4xl font-bold text-center">
                    Explore the power of AI
                </h2>
                <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
                    Manage your models in one click.
                </p>
            </div>

            <div className="px-4 md:px-20 lg:px-32 grid grid-cols-1 md:grid-cols-3 gap-4">
                {tools.map((tool) => (
                    <Card
                        onClick={() => {
                            router.push(tool.href)
                        }}
                        key={tool.href}
                        className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
                    >
                        <div className="flex items-center gap-x-4">
                            <div className={cn("p-2 w-fit rounded-md")}>
                                <tool.icon className={cn("w-8 h-8", tool.color)}></tool.icon>
                            </div>
                            <div className="font-semibold">
                                {tool.label}
                            </div>
                        </div>
                        <ArrowRight className="w-5 h-5"></ArrowRight>

                    </Card>
                ))}
            </div>
        </div>
    )
}

export default DashboardPage;
