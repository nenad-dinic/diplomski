import { Button } from "@/components/ui/button";
import { useLogout } from "@/hooks/logout.hook";
import { Outlet, useNavigate } from "react-router";
import { Icon } from "@iconify/react";

export default function ManagerPageShell() {

    const navigate = useNavigate();
    const logout = useLogout();

    return <div>
        <nav className="w-full flex border-b bg-background p-2">
            <Button className="justify-start" variant="ghost" onClick={() => navigate('/manager')}><Icon className="mr-1" icon="mdi:home" fontSize="1.5em" /> Home</Button>
            <Button className="ml-auto hover:text-destructive text-destructive" variant="outline" onClick={() => logout()}><Icon className="mr-1" icon="material-symbols:logout" fontSize="1.5em" /> Logout</Button>
        </nav>
        <Outlet></Outlet>
    </div>

}