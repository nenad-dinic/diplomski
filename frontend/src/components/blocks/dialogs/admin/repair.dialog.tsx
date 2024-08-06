import AdminRepairForm, { RepairFormData } from "@/components/blocks/forms/admin/repair.form";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { useLogout } from "@/hooks/logout.hook";
import { Repair } from "@/models/repair.model";
import { RepairService } from "@/services/repair.service";
import { ReactNode, useEffect, useState } from "react";

interface RepairDialogProps {
    trigger : ReactNode;
    repair ?: Repair;
    onClose ?: () => void;
}

export default function AdminRepairDialog(props : RepairDialogProps) {

    const [open, setOpen] = useState(false);

    const toast = useToast();
    const logout = useLogout();

    async function createRepair(userId : number, apartmentId : number, description : string) {

        const repair = await RepairService.createRepair(userId, apartmentId, description);

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
                default:
                    toast.toast({
                        title: "Error",
                        description: "An error occurred, please try again later",
                        variant: "destructive"
                    });
            }
        } else {
            toast.toast({
                title: "Repair created",
                description: "The repair has been created",
            });
            setOpen(false);
        }

    }

    async function updateRepair(id : number, userId : number, apartmentId : number, description : string, isRepaired : boolean) {

        const repair = await RepairService.updateRepair(id, userId, apartmentId, description, isRepaired);

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
                default:
                    toast.toast({
                        title: "Error",
                        description: "An error occurred, please try again later",
                        variant: "destructive"
                    });
            }
        } else {
            toast.toast({
                title: "Repair updated",
                description: "The repair has been updated",
            });
            setOpen(false);
        }

    }

    function handleFormSubmit(data : RepairFormData) {

        if(props.repair) {
            updateRepair(props.repair.id, data.userId, data.apartmentId, data.description, data.isRepaired);
        } else {
            createRepair(data.userId, data.apartmentId, data.description);
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
            <AdminRepairForm repair={props.repair} onSubmit={handleFormSubmit} />
        </DialogContent>
    </Dialog>

}