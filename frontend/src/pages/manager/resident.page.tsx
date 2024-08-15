import ManagerResidentCard from "@/components/blocks/cards/manager/resident.card";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { useToast } from "@/components/ui/use-toast";
import { useLogout } from "@/hooks/logout.hook";
import { Apartment } from "@/models/apartment.model";
import { Building } from "@/models/building.model";
import { Resident } from "@/models/resident.model";
import { ApartmentService } from "@/services/apartment.service";
import { BuildingService } from "@/services/building.service";
import { ResidentService } from "@/services/resident.service";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";

export default function ManagerResidentPage() {

    const {buildingId,apartmentId} = useParams();

    const [residents, setResidents] = useState<Resident[]>([]);
    const [building, setBuilding] = useState<Building>();
    const [apartment, setApartment] = useState<Apartment>();

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

    async function getBuilding() {

        const id = parseInt(buildingId ?? "0");

        const building = await BuildingService.getBuildingById(id);

        if(building == undefined) {
            toast.toast({
                title: "Communication error",
                description: "Please try again later",
                variant: "destructive"
            });
        } else if ("status" in building) {
            switch(building.status) {
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
            setBuilding(building);
        }

    }

    async function getApartment() {

        const id = parseInt(apartmentId ?? "0");

        const apartment = await ApartmentService.getApartmentById(id);

        if(apartment == undefined) {
            toast.toast({
                title: "Communication error",
                description: "Please try again later",
                variant: "destructive"
            });
        } else if ("status" in apartment) {
            switch(apartment.status) {
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
            setApartment(apartment);
        }

    }

    useEffect(() => {
        getBuilding();
        getApartment();
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
                    <p>{building?.address ?? "?"}</p>
                </BreadcrumbItem>
                <BreadcrumbSeparator/>
                <BreadcrumbItem>
                    <Link to={`/manager/building/${buildingId}/apartments`}>Apartments</Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator/>
                <BreadcrumbItem>
                    <p>{apartment?.number ?? "?"}</p>
                </BreadcrumbItem>
                <BreadcrumbSeparator/>
                <BreadcrumbItem>
                    <Link to={`/manager/building/${buildingId}/apartment/${apartmentId}/residents`}>Residents</Link>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
        <div className="flex gap-4 flex-wrap">
            {residents.length > 0 && residents.map(r => (
                <ManagerResidentCard resident={r} onEdit={() => getResidents()}/>
            ))}
            {residents.length == 0 && <p className="text-center w-full">No residents found</p>}
        </div>
    </div> 

}