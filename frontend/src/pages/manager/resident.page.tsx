import ManagerResidentCard from "@/components/blocks/cards/manager/resident.card";
import { useToast } from "@/components/ui/use-toast";
import { useLogout } from "@/hooks/logout.hook";
import { Resident } from "@/models/resident.model";
import { ResidentService } from "@/services/resident.service";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function ManagerResidentPage() {

    const {apartmentId} = useParams();

    const [residents, setResidents] = useState<Resident[]>([]);

    const toast = useToast();
    const logout = useLogout();
    const navigate = useNavigate();

    async function getResidents() {

        const id = parseInt(apartmentId ?? "0");

        const residents = await ResidentService.getResidentsByApartment(id, "", 1, 1000);

        if(residents == undefined) {
            toast.toast({
                title: "Communication error",
                description: "Please try again later",
                variant: "destructive"
            });
        } else if ("status" in residents) {
            switch(residents.status) {
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
            setResidents(residents.items);
        }

    }

    useEffect(() => {
        getResidents();
    }, []);

    return <div className="flex gap-4 flex-wrap p-8">
        {residents.length > 0 && residents.map(r => (
            <ManagerResidentCard resident={r}/>
        ))}
        {residents.length == 0 && <div className="text-center w-full">No residents found</div>}
    </div>

}