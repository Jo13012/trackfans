import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { absoluteUrl } from "@/lib/utils";
import { auth, currentUser } from "@clerk/nextjs/server";

import { checkApiLimit, getApiLimit, increaseApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const settingsUrl = absoluteUrl("/settings");

export async function POST(req: Request) {
    try {
        
        const {userId} = auth();
        const body = await req.json();
        const messages = body;

        if(!userId){
            return new NextResponse("Unauthorized", {status: 401});
        }

        if(!messages){
            return new NextResponse("Messages are required", {status: 400});
        }

        const freeTrial = await checkApiLimit();
        const isPro = await checkSubscription();

        if(!freeTrial && !isPro){
            return new NextResponse("Free trial has expired", {status: 403})
        }

        if(!isPro){
            await increaseApiLimit();
        }

        return NextResponse.json((freeTrial).toString);

    } catch (error) {
        console.log("[OPENAI ERROR] " + error, {
            status : 500});
    }
}