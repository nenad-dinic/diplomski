import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { useLogout } from "@/hooks/logout.hook";
import { Poll } from "@/models/poll.model";
import { PollService } from "@/services/poll.service";
import { useNavigate, useParams } from "react-router";
import { Icon } from "@iconify/react";
import DataView from "@/components/blocks/views/data.view";
import { Progress } from "@/components/ui/progress";

export default function AdminPollPage() {

    const {buildingId} = useParams();

    const toast = useToast();
    const logout = useLogout();
    const navigate = useNavigate();

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
                <Button variant="default" size="icon"><Icon icon="ic:round-edit" fontSize="1.5em"/></Button>
                <Button variant="default" size="icon" onClick={() => navigate(`/admin/building/${buildingId}/poll/${data.id}/votes`)}><Icon icon="mdi:vote" fontSize="1.5em"/></Button>
                <Button variant="destructive" size="icon"><Icon icon="mdi:delete" fontSize="1.5em"/></Button>
            </TableCell>
        </TableRow>
    }

    return <>
        <DataView<Poll>
            headers={["Title", "Votes", "Active", "", "Actions"]}
            rowRenderer={renderPollRow}
            fetchCallback={getPolls}
        />
    </>

}