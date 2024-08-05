import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { useLogout } from "@/hooks/logout.hook";
import { Apartment } from "@/models/apartment.model";
import { ApartmentService } from "@/services/apartment.service";
import { useNavigate, useParams } from "react-router";
import { Icon } from "@iconify/react";
import DataView, { DataViewRef } from "@/components/blocks/views/data.view";
import AdminDeletePopover from "@/components/blocks/popovers/admin/delete.popover";
import { useRef } from "react";

export default function AdminApartmentPage() {

    const {buildingId} = useParams();

    const toast = useToast();
    const logout = useLogout();
    const navigate = useNavigate();

    const dataViewRef = useRef<DataViewRef>({ refresh: () => {} });

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

    async function deleteApartment(id : number) {

        const apartment = await ApartmentService.deleteApartment(id);

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
                default:
                    toast.toast({
                        title: "Error",
                        description: "An error occurred, please try again later",
                        variant: "destructive"
                    });
            }
        } else {
            toast.toast({
                title: "Apartment deleted",
                description: "The apartment has been deleted"
            });
            dataViewRef.current.refresh();
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
                <Button variant="default" size="icon" onClick={() => navigate(`/admin/building/${buildingId}/apartment/${data.id}/residents`)}><Icon icon="ic:round-family-restroom" fontSize="1.5em"/></Button>
                <Button variant="default" size="icon" onClick={() => navigate(`/admin/building/${buildingId}/apartment/${data.id}/bills`)}><Icon icon="mdi:invoice-list" fontSize="1.5em"/></Button>
                <Button variant="default" size="icon" onClick={() => navigate(`/admin/building/${buildingId}/apartment/${data.id}/repairs`)}><Icon icon="mdi:tools" fontSize="1.5em"/></Button>
                <AdminDeletePopover trigger={
                    <Button variant="destructive" size="icon"><Icon icon="mdi:delete" fontSize="1.5em"/></Button>
                }
                onDelete={() => deleteApartment(data.id)}
                />
            </TableCell>
        </TableRow>

    }

    return <>
        <DataView<Apartment>
            ref={dataViewRef}
            headers={["Number", "Size", "Residents", "", "Actions"]}
            rowRenderer={renderApartmentRow}
            fetchCallback={getApartments}
        />
    </>

}