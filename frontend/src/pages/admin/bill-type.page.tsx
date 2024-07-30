import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { useLogout } from "@/hooks/logout.hook";
import { BillType } from "@/models/bill-type.models";
import { Page } from "@/models/page";
import { BillTypeService } from "@/services/bill-type.service";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import DataView from "@/components/blocks/views/data.view";

export default function AdminBillTypePage() {

    const [billTypes, setBillTypes] = useState<Page<BillType>>();

    const [filter, setFilter] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);

    const toast = useToast();
    const logout = useLogout();

    async function getBillTypes() {

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
            setBillTypes(billTypes);
        }

    }

    function renderBillTypeRow(data : BillType) {

        return <TableRow>
            <TableCell className="min-w-[200px]">{data.name}</TableCell>
            <TableCell className="w-full"></TableCell>
            <TableCell className="w-fit flex gap-1">
                <Button variant="default" size="icon"><Icon icon="ic:round-edit" fontSize="1.25em"/></Button>
                <Button variant="destructive" size="icon"><Icon icon="mdi:delete" fontSize="1.25em"/></Button>
            </TableCell>
        </TableRow>

    }

    useEffect(() => {
        getBillTypes();
    }, [filter, page, limit]);

    return billTypes && <>
        <DataView
            data={billTypes}
            headers={["Name", "", "Actions"]}
            rowRenderer={renderBillTypeRow}
            onFilterChange={setFilter}
            onLimitChange={setLimit}
            onPageChange={setPage}
        />
    </>

}