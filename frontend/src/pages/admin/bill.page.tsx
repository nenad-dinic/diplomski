import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { useLogout } from "@/hooks/logout.hook";
import { Bill } from "@/models/bill.model";
import { BillService } from "@/services/bill.service";
import { useParams } from "react-router";
import { Icon } from '@iconify/react';
import DataView from "@/components/blocks/views/data.view";
import { API_URL } from "@/utils/environment";

export default function AdminBillPage() {

    const {apartmentId} = useParams();

    const toast = useToast();
    const logout = useLogout();

    async function getBills(filter : string, page : number, limit : number) {

        const id = parseInt(apartmentId ?? "0");

        const bills = await BillService.getBillsByApartment(id, filter, page, limit);

        if(bills == undefined) {
            toast.toast({
                title: "Communication error",
                description: "Please try again later",
                variant: "destructive"
            });
        } else if ("status" in bills) {
            switch(bills.status) {
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
            return bills;
        }

        return undefined;

    }

    function downloadBill(bill : Bill) {

        const link = document.createElement("a");
        link.href = `${API_URL}/public/${bill.filePath}`;
        link.download = bill.fileName;
        link.click();

    }

    function renderBillRow(data : Bill) {

        return <TableRow>
            <TableCell className="min-w-[150px]">{data.billType?.name ?? "Unknown"}</TableCell>
            <TableCell className="min-w-[75px]">{data.month}</TableCell>
            <TableCell className="min-w-[300px]">{data.fileName}</TableCell>
            <TableCell className="w-full"></TableCell>
            <TableCell className="w-fit flex gap-1">
                <Button variant="default" size="icon"><Icon icon="ic:round-edit" fontSize="1.5em"/></Button>
                <Button variant="default" size="icon" onClick={() => downloadBill(data)}><Icon icon="octicon:download-16" fontSize="1.5em"/></Button>
                <Button variant="destructive" size="icon"><Icon icon="mdi:delete" fontSize="1.5em"/></Button>
            </TableCell>
        </TableRow>

    }

    return <>
        <DataView<Bill>
            headers={["Type", "Month", "File Name", "", "Actions"]}
            rowRenderer={renderBillRow}
            fetchCallback={getBills}
        />
    </>

}