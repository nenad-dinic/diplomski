import ManagerApartmentCard from "@/components/blocks/cards/manager/apartment.card";
import ManagerCreateApartment from "@/components/blocks/cards/manager/create-apartment.card";
import ManagerApartmentDialog from "@/components/blocks/dialogs/manager/apartment.dialog";
import { useToast } from "@/components/ui/use-toast";
import { useLogout } from "@/hooks/logout.hook";
import { Apartment } from "@/models/apartment.model";
import { ApartmentService } from "@/services/apartment.service";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function ManagerApartmentPage() {

    const {buildingId} = useParams();

    const [apartments, setApartments] = useState<Apartment[]>([]);

    const toast = useToast();
    const logout = useLogout();
    const navigate = useNavigate();

    async function getApartments() {

        const id = parseInt(buildingId ?? "");

        const apartments = await ApartmentService.getApartmentsByBuilding(id, "", 1, 1000);

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

    return <div className="flex gap-4 flex-wrap p-8">
        {apartments.map(a => (
            <ManagerApartmentCard apartment={a} onEdit={() => getApartments()} onDelete={() => getApartments()}/>
        ))}
        <ManagerApartmentDialog
            trigger={<ManagerCreateApartment/>}
            buildingId={parseInt(buildingId ?? "")}
            onClose={() => getApartments()}
        />
    </div>

}