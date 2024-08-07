import { Button } from "@/components/ui/button";
import { useLogout } from "@/hooks/logout.hook";
import { Icon } from "@iconify/react";
import { Outlet, useNavigate } from "react-router";

export default function AdminPageShell() {

    const navigate = useNavigate();
    const logout = useLogout();

    return <div className="flex flex-row">
        <aside className="w-fit h-[100dvh] flex flex-col border-r bg-background p-2">
            <Button className="justify-start" variant="ghost" onClick={() => navigate('/admin/dashboard')}><Icon className="mr-1" icon="ic:round-dashboard" fontSize="1.5em" /> Dashboard</Button>
            <Button className="justify-start" variant="ghost" onClick={() => navigate('/admin/buildings')}><Icon className="mr-1" icon="ic:round-apartment" fontSize="1.5em" /> Buildings</Button>
            <Button className="justify-start" variant="ghost" onClick={() => navigate('/admin/bill-types')}><Icon className="mr-1" icon="mdi:invoice-text-check" fontSize="1.5em" /> Bill Types</Button>
            <Button className="justify-start" variant="ghost" onClick={() => navigate('/admin/users')}><Icon className="mr-1" icon="mdi:users" fontSize="1.5em" /> Users</Button>
            <Button className="mt-auto hover:text-destructive text-destructive" variant="outline" onClick={() => logout()}><Icon className="mr-1" icon="material-symbols:logout" fontSize="1.5em" /> Logout</Button>
        </aside>
        <div className="w-full overflow-x-hidden">
            <Outlet></Outlet>
        </div>
    </div>

}