import AdminVoteForm, { VoteFormData } from "@/components/blocks/forms/admin/vote.form";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { useLogout } from "@/hooks/logout.hook";
import { Vote } from "@/models/vote.model";
import { VoteService } from "@/services/vote.service";
import { ReactNode, useEffect, useState } from "react";

interface VoteDialogProps {
    trigger : ReactNode;
    vote ?: Vote;
    onClose ?: () => void;
}

export default function AdminVoteDialog(props : VoteDialogProps) {

    const [open, setOpen] = useState(false);

    const toast = useToast();
    const logout = useLogout();

    async function createVote(pollId : number, userId : number, result : boolean) {

        const vote = await VoteService.createVote(pollId, userId, result);

        if(vote == undefined) {
            toast.toast({
                title: "Communication error",
                description: "Please try again later",
                variant: "destructive"
            });
        } else if ("status" in vote) {
            switch(vote.status) {
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
                title: "Vote created",
                description: "The vote has been created",
            });
            setOpen(false);
        }

    }

    async function updateVote(id : number, pollId : number, userId : number, result : boolean) {

        const vote = await VoteService.updateVote(id, pollId, userId, result);

        if(vote == undefined) {
            toast.toast({
                title: "Communication error",
                description: "Please try again later",
                variant: "destructive"
            });
        } else if ("status" in vote) {
            switch(vote.status) {
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
                title: "Vote updated",
                description: "The vote has been updated",
            });
            setOpen(false);
        }

    }

    function handleFormSubmit(data : VoteFormData) {

        if(props.vote) {
            updateVote(props.vote.id, data.pollId, data.userId, data.result);
        } else {
            createVote(data.pollId, data.userId, data.result);
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
            <AdminVoteForm vote={props.vote} onSubmit={handleFormSubmit} />
        </DialogContent>
    </Dialog>

}