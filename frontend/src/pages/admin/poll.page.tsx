import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { useLogout } from "@/hooks/logout.hook";
import { Poll } from "@/models/poll.model";
import { PollService } from "@/services/poll.service";
import { useNavigate, useParams } from "react-router";
import { Icon } from "@iconify/react";
import DataView, { DataViewRef } from "@/components/blocks/views/data.view";
import { Progress } from "@/components/ui/progress";
import DeletePopover from "@/components/blocks/popovers/delete.popover";
import { useRef } from "react";
import AdminPollDialog from "@/components/blocks/dialogs/admin/poll.dialog";

export default function AdminPollPage() {

    const {buildingId} = useParams();

    const toast = useToast();
    const logout = useLogout();
    const navigate = useNavigate();

    const dataViewRef = useRef<DataViewRef>({ refresh: () => {} });

    async function getPolls(filter : string, page : number, limit : number) {

        const id = parseInt(buildingId ?? "0");

        const polls = await PollService.getPollsByBuilding(id, filter, page, limit);

        if(polls == undefined) {
            toast.toast({
                title: "Communication error",
                description: "Please try again later",
                variant: "destructive"
            });
        } else if ("status" in polls) {
            switch(polls.status) {
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
            return polls;
        }

        return undefined;

    }

    async function deletePoll(id : number) {

        const poll = await PollService.deletePoll(id);

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
                title: "Poll deleted",
                description: "The poll has been deleted"
            });
            dataViewRef.current.refresh();
        }

    }

    function renderPollRow(data : Poll) {
        return <TableRow>
            <TableCell className="min-w-[200px]">{data.title}</TableCell>
            <TableCell className="min-w-[250px] max-w-[300px]">
                <div className="flex gap-2 items-center">
                    <Progress className={`${data.totalVotes > 0 ? 'bg-red-500' : ''} *:bg-green-500`} value={(data.totalYesVotes / data.totalVotes) * 100}></Progress>
                    <p className="w-[50px]">{data.totalYesVotes} : {data.totalNoVotes}</p>
                </div>
            </TableCell>
            <TableCell className="min-w-[100px]">{data.isActive ? "Yes" : "No"}</TableCell>
            <TableCell className="w-full"></TableCell>
            <TableCell className="w-fit flex gap-1">
                <AdminPollDialog
                    trigger={<Button variant="default" size="icon"><Icon icon="ic:round-edit" fontSize="1.5em"/></Button>}
                    poll={data}
                    onClose={() => dataViewRef.current.refresh()}
                />
                <Button variant="default" size="icon" onClick={() => navigate(`/admin/building/${buildingId}/poll/${data.id}/votes`)}><Icon icon="mdi:vote" fontSize="1.5em"/></Button>
                <DeletePopover 
                    trigger={<Button variant="destructive" size="icon"><Icon icon="mdi:delete" fontSize="1.5em"/></Button>}
                    onDelete={() => deletePoll(data.id)}
                />
            </TableCell>
        </TableRow>
    }

    return <>
        <DataView<Poll>
            ref={dataViewRef}
            headers={["Title", "Votes", "Active", "", "Actions"]}
            rowRenderer={renderPollRow}
            fetchCallback={getPolls}
        />
    </>

}