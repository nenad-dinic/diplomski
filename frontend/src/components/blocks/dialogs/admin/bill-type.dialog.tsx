import AdminBillTypeForm, { BillTypeFormData } from "@/components/blocks/forms/admin/bill-type.form";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { useLogout } from "@/hooks/logout.hook";
import { BillType } from "@/models/bill-type.models";
import { BillTypeService } from "@/services/bill-type.service";
import { ReactNode, useEffect, useState } from "react";

interface BillTypeDialogProps {

    trigger : ReactNode;
    billType ?: BillType;
    onClose ?: () => void;

}

export default function AdminBillTypeDialog(props : BillTypeDialogProps) {

    const [open, setOpen] = useState(false);

    const toast = useToast();
    const logout = useLogout();

    async function createBillType(name : string) {

        const billType = await BillTypeService.createBillType(name);

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
                title: "Bill Type created",
                description: "The bill type has been created",
            });
            setOpen(false);
        }

    }

    async function updateBillType(id : number, name : string) {

        const billType = await BillTypeService.updateBillType(id, name);

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
                title: "Bill Type updated",
                description: "The bill type has been updated",
            });
            setOpen(false);
        }

    }

    function handleFormSubmit(data : BillTypeFormData) {

        if(props.billType) {
            updateBillType(props.billType.id, data.name);
        } else {
            createBillType(data.name);
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
            <AdminBillTypeForm billType={props.billType} onSubmit={handleFormSubmit} />
        </DialogContent>
    </Dialog>

}