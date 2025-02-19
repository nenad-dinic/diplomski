import { Button } from "@/components/ui/button";
import { useLogout } from "@/hooks/logout.hook";
import { Outlet, useNavigate } from "react-router";
import { Icon } from "@iconify/react";

export default function ResidentPageShell() {

    const navigate = useNavigate();
    const logout = useLogout();

    return <div>
        <nav className="w-full flex border-b bg-background p-2">
            <Button className="justify-start" variant="ghost" onClick={() => navigate('/')}><Icon className="mr-1" icon="mdi:home" fontSize="1.5em" /> Home</Button>
            <Button className="justify-start" variant="ghost" onClick={() => navigate('/polls')}><Icon className="mr-1" icon="mdi:poll" fontSize="1.5em" /> Polls</Button>
            <Button className="justify-start" variant="ghost" onClick={() => navigate('/meetings')}><Icon className="mr-1" icon="mdi:talk" fontSize="1.5em" /> Meetings</Button>
            <Button className="ml-auto hover:text-destructive text-destructive" variant="outline" onClick={() => logout()}><Icon className="mr-1" icon="material-symbols:logout" fontSize="1.5em" /> Logout</Button>
        </nav>
        <Outlet></Outlet>
    </div>

}