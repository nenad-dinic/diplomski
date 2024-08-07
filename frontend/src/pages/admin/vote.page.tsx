import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { useLogout } from "@/hooks/logout.hook";
import { Vote } from "@/models/vote.model";
import { VoteService } from "@/services/vote.service";
import { useNavigate, useParams } from "react-router";
import { Icon } from "@iconify/react";
import DataView, { DataViewRef } from "@/components/blocks/views/data.view";
import { useRef } from "react";
import AdminDeletePopover from "@/components/blocks/popovers/admin/delete.popover";
import AdminVoteDialog from "@/components/blocks/dialogs/admin/vote.dialog";

export default function AdminVotePage() {

    const {pollId} = useParams();

    const toast = useToast();
    const logout = useLogout();
    const navigate = useNavigate();

    const dataViewRef = useRef<DataViewRef>({ refresh: () => {} });

    async function getVotes(filter : string, page : number, limit : number) {
        
        const id = parseInt(pollId ?? "0");

        const votes = await VoteService.getVotesByPoll(id, filter, page, limit);

        if(votes == undefined) {
            toast.toast({
                title: "Communication error",
                description: "Please try again later",
                variant: "destructive"
            });
        } else if ("status" in votes) {
            switch(votes.status) {
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
            return votes;
        }

        return undefined;

    }

    async function deleteVote(id : number) {
    
        const vote = await VoteService.deleteVote(id);

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
                title: "Vote deleted",
                description: "The vote has been deleted"
            });
            dataViewRef.current.refresh();
        }

    }

    function renderVoteRow(data : Vote) {

        return <TableRow>
            <TableCell className="min-w-[200px]">{data.user?.fullName ?? "Unknown"}</TableCell>
            <TableCell className="min-w-[100px]">{data.result ? "Yes" : "No"}</TableCell>
            <TableCell className="w-full"></TableCell>
            <TableCell className="w-fit flex gap-1">
                <AdminVoteDialog 
                    trigger={<Button variant="default" size="icon"><Icon icon="ic:round-edit" fontSize="1.5em"/></Button>}
                    vote={data}
                    onClose={() => dataViewRef.current.refresh()}
                />
                <AdminDeletePopover trigger={
                    <Button variant="destructive" size="icon"><Icon icon="mdi:delete" fontSize="1.5em"/></Button>
                }
                onDelete={() => deleteVote(data.id)}
                />
            </TableCell>
        </TableRow>

    }

    return <>
        <DataView<Vote>
            ref={dataViewRef}
            headers={["User", "Response", "", "Actions"]}
            rowRenderer={renderVoteRow}
            fetchCallback={getVotes}
        />
    </>

}