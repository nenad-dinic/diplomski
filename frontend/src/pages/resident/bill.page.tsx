import CreateCard from "@/components/blocks/cards/create.card";
import ResidentBillCard from "@/components/blocks/cards/resident/bill.card";
import ResidentBillDialog from "@/components/blocks/dialogs/resident/bill.dialog";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useLogout } from "@/hooks/logout.hook";
import { Apartment } from "@/models/apartment.model";
import { Bill } from "@/models/bill.model";
import { ApartmentService } from "@/services/apartment.service";
import { BillService } from "@/services/bill.service";
import { TokenManager } from "@/utils/token.manager";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

export default function ResidentBillPage() {

    const {apartmentId} = useParams();

    const [year, setYear] = useState<number>(new Date().getFullYear());
    const [month, setMonth] = useState<number>(0);

    const [apartment, setApartment] = useState<Apartment>();
    const [bills, setBills] = useState<Bill[]>([]);

    const user = TokenManager.getUserInfo();

    const toast = useToast();
    const logout = useLogout();
    const navigate = useNavigate();

    async function getBills() {

        const bills = await BillService.getBillsByApartment(parseInt(apartmentId ?? ""), `${year}-${month > 0 ? month : ""}`, 1, 1000);

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

    function submitForm(e : FormEvent) {
        e.preventDefault();
        getBills();
    }

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
        <form onSubmit={submitForm} className="w-fit my-4 flex gap-2 items-center">
            <Input type="number" value={year} onChange={e => setYear(parseInt(e.target.value))}></Input>
            <span>-</span>
            <Select value={month.toString()} onValueChange={v => setMonth(parseInt(v))}>
                <SelectTrigger>
                    <SelectValue></SelectValue>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="0">Any</SelectItem>
                    <SelectItem value="1">January</SelectItem>
                    <SelectItem value="2">February</SelectItem>
                    <SelectItem value="3">March</SelectItem>
                    <SelectItem value="4">April</SelectItem>
                    <SelectItem value="5">May</SelectItem>
                    <SelectItem value="6">June</SelectItem>
                    <SelectItem value="7">July</SelectItem>
                    <SelectItem value="8">August</SelectItem>
                    <SelectItem value="9">September</SelectItem>
                    <SelectItem value="10">October</SelectItem>
                    <SelectItem value="11">November</SelectItem>
                    <SelectItem value="12">December</SelectItem>
                </SelectContent>
            </Select>
            <Button><Icon icon="mdi:search" fontSize="1.5em" /></Button>
        </form>
        <div className="flex gap-4 flex-wrap">
            {bills.length > 0 && bills.map(b => (
                <ResidentBillCard bill={b}/>
            ))}
            {!isOwner() && <ResidentBillDialog
                trigger={<CreateCard className="w-[250px] h-[205px]"/>}
                apartmentId={parseInt(apartmentId ?? "0")}
                onClose={() => getBills()}
            />}
            {bills.length == 0 && isOwner() && <p className="text-center w-full">No bills found</p>}
        </div>
    </div>

}