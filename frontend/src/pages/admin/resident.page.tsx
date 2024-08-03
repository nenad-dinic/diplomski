import { useToast } from "@/components/ui/use-toast";
import { useLogout } from "@/hooks/logout.hook";
import { Resident } from "@/models/resident.model";
import { useParams } from "react-router";
import { Icon } from "@iconify/react";
import { ResidentService } from "@/services/resident.service";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import DataView, { DataViewRef } from "@/components/blocks/views/data.view";
import AdminDeletePopover from "@/components/blocks/popovers/admin/delete.popover";
import { useRef } from "react";

export default function AdminResidentPage() {

    const {apartmentId} = useParams();

    const toast = useToast();
    const logout = useLogout();

    const dataViewRef = useRef<DataViewRef>({ refresh: () => {} });

    async function getResidents(filter : string, page : number, limit : number) {

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
            return residents;
        }

        return undefined;

    }

    async function deleteResident(id : number) {

        const resident = await ResidentService.deleteResident(id);

        if(resident == undefined) {
            toast.toast({
                title: "Communication error",
                description: "Please try again later",
                variant: "destructive"
            });
        } else if ("status" in resident) {
            switch(resident.status) {
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
                title: "Resident deleted",
                description: "The resident has been deleted",
            });
            dataViewRef.current.refresh();
        }
        
    }

    function renderResidentRow(data : Resident) {

        return <TableRow>
            <TableCell className="min-w-[200px]">{data.user?.fullName ?? "Unknown"}</TableCell>
            <TableCell className="min-w-[150px]">{new Date(data.expires).toLocaleDateString()}</TableCell>
            <TableCell className="min-w-[50px]">{data.isOwner ? 'Yes' : 'No'}</TableCell>
            <TableCell className="w-full"></TableCell>
            <TableCell className="w-fit flex gap-1">
                <Button variant="default" size="icon"><Icon icon="ic:round-edit" fontSize="1.5em" /></Button>
                <AdminDeletePopover trigger={
                    <Button variant="destructive" size="icon"><Icon icon="mdi:delete" fontSize="1.5em"/></Button>
                }
                onDelete={() => deleteResident(data.id)}
                />
            </TableCell>
        </TableRow>

    }

    return <>
        <DataView<Resident>
            ref={dataViewRef}
            headers={["Resident", "Expires", "Owner", "", "Actions"]}
            rowRenderer={renderResidentRow}
            fetchCallback={getResidents}
        />
    </>

}