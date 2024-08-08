import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { useLogout } from "@/hooks/logout.hook";
import { Repair } from "@/models/repair.model";
import { RepairService } from "@/services/repair.service";
import { useNavigate, useParams } from "react-router";
import { Icon } from '@iconify/react';
import DataView, { DataViewRef } from "@/components/blocks/views/data.view";
import DeletePopover from "@/components/blocks/popovers/delete.popover";
import { useRef } from "react";
import AdminRepairDialog from "@/components/blocks/dialogs/admin/repair.dialog";

export default function AdminRepairPage() {

    const {apartmentId} = useParams();

    const toast = useToast();
    const logout = useLogout();
    const navigate = useNavigate();

    const dataViewRef = useRef<DataViewRef>({ refresh: () => {} });

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
            return repairs;
        }

        return undefined;

    }

    async function deleteRepair(id : number) {

        const repair = await RepairService.deleteRepair(id);

        if(repair == undefined) {
            toast.toast({
                title: "Communication error",
                description: "Please try again later",
                variant: "destructive"
            });
        } else if ("status" in repair) {
            switch(repair.status) {
                case 401:
                    logout();
                    break;
                case 403:
                    toast.toast({
                        title: "Permission denied",
                        description: "You are not allowed to perform this action",
                        variant: "destructive"
                    });
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
                title: "Repair deleted",
                description: "The repair has been deleted"
            })
            dataViewRef.current.refresh();
        }

    }

    function renderRepairRow(data : Repair) {

        return <TableRow>
            <TableCell className="min-w-[200px]">{data.user?.fullName ?? "Unknown"}</TableCell>
            <TableCell className="min-w-[200px] max-w-[600px]">{data.description}</TableCell>
            <TableCell className="min-w-[50px]">{data.isRepaired ? "Yes" : "No"}</TableCell>
            <TableCell className="w-full"></TableCell>
            <TableCell className="w-fit flex gap-1">
                <AdminRepairDialog
                    trigger={<Button variant="default" size="icon"><Icon icon="ic:round-edit" fontSize="1.5em"/></Button>}
                    repair={data}
                    onClose={() => dataViewRef.current.refresh()}
                />
                <DeletePopover trigger={
                    <Button variant="destructive" size="icon"><Icon icon="mdi:delete" fontSize="1.5em"/></Button>
                }
                onDelete={() => deleteRepair(data.id)}
                />
            </TableCell>
        </TableRow>

    }

    return <>
        <DataView<Repair>
            ref={dataViewRef}
            headers={["User", "Description", "Repaired", "", "Actions"]}
            rowRenderer={renderRepairRow}
            fetchCallback={getRepairs}
        />
    </>

}