import CreateCard from "@/components/blocks/cards/create.card";
import ResidentBillCard from "@/components/blocks/cards/resident/bill.card";
import ResidentBillDialog from "@/components/blocks/dialogs/resident/bill.dialog";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { useToast } from "@/components/ui/use-toast";
import { useLogout } from "@/hooks/logout.hook";
import { Apartment } from "@/models/apartment.model";
import { Bill } from "@/models/bill.model";
import { ApartmentService } from "@/services/apartment.service";
import { BillService } from "@/services/bill.service";
import { TokenManager } from "@/utils/token.manager";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";

export default function ResidentBillPage() {

    const {apartmentId} = useParams();

    const [apartment, setApartment] = useState<Apartment>();
    const [bills, setBills] = useState<Bill[]>([]);

    const user = TokenManager.getUserInfo();

    const toast = useToast();
    const logout = useLogout();
    const navigate = useNavigate();

    async function getBills() {

        const bills = await BillService.getBillsByApartment(parseInt(apartmentId ?? ""), "", 1, 1000);

        if(bills == undefined) {
            toast.toast({
                title: "Communication error",
                description: "Please try again later",
                variant: "destructive"
            });
        } else if ("status" in bills) {
            switch(bills.status) {
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
            setBills(bills.items);
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
        getBills();
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
                    <Link to={`/apartment/${apartmentId}/bills`}>Bills</Link>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
        <div className="flex gap-4 flex-wrap">
            {bills.length > 0 && bills.map(b => (
                <ResidentBillCard bill={b}/>
            ))}
            {!isOwner() && <ResidentBillDialog
                trigger={<CreateCard className="w-[250px] h-[205px]"/>}
                apartmentId={parseInt(apartmentId ?? "0")}
                bill={undefined}
                onClose={() => getBills()}
            />}
            {bills.length == 0 && isOwner() && <p className="text-center w-full">No bills found</p>}
        </div>
    </div>

}