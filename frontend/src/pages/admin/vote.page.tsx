import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { useLogout } from "@/hooks/logout.hook";
import { Vote } from "@/models/vote.model";
import { VoteService } from "@/services/vote.service";
import { useParams } from "react-router";
import { Icon } from "@iconify/react";
import DataView, { DataViewRef } from "@/components/blocks/views/data.view";
import DeletePopover from "@/components/blocks/popovers/delete.popover";
import { useRef } from "react";

export default function AdminVotePage() {

    const {pollId} = useParams();

    const toast = useToast();
    const logout = useLogout();

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
                default:
                    toast.toast({
                        title: "Error",
                        description: "An error occurred, please try again later",
                        variant: "destructive"
                    });
            }
        } else {
            toast.toast({
                title: "Success",
                description: "Vote deleted"
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
                <Button variant="default" size="icon"><Icon icon="ic:round-edit" fontSize="1.5em"/></Button>
                <DeletePopover trigger={
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