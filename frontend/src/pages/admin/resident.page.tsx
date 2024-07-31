import { useToast } from "@/components/ui/use-toast";
import { useLogout } from "@/hooks/logout.hook";
import { Page } from "@/models/page";
import { Resident } from "@/models/resident.model";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Icon } from "@iconify/react";
import { ResidentService } from "@/services/resident.service";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import DataView from "@/components/blocks/views/data.view";

export default function AdminResidentPage() {

    const {apartmentId} = useParams();

    const [residents, setResidents] = useState<Page<Resident>>();

    const [filter, setFilter] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);

    const toast = useToast();
    const logout = useLogout();
    const navigate = useNavigate();

    async function getResidents() {

        const id = parseInt(apartmentId ?? "0");

        const residents = await ResidentService.getResidentsByApartment(id, filter, page, limit);

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
                default:
                    toast.toast({
                        title: "Error",
                        description: "An error occurred, please try again later",
                        variant: "destructive"
                    });
            }
        } else {
            setResidents(residents);
        }

    }

    function renderResidentRow(data : Resident) {

        return <TableRow>
            <TableCell className="min-w-[100px]">{data.user?.fullName ?? "Unknown"}</TableCell>
            <TableCell className="min-w-[100px]">{new Date(data.expires).toLocaleDateString()}</TableCell>
            <TableCell className="min-w-[50px]">{data.isOwner ? 'Yes' : 'No'}</TableCell>
            <TableCell className="w-full"></TableCell>
            <TableCell className="w-fit flex gap-1">
                <Button variant="default" size="icon"><Icon icon="ic:round-edit" fontSize="1.5em" /></Button>
                <Button variant="destructive" size="icon"><Icon icon="mdi:delete" fontSize="1.5em" /></Button>
            </TableCell>
        </TableRow>

    }

    useEffect(() => {
        getResidents();
    }, [filter, page, limit]);

    return residents && <>
        <DataView
            data={residents}
            headers={["Resident", "Expires", "Owner", "", "Actions"]}
            rowRenderer={renderResidentRow}
            onFilterChange={setFilter}
            onPageChange={setPage}
            onLimitChange={setLimit}
        />
    </>

}