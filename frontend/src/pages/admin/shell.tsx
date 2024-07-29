import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { Outlet, useNavigate } from "react-router";

export default function AdminPageShell() {

    const navigate = useNavigate();

    return <>
        <div className="flex flex-row">
            <aside className="w-fit h-[100dvh] flex flex-col border-r bg-background pt-2 pb-2">
                <Button className="justify-start" variant="ghost" onClick={() => navigate('/admin/dashboard')}><Icon className="mr-1" icon="ic:round-dashboard" fontSize="1.25em"/> Dashboard</Button>
                <Button className="justify-start" variant="ghost" onClick={() => navigate('/admin/buildings')}><Icon className="mr-1" icon="ic:round-apartment" fontSize="1.25em"/> Buildings</Button>
                <Button className="justify-start" variant="ghost" onClick={() => navigate('/admin/users')}><Icon className="mr-1" icon="mdi:users" fontSize="1.25em"/> Users</Button>
            </aside>
            <div className="flex-grow">
                <Outlet></Outlet>
            </div>
        </div>
    </>

}