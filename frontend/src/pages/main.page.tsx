import { useToast } from "@/components/ui/use-toast";
import { useLogout } from "@/hooks/logout.hook";
import { AuthenticationService } from "@/services/auth.service";
import { Role } from "@/types/role.enum";
import { TokenManager } from "@/utils/token.manager";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";

export default function MainPage() {

    const [loading, setLoading] = useState(true);

    const logout = useLogout();
    const navigate = useNavigate();
    const toast = useToast();
    const location = useLocation();

    async function getIdentity() {

        const identity = await AuthenticationService.identity();

        if(identity == undefined) {
            toast.toast({
                title: "Communication error",
                description: "Please try again later",
                variant: "destructive"
            });
        } if ("status" in identity) {
            switch(identity.status) {
                case 401:
                    logout();
                    break;
                case 403:
                    logout();
                    break;
                default:
                    toast.toast({
                        title: "Error",
                        description: "Please try again later",
                        variant: "destructive"
                    });
            }
        } else {
            TokenManager.setUserInfo(identity);
            switch(identity.role) {
                case Role.Admin:
                    if(location.pathname == "/"){
                        navigate("/admin");
                    }
                    break;
                case Role.Manager:
                    if(location.pathname == "/"){
                        navigate("/manager");
                    }
                    break;
                case Role.Resident:
                    break;
            }
        }

        setLoading(false);

    }

    useEffect(() => {
        getIdentity();
    }, []);

    return !loading && <>
        <Outlet></Outlet>
    </>

}