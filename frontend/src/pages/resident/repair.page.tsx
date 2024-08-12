import CreateCard from "@/components/blocks/cards/create.card";
import ResidentRepairCard from "@/components/blocks/cards/resident/repair.card";
import ResidentRepairDialog from "@/components/blocks/dialogs/resident/repair.dialog";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { useToast } from "@/components/ui/use-toast";
import { useLogout } from "@/hooks/logout.hook";
import { Apartment } from "@/models/apartment.model";
import { Repair } from "@/models/repair.model";
import { ApartmentService } from "@/services/apartment.service";
import { RepairService } from "@/services/repair.service";
import { TokenManager } from "@/utils/token.manager";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";

export default function ResidentRepairPage() {

    const {apartmentId} = useParams();

    const user = TokenManager.getUserInfo();

    const [repairs, setRepairs] = useState<Repair[]>([]);
    const [apartment, setApartment] = useState<Apartment>();

    const toast = useToast();
    const logout = useLogout();
    const navigate = useNavigate();

    async function getRepairs() {

        const repairs = await RepairService.getRepairsByApartment(parseInt(apartmentId ?? "0"), "", 1, 1000);

        if(repairs == undefined) {
            toast.toast({
                title: "Communication error",
                description: "Please try again later",
                variant: "destructive"
            });
        } else if ("status" in repairs) {
            switch(repairs.status) {
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
            setRepairs(repairs.items);
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

    function isOwner() {
        return apartment?.residents?.some(r => r.userId == user?.id && r.isOwner) ?? false;
    }

    useEffect(() => {

        getApartment();
        getRepairs();

    }, []);

    return <div className="p-8">
        <Breadcrumb className="mb-4">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <Link to="/">Apartments</Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator/>
                <BreadcrumbItem>
                    <p>{apartment?.number ?? "?"}</p>
                </BreadcrumbItem>
                <BreadcrumbSeparator/>
                <BreadcrumbItem>
                    <Link to={`/apartment/${apartmentId}/repairs`}>Repairs</Link>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
        <div className="flex gap-4 flex-wrap">
            {repairs.length > 0 && repairs.map(r => (
                <ResidentRepairCard isOwner={isOwner()} repair={r} onRepair={() => getRepairs()}/>
            ))}
            {!isOwner() && <ResidentRepairDialog
                trigger={<CreateCard className="w-[250px] h-[205px]"/>}
                apartmentId={parseInt(apartmentId ?? "0")}
                userId={user?.id ?? 0}
                onClose={() => getRepairs()}
            />}
            {repairs.length == 0 && isOwner() && <p className="text-center w-full">No repairs found</p>}
        </div>
    </div>

}