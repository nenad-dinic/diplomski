import AdminMeetingDialog from "@/components/blocks/dialogs/admin/meeting.dialog";
import AdminDeletePopover from "@/components/blocks/popovers/admin/delete.popover";
import DataView, { DataViewRef } from "@/components/blocks/views/data.view";
import { Button } from "@/components/ui/button";
import { TableRow, TableCell } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { useLogout } from "@/hooks/logout.hook";
import { Meeting } from "@/models/meeting.model";
import { MeetingService } from "@/services/meeting.service";
import { Icon } from "@iconify/react";
import { useRef } from "react";
import { useParams } from "react-router";

export default function AdminMeetingPage() {

    const {buildingId} = useParams();

    const toast = useToast();
    const logout = useLogout();

    const dataViewRef = useRef<DataViewRef>({ refresh: () => {} });

    async function getMeetings(filter: string, page: number, limit: number) {

        const id = parseInt(buildingId ?? "0");

        const meetings = await MeetingService.getMeetingsByBuilding(id, filter, page, limit);

        if (meetings == undefined) {
            toast.toast({
                title: "Communication error",
                description: "Please try again later",
                variant: "destructive"
            });
        } else if ("status" in meetings) {
            switch (meetings.status) {
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
            return meetings;
        }

        return undefined;

    }

    async function deleteMeeting(id : number) {

        const meeting = await MeetingService.deleteMeeting(id);

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
                default:
                    toast.toast({
                        title: "Error",
                        description: "An error occurred, please try again later",
                        variant: "destructive"
                    });
            }
        } else {
            toast.toast({
                title: "Meeting deleted",
                description: "The meeting has been deleted"
            });
            dataViewRef.current.refresh();
        }

    }

    function renderMeeting(data : Meeting) {
            
            return <TableRow>
                <TableCell className="min-w-[200px]">{new Date(data.dateTime).toLocaleString()}</TableCell>
                <TableCell className="min-w-[100px]">{data.length} min</TableCell>
                <TableCell className="min-w-[200px] max-w-[600px]">{data.description}</TableCell>
                <TableCell className="w-full"></TableCell>
                <TableCell className="w-fit flex gap-1">
                    <AdminMeetingDialog
                        trigger={<Button variant="default" size="icon"><Icon icon="ic:round-edit" fontSize="1.5em"/></Button>}
                        meeting={data}
                        onClose={() => dataViewRef.current.refresh()}
                    />
                    <AdminDeletePopover trigger={
                        <Button variant="destructive" size="icon"><Icon icon="mdi:delete" fontSize="1.5em"/></Button>
                    }
                    onDelete={() => deleteMeeting(data.id)}
                    />
                </TableCell>
            </TableRow>
    }

    return <>
        <DataView<Meeting>
            ref={dataViewRef}
            headers={["Date", "Length", "Description", "", "Actions"]}
            rowRenderer={renderMeeting}
            fetchCallback={getMeetings}
        />
    </>

}