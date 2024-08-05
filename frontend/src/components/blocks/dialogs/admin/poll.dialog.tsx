import AdminPollForm, { PollFormData } from "@/components/blocks/forms/admin/poll.form";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { useLogout } from "@/hooks/logout.hook";
import { Poll } from "@/models/poll.model";
import { PollService } from "@/services/poll.service";
import { ReactNode, useEffect, useState } from "react";

interface PollDialogProps {
    trigger : ReactNode;
    poll ?: Poll;
    onClose ?: () => void;
}

export default function AdminPollDialog(props : PollDialogProps) {

    const [open, setOpen] = useState(false);

    const toast = useToast();
    const logout = useLogout();

    async function createPoll(buildingId : number, title : string) {

        const poll = await PollService.createPoll(buildingId, title);

        if(poll == undefined) {
            toast.toast({
                title: "Communication error",
                description: "Please try again later",
                variant: "destructive"
            });
        } else if ("status" in poll) {
            switch(poll.status) {
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
                title: "Poll created",
                description: "The poll has been created",
            });
            setOpen(false);
        }

    }

    async function updatePoll(id : number, buildingId : number, title : string, isActive : boolean) {

        const poll = await PollService.updatePoll(id, buildingId, title, isActive);

        if(poll == undefined) {
            toast.toast({
                title: "Communication error",
                description: "Please try again later",
                variant: "destructive"
            });
        } else if ("status" in poll) {
            switch(poll.status) {
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
                title: "Poll updated",
                description: "The poll has been updated",
            });
            setOpen(false);
        }

    }

    function handleFormSubmit(data : PollFormData) {

        if(props.poll) {
            updatePoll(props.poll.id, props.poll.buildingId, data.title, data.isActive);
        } else {
            createPoll(data.buildingId, data.title);
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
            <AdminPollForm poll={props.poll} onSubmit={handleFormSubmit} />
        </DialogContent>
    </Dialog>

}