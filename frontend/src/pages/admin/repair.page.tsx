import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { useLogout } from "@/hooks/logout.hook";
import { Repair } from "@/models/repair.model";
import { RepairService } from "@/services/repair.service";
import { useParams } from "react-router";
import { Icon } from '@iconify/react';
import DataView from "@/components/blocks/views/data.view";

export default function AdminRepairPage() {

    const {apartmentId} = useParams();

    const toast = useToast();
    const logout = useLogout();

    async function getRepairs(filter : string, page : number, limit : number) {

        const id = parseInt(apartmentId ?? "0");

        const repairs = await RepairService.getRepairsByApartment(id, filter, page, limit);

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
                default:
                    toast.toast({
                        title: "Error",
                        description: "An error occurred, please try again later",
                        variant: "destructive"
                    });
            }
        } else {
            return repairs;
        }

        return undefined;

    }

    function renderRepairRow(data : Repair) {

        return <TableRow>
            <TableCell className="min-w-[200px]">{data.user?.fullName ?? "Unknown"}</TableCell>
            <TableCell className="min-w-[200px] max-w-[600px]">{data.description}</TableCell>
            <TableCell className="min-w-[50px]">{data.isRepaired ? "Yes" : "No"}</TableCell>
            <TableCell className="w-full"></TableCell>
            <TableCell className="w-fit flex gap-1">
                <Button variant="default" size="icon"><Icon icon="ic:round-edit" fontSize="1.5em"/></Button>
                <Button variant="destructive" size="icon"><Icon icon="mdi:delete" fontSize="1.5em"/></Button>
            </TableCell>
        </TableRow>

    }

    return <>
        <DataView<Repair>
            headers={["User", "Description", "Repaired", "", "Actions"]}
            rowRenderer={renderRepairRow}
            fetchCallback={getRepairs}
        />
    </>

}