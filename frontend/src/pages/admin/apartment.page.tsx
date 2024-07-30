import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { useLogout } from "@/hooks/logout.hook";
import { Apartment } from "@/models/apartment.model";
import { Page } from "@/models/page";
import { ApartmentService } from "@/services/apartment.service";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Icon } from "@iconify/react";
import DataView from "@/components/blocks/views/data.view";

export default function AdminApartmentPage() {

    const {buildingId} = useParams();

    const [apartments, setApartments] = useState<Page<Apartment>>();

    const [filter, setFilter] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);

    const toast = useToast();
    const logout = useLogout();

    async function getApartments() {

        const id = parseInt(buildingId ?? "0");

        const apartments = await ApartmentService.getApartmentsByBuilding(id, filter, page, limit);

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
                default:
                    toast.toast({
                        title: "Error",
                        description: "An error occurred, please try again later",
                        variant: "destructive"
                    });
            }
        } else {
            setApartments(apartments);
        }

    }

    function renderApartmentRow(data : Apartment) {

        return <TableRow>
            <TableCell className="min-w-[50px]">{data.number}</TableCell>
            <TableCell className="min-w-[75px]">{data.size} m<sup>2</sup> </TableCell>
            <TableCell className="min-w-[50px]">{data.numberOfResidents}</TableCell>
            <TableCell className="w-full"></TableCell>
            <TableCell className="w-fit flex gap-1">
                <Button variant="default" size="icon"><Icon icon="ic:round-edit" fontSize="1.5em"/></Button>
                <Button variant="destructive" size="icon"><Icon icon="mdi:delete" fontSize="1.5em"/></Button>
            </TableCell>
        </TableRow>

    }

    useEffect(() => {
        getApartments();
    }, [filter, page, limit]);

    return apartments && <>
        <DataView
            data={apartments}
            headers={["Number", "Size", "Residents", "", "Actions"]}
            rowRenderer={renderApartmentRow}
            onFilterChange={setFilter}
            onPageChange={setPage}
            onLimitChange={setLimit}
        />
    </>

}