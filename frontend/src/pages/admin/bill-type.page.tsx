import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { useLogout } from "@/hooks/logout.hook";
import { BillType } from "@/models/bill-type.models";
import { BillTypeService } from "@/services/bill-type.service";
import { Icon } from "@iconify/react";
import DataView from "@/components/blocks/views/data.view";
import DeletePopover from "@/components/blocks/popovers/delete.popover";

export default function AdminBillTypePage() {

    const toast = useToast();
    const logout = useLogout();

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

    function renderBillTypeRow(data : BillType) {

        return <TableRow>
            <TableCell className="min-w-[200px]">{data.name}</TableCell>
            <TableCell className="w-full"></TableCell>
            <TableCell className="w-fit flex gap-1">
                <Button variant="default" size="icon"><Icon icon="ic:round-edit" fontSize="1.5em"/></Button>
                <DeletePopover trigger={
                    <Button variant="destructive" size="icon"><Icon icon="mdi:delete" fontSize="1.5em"/></Button>
                }/>
            </TableCell>
        </TableRow>

    }

    return <>
        <DataView<BillType>
            headers={["Name", "", "Actions"]}
            rowRenderer={renderBillTypeRow}
            fetchCallback={getBillTypes}
        />
    </>

}