import ResidentApartmentCard from "@/components/blocks/cards/resident/apartment.card";
import { Breadcrumb, BreadcrumbLink } from "@/components/ui/breadcrumb";
import { useToast } from "@/components/ui/use-toast";
import { useLogout } from "@/hooks/logout.hook";
import { Apartment } from "@/models/apartment.model";
import { ApartmentService } from "@/services/apartment.service";
import { TokenManager } from "@/utils/token.manager";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export default function ResidentApartmentPage() {

    const user = TokenManager.getUserInfo();

    const [apartments, setApartments] = useState<Apartment[]>([]);

    const toast = useToast();
    const logout = useLogout();
    const navigate = useNavigate();

    async function getApartments() {

        const apartments = await ApartmentService.getApartmentsByUser(user?.id ?? 0, "", 1, 1000);

        if(apartments == undefined) {
            toast.toast({
                title: "Communication error",
                description: "Please try again later",
                variant: "destructive"
            });
        } else if ("status" in apartments) {
            switch(apartments.status) {
                case 401:
                    logout();
                    break;
                case 403:
                    navigate("/");
                    break;
                default:
                    toast.toast({
                        title: "Error",
                        description: "An error occurred, please try again later",
                        variant: "destructive"
                    });
            }
        } else {
            setApartments(apartments.items);
        }

    }

    useEffect(() => {
        getApartments();
    }, []);

    return <div className="p-8">
        <Breadcrumb className="mb-4">
            <BreadcrumbLink>
                <Link to="/">Apartments</Link>
            </BreadcrumbLink>
        </Breadcrumb>
        <div className="flex gap-4 flex-wrap">
            {apartments.map(a => (
                <ResidentApartmentCard apartment={a}/>
            ))}
            {apartments.length == 0 && <div className="text-center w-full">No apartments found</div>}
        </div>
    </div>

}