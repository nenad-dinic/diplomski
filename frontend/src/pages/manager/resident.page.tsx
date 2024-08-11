import ManagerResidentCard from "@/components/blocks/cards/manager/resident.card";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { useToast } from "@/components/ui/use-toast";
import { useLogout } from "@/hooks/logout.hook";
import { Resident } from "@/models/resident.model";
import { ResidentService } from "@/services/resident.service";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";

export default function ManagerResidentPage() {

    const {buildingId,apartmentId} = useParams();

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

    return <div className="p-8">
        <Breadcrumb className="mb-4">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <Link to="/manager/buildings">Buildings</Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator/>
                <BreadcrumbItem>
                    <p>{buildingId}</p>
                </BreadcrumbItem>
                <BreadcrumbSeparator/>
                <BreadcrumbItem>
                    <Link to={`/manager/building/${buildingId}/apartments`}>Apartments</Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator/>
                <BreadcrumbItem>
                    <p>{apartmentId}</p>
                </BreadcrumbItem>
                <BreadcrumbSeparator/>
                <BreadcrumbItem>
                    <Link to={`/manager/building/${buildingId}/apartment/${apartmentId}/residents`}>Residents</Link>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
        <div className="flex gap-4 flex-wrap">
            {residents.length > 0 && residents.map(r => (
                <ManagerResidentCard resident={r}/>
            ))}
            {residents.length == 0 && <p className="text-center w-full">No residents found</p>}
        </div>
    </div> 

}