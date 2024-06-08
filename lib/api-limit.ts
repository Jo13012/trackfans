import { auth } from "@clerk/nextjs/server";

import prismadb from "./prismadb";

import { MAX_FREE_COUNTS } from "@/constants";

export const increaseApiLimit = async () => {
    const {userId} = auth();

    if(!userId){
        return;
    }

    const userApiLimit = await prismadb.user.findUnique({
        where: {
            userId
        }
    });

    if(userApiLimit){
        await prismadb.user.update({
            where: {userId : userId},
            data: {limitFreeTrial : userApiLimit.limitFreeTrial + 1}
        });
    } else {
        await prismadb.user.create({
            data: {userId : userId, limitFreeTrial : 1}
        });
    }
}

export const decreaseApiLimit = async () => {
    const {userId} = auth();

    if(!userId){
        return;
    }

    const userApiLimit = await prismadb.user.findUnique({
        where: {
            userId
        }
    });

    if(userApiLimit){
        await prismadb.user.update({
            where: {userId : userId},
            data: {limitFreeTrial : userApiLimit.limitFreeTrial - 1}
        });
    } else {
        await prismadb.user.create({
            data: {userId : userId, limitFreeTrial : 1}
        });
    }
}

export const getApiLimit = async () => {
    const {userId} = auth();

    if(!userId){
        return 0;
    }

    const userApiLimit = await prismadb.user.findUnique({
        where: {
            userId : userId
        }
    });

    if(!userApiLimit){
        await prismadb.user.create({
            data: {userId : userId, limitFreeTrial : MAX_FREE_COUNTS}
        });
        return MAX_FREE_COUNTS;
    }else {
        return userApiLimit.limitFreeTrial;
    }
}

export const checkApiLimit = async () => {
    const {userId} = auth();

    if(!userId){
        return false;
    }

    const userApiLimit = await prismadb.user.findUnique({
        where: {
            userId : userId
        }
    });

    if(!userApiLimit){
        return true;
    } else if(userApiLimit.limitFreeTrial < MAX_FREE_COUNTS){
        return true;
    }else {
        return false;
    }
}