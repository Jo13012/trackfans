
import { BarChart2, Check, MessageSquare, Settings, Share2, Wallet, Zap } from "lucide-react";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogDescription, DialogTitle, DialogFooter } from "./ui/dialog"

import {useProModal} from "@/hooks/use-pro-modal";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

import axios from "axios";
import { useState } from "react";

const tools = [
    {
        label: "Statistiques",
        icon: BarChart2,
        color: "text-emerald-500",
        href: "/statistiques",
    },
    {
        label: "Conversations",
        icon: MessageSquare,
        color: "text-blue-500",
        href: "/conversations",
    },
    {
        label: "Paiements",
        icon: Wallet,
        color: "text-green-700",
        href: "/paiements",
    },
    {

        label: "Affiliations",
        icon: Share2,
        color: "text-yellow-500",
        href: "/affiliations",
    },
    {
        label: "Paramètres",
        icon: Settings,
        href: "/settings",
    },

    
]

export const ProModal = () => {

    const proModal = useProModal();
    const [loading, setLoading] = useState(false);

    const onSubscrible = async () => {
        try {
            setLoading(true);

            const response = await axios.get("/api/stripe")

            window.location.href = response.data.url;
        } catch (error) {
            console.log(error, "STRIPE_CLIENT_ERROR");
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
            <DialogContent>
                <DialogHeader>
            
                <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
                    <div className="flex items-center gap-x-2 font-bold py-1">
                        Upgrade to Premium
                        
                        <Badge variant="premium" className="uppercase text-sm py-1">
                        pro
                        </Badge> 

                    </div>
                
                </DialogTitle>

                <DialogDescription className="text-center 
                pt-2 space-y-2 text-zinc-900 font-medium">
                    
                    {tools.map((tool) => (
                        <Card
                        key={tool.label}
                        className="p-3 border-black/5 
                        flex items-center justify-between"
                        >

                        <div className="flex items-center gap-x-4">
                            <div className={cn("p-2 w-fit rounded-md")}>
                                <tool.icon className={cn("w-6 h-6", tool.color)} / >
                            </div>
                            <div className="font-semibold text-sm">
                                {tool.label}
                            </div>
                        </div>    

                        <Check className="text-primary w-5 h-5" />

                        </Card>
                    ))}

                    </DialogDescription> 

                </DialogHeader>

                <DialogFooter>
                    <Button onClick={onSubscrible} size="lg" variant="premium" className="w-full">
                        Upgrade

                        <Zap className="w-4 h-4 ml-2 fill-white"></Zap>
                    </Button>
                </DialogFooter>

            </DialogContent>
        </Dialog>
    )
}