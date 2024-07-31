import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { useLogout } from "@/hooks/logout.hook";
import { Apartment } from "@/models/apartment.model";
import { ApartmentService } from "@/services/apartment.service";
import { useNavigate, useParams } from "react-router";
import { Icon } from "@iconify/react";
import DataView from "@/components/blocks/views/data.view";

export default function AdminApartmentPage() {

    const {buildingId} = useParams();

    const toast = useToast();
    const logout = useLogout();
    const navigate = useNavigate();

    async function getApartments(filter : string, page : number, limit : number) {

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
            return apartments;
        }

        return undefined;

    }

    function renderApartmentRow(data : Apartment) {

        return <TableRow>
            <TableCell className="min-w-[50px]">{data.number}</TableCell>
            <TableCell className="min-w-[75px]">{data.size} m<sup>2</sup> </TableCell>
            <TableCell className="min-w-[50px]">{data.numberOfResidents}</TableCell>
            <TableCell className="w-full"></TableCell>
            <TableCell className="w-fit flex gap-1">
                <Button variant="default" size="icon"><Icon icon="ic:round-edit" fontSize="1.5em"/></Button>
                <Button variant="default" size="icon" onClick={() => navigate(`/admin/building/${buildingId}/apartment/${data.id}/residents`)}><Icon icon="ic:round-family-restroom" fontSize="1.5em"/></Button>
                <Button variant="destructive" size="icon"><Icon icon="mdi:delete" fontSize="1.5em"/></Button>
            </TableCell>
        </TableRow>

    }

    return <>
        <DataView<Apartment>
            headers={["Number", "Size", "Residents", "", "Actions"]}
            rowRenderer={renderApartmentRow}
            fetchCallback={getApartments}
        />
    </>

}