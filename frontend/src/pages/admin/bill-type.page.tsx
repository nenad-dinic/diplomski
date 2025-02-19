import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { useLogout } from "@/hooks/logout.hook";
import { BillType } from "@/models/bill-type.models";
import { BillTypeService } from "@/services/bill-type.service";
import { Icon } from "@iconify/react";
import DataView, { DataViewRef } from "@/components/blocks/views/data.view";
import DeletePopover from "@/components/blocks/popovers/delete.popover";
import { useRef } from "react";
import AdminBillTypeDialog from "@/components/blocks/dialogs/admin/bill-type.dialog";
import { useNavigate } from "react-router";

export default function AdminBillTypePage() {

    const toast = useToast();
    const logout = useLogout();
    const navigate = useNavigate();

    const dataViewRef = useRef<DataViewRef>({ refresh: () => {} });

    async function getBillTypes(filter : string, page : number, limit : number) {

        const billTypes = await BillTypeService.getAllBillTypes(filter, page, limit);

        if(billTypes == undefined) {
            toast.toast({
                title: "Communication error",
                description: "Please try again later",
                variant: "destructive"
            });
        } else if ("status" in billTypes) {
            switch(billTypes.status) {
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
            return billTypes;
        }

        return undefined;

    }

    async function deleteBillType(id : number) {

        const billType = await BillTypeService.deleteBillType(id);

        if(billType == undefined) {
            toast.toast({
                title: "Communication error",
                description: "Please try again later",
                variant: "destructive"
            });
        } else if ("status" in billType) {
            switch(billType.status) {
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
                title: "Bill type deleted",
                description: "The bill type has been deleted",
            });
            dataViewRef.current.refresh();
        }

    }

    function renderBillTypeRow(data : BillType) {

        return <TableRow>
            <TableCell className="min-w-[200px]">{data.name}</TableCell>
            <TableCell className="w-full"></TableCell>
            <TableCell className="w-fit flex gap-1">
                <AdminBillTypeDialog
                    trigger={<Button variant="default" size="icon"><Icon icon="ic:round-edit" fontSize="1.5em"/></Button>}
                    billType={data}
                    onClose={() => dataViewRef.current.refresh()}
                />
                <DeletePopover trigger={
                    <Button variant="destructive" size="icon"><Icon icon="mdi:delete" fontSize="1.5em"/></Button>
                }
                onDelete={() => deleteBillType(data.id)}
                />
            </TableCell>
        </TableRow>

    }

    return <>
        <DataView<BillType>
            ref={dataViewRef}
            headers={["Name", "", "Actions"]}
            rowRenderer={renderBillTypeRow}
            fetchCallback={getBillTypes}
            actionRow={
                <AdminBillTypeDialog
                    trigger={<Button variant="default"><Icon icon="ion:add" fontSize="1.5em"/> Add Bill Type</Button>}
                    onClose={() => dataViewRef.current.refresh()}
                />
            }
        />
    </>

}