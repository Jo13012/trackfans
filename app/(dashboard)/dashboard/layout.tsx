import { getApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import DashboardSidebar from "./_components/sidebar";

const DashboardLayout = async ({
    children
}: {
    children : React.ReactNode;
}) => {

    const isPro = await checkSubscription();
    const limit = await getApiLimit();

    return (
        <div className="h-full relative">
            <div className="hidden h-full md:flex
             md:w-72 md:flex-col md:fixed 
             md-inset-y-0 z-[80] bg-gray-900">
                <DashboardSidebar apiLimitCount={limit} isPro={isPro} / >
            </div>

            <main className="md:pl-72">
                {children}
            </main>
        </div>
    );
}

export default DashboardLayout;