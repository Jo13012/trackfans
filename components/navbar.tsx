import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

import MobileSidebar from "./mobile-siderbar";
import { getApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const Navbar = async () => {

    const limit = await getApiLimit();
    const isPro = await checkSubscription();

    return (
        <div className="flex items-center p-4">
            <MobileSidebar apiLimitCount={limit} isPro={isPro}/>
            <div className="flex w-full justify-end">
                <UserButton afterSignOutUrl="/" />
            </div>
        </div>
    );
}

export default Navbar;