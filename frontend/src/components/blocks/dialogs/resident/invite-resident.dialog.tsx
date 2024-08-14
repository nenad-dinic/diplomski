import InviteForm, { InviteFormData } from "@/components/blocks/forms/invite.form";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { useLogout } from "@/hooks/logout.hook";
import { InviteService } from "@/services/invite.service";
import { ReactNode, useEffect, useState } from "react";

interface ResidentInviteResidentDialogProps {

    trigger : ReactNode;
    apartmentId : number;
    onClose ?: () => void;

}

export default function ResidentInviteResidentDialog(props : ResidentInviteResidentDialogProps) {

    const [open, setOpen] = useState(false);

    const toast = useToast();
    const logout = useLogout();

    async function handleFormSubmit(data : InviteFormData) {

        const invite = await InviteService.inviteResident(data.email, props.apartmentId);

        if(invite == undefined) {
            toast.toast({
                title: "Communication error",
                description: "Please try again later",
                variant: "destructive"
            })
        } else if ("status" in invite) {
            switch(invite.status) {
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
                title: "Invitation sent",
                description: "The invitation has been sent"
            });
            setOpen(false);
        }

    }

    useEffect(() => {
        if(open == false) {
            props.onClose?.();
        }
    }, [open]);

    return <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            {props.trigger}
        </DialogTrigger>
        <DialogContent>
            <InviteForm onSubmit={handleFormSubmit} />
        </DialogContent>
    </Dialog>

}