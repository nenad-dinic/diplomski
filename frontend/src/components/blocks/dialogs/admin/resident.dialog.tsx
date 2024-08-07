import AdminResidentForm, { ResidentFormData } from "@/components/blocks/forms/admin/resident.form";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { useLogout } from "@/hooks/logout.hook";
import { Resident } from "@/models/resident.model";
import { ResidentService } from "@/services/resident.service";
import { ReactNode, useEffect, useState } from "react";

interface ResidentDialogProps {

    trigger : ReactNode;
    resident ?: Resident;
    onClose ?: () => void;

}

export default function AdminResidentDialog(props : ResidentDialogProps) {

    const [open, setOpen] = useState(false);

    const toast = useToast();
    const logout = useLogout();

    async function createResident(userId : number, apartmentId : number, expires : Date, isOwner : boolean) {
        
        const resident = await ResidentService.createResident(userId, apartmentId, expires, isOwner);

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
                title: "Resident created",
                description: "The resident has been created",
            });
            setOpen(false);
        }

    }

    async function updateResident(id: number, userId: number, apartmentId: number, expires: Date, isOwner: boolean) {

        const resident = await ResidentService.updateResident(id, userId, apartmentId, expires, isOwner);

        if (resident == undefined) {
            toast.toast({
                title: "Communication error",
                description: "Please try again later",
                variant: "destructive"
            });
        } else if ("status" in resident) {
            switch (resident.status) {
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
                title: "Resident updated",
                description: "The resident has been updated",
            });
            setOpen(false);
        }

    }

    function handleFormSubmit(data : ResidentFormData) {

        if(props.resident) {
            updateResident(props.resident.id, data.userId, data.apartmentId, data.expires, data.isOwner);
        } else {
            createResident(data.userId, data.apartmentId, data.expires, data.isOwner);
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
            <AdminResidentForm resident={props.resident} onSubmit={handleFormSubmit} />
        </DialogContent>
    </Dialog>

}