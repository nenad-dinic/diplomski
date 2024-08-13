import AdminBillForm, { AdminBillFormData } from "@/components/blocks/forms/admin/bill.form";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { useLogout } from "@/hooks/logout.hook";
import { Bill } from "@/models/bill.model";
import { BillService } from "@/services/bill.service";
import { ReactNode, useEffect, useState } from "react";

interface AdminBillDialogProps {

    trigger : ReactNode;
    bill: Bill;
    onClose?: () => void;

}

export default function AdminBillDialog(props : AdminBillDialogProps) {

    const [open, setOpen] = useState(false);

    const toast = useToast();
    const logout = useLogout();

    async function createBill(billTypeId : number, apartmentId : number, month : number, year : number, file : File | null) {

        if(file == null) {
            return;
        }

        const bill = await BillService.createBill(billTypeId, apartmentId, month, year, file);

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
                title: "Bill created",
                description: "The bill has been created",
            });
            setOpen(false);
        }

    }

    async function updateBill(id : number, billTypeId : number, apartmentId : number, month : number, year : number, file : File | null) {

        const bill = await BillService.updateBill(id, billTypeId, apartmentId, month, year, file);

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
                title: "Bill updated",
                description: "The bill has been updated",
            });
            setOpen(false);
        }

    }

    async function handleFormSubmit(data : AdminBillFormData) {

        if(props.bill) {
            updateBill(props.bill.id, data.billTypeId, data.apartmentId, data.month, data.year, data.file);
        } else {
            createBill(data.billTypeId, data.apartmentId, data.month, data.year, data.file);
        }

    }

    useEffect(() => {
        if(open == false) {
            props.onClose?.();
        }
    }, [open]);

    return <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
            {props.trigger}
        </DialogTrigger>
        <DialogContent>
            <AdminBillForm bill={props.bill} onSubmit={handleFormSubmit} />
        </DialogContent>
    </Dialog>

}