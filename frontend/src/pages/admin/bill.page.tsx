import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { useLogout } from "@/hooks/logout.hook";
import { Bill } from "@/models/bill.model";
import { BillService } from "@/services/bill.service";
import { useNavigate, useParams } from "react-router";
import { Icon } from '@iconify/react';
import DataView, { DataViewRef } from "@/components/blocks/views/data.view";
import { API_PUBLIC_URL } from "@/utils/environment";
import DeletePopover from "@/components/blocks/popovers/delete.popover";
import { useRef } from "react";
import AdminBillDialog from "@/components/blocks/dialogs/admin/bill.dialog";

export default function AdminBillPage() {

    const {apartmentId} = useParams();

    const toast = useToast();
    const logout = useLogout();
    const navigate = useNavigate();

    const dataViewRef = useRef<DataViewRef>({ refresh: () => {} });

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
            return bills;
        }

        return undefined;

    }

    async function deleteBill(id : number) {

        const bill = await BillService.deleteBill(id);

        if(bill == undefined) {
            toast.toast({
                title: "Communication error",
                description: "Please try again later",
                variant: "destructive"
            });
        } else if ("status" in bill) {
            switch(bill.status) {
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
                title: "Bill deleted",
                description: "The bill has been deleted",
            })
            dataViewRef.current.refresh();
        }

    }

    function downloadBill(bill : Bill) {

        const link = document.createElement("a");
        link.href = `${API_PUBLIC_URL}/${bill.filePath}`;
        link.download = bill.fileName;
        link.click();

    }

    function renderBillRow(data : Bill) {

        return <TableRow>
            <TableCell className="min-w-[150px]">{data.billType?.name ?? "Unknown"}</TableCell>
            <TableCell className="min-w-[75px]">{data.month}</TableCell>
            <TableCell className="min-w-[75px]">{data.year}</TableCell>
            <TableCell className="min-w-[300px]">{data.fileName}</TableCell>
            <TableCell className="w-full"></TableCell>
            <TableCell className="w-fit flex gap-1">
                <AdminBillDialog
                    trigger={<Button variant="default" size="icon"><Icon icon="ic:round-edit" fontSize="1.5em"/></Button>}
                    bill={data}
                    onClose={() => dataViewRef.current.refresh()}
                />
                <Button variant="default" size="icon" onClick={() => downloadBill(data)}><Icon icon="octicon:download-16" fontSize="1.5em"/></Button>
                <DeletePopover trigger={
                    <Button variant="destructive" size="icon"><Icon icon="mdi:delete" fontSize="1.5em"/></Button>
                }
                onDelete={() => deleteBill(data.id)}
                />
            </TableCell>
        </TableRow>

    }

    return <>
        <DataView<Bill>
            ref={dataViewRef}
            headers={["Type", "Month", "Year", "File Name", "", "Actions"]}
            rowRenderer={renderBillRow}
            fetchCallback={getBills}
        />
    </>

}