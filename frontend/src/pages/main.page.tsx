import { useToast } from "@/components/ui/use-toast";
import { AuthenticationService } from "@/services/auth.service";
import { Role } from "@/types/role.enum";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function MainPage() {

    const navigate = useNavigate();
    const toast = useToast();

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
                    navigate("/login");
                    break;
                default:
                    toast.toast({
                        title: "Error",
                        description: "Please try again later",
                        variant: "destructive"
                    });
            }
        } else {
            switch(identity.role) {
                case Role.Admin:
                    navigate("/admin");
                    break;
                case Role.Manager:
                    navigate("/manager");
                    break;
                case Role.Resident:
                    navigate("/resident");
                    break;
            }
        }

    }

    useEffect(() => {
        getIdentity();
    }, []);

    return <></>

}