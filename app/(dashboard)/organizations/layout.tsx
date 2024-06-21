import OrganizationSidebar from "./_components/sidebar/sidebar";
import { OrgSidebar } from "./_components/sidebar/org-sidebar";
import Navbar from "./_components/sidebar/navbar";

const OrganizationLayout = async ({
    children
}: {
    children : React.ReactNode;
}) => {
    return (
        <main className="h-full">
            <OrganizationSidebar />
            <div className="pl-[60px] h-full">
               <div className="flex gap-x-3 h-full">
                    <OrgSidebar />
                    <div className="h-full flex-1">
                       <Navbar /> 
                        {children}
                    </div>
                </div> 
            </div>
        </main>
    );
}

export default OrganizationLayout;