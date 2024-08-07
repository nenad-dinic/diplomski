import AdminMeetingForm, { MeetingFormData } from "@/components/blocks/forms/admin/meeting.form";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { useLogout } from "@/hooks/logout.hook";
import { Meeting } from "@/models/meeting.model";
import { MeetingService } from "@/services/meeting.service";
import { ReactNode, useEffect, useState } from "react";

interface MeetingDialogProps {

    trigger : ReactNode;
    meeting ?: Meeting;
    onClose ?: () => void;

}

export default function AdminMeetingDialog(props : MeetingDialogProps) {

    const [open, setOpen] = useState(false);

    const toast = useToast();
    const logout = useLogout();

    async function createMeeting(buildingId : number, date : Date, length : number, description : string) {

        const meeting = await MeetingService.createMeeting(buildingId, date, length, description);

        if(meeting == undefined) {
            toast.toast({
                title: "Communication error",
                description: "Please try again later",
                variant: "destructive"
            });
        } else if ("status" in meeting) {
            switch(meeting.status) {
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
                title: "Meeting created",
                description: "The meeting has been created",
            });
            setOpen(false);
        }

    }

    async function updateMeeting(id : number, buildingId : number, date : Date, length : number, description : string) {

        const meeting = await MeetingService.updateMeeting(id, buildingId, date, length, description);

        if(meeting == undefined) {
            toast.toast({
                title: "Communication error",
                description: "Please try again later",
                variant: "destructive"
            });
        } else if ("status" in meeting) {
            switch(meeting.status) {
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
                title: "Meeting updated",
                description: "The meeting has been updated",
            });
            setOpen(false);
        }

    }

    function handleFormSubmit(data : MeetingFormData) {

        if(props.meeting) {
            updateMeeting(props.meeting.id, data.buildingId, data.date, data.length, data.description);
        } else {
            createMeeting(data.buildingId, data.date, data.length, data.description);
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
            <AdminMeetingForm meeting={props.meeting} onSubmit={handleFormSubmit} />
        </DialogContent>
    </Dialog>

}