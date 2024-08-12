import ResidentPollCard from "@/components/blocks/cards/resident/poll.card";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList } from "@/components/ui/breadcrumb";
import { useToast } from "@/components/ui/use-toast";
import { useLogout } from "@/hooks/logout.hook";
import { Poll } from "@/models/poll.model";
import { PollService } from "@/services/poll.service";
import { TokenManager } from "@/utils/token.manager";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export default function ResidentPollPage() {

    const user = TokenManager.getUserInfo();

    const [polls, setPolls] = useState<Poll[]>([]);

    const toast = useToast();
    const logout = useLogout();
    const navigate = useNavigate();

    async function getActivePolls() {

        const polls = await PollService.getActivePollsByUser(user?.id ?? 0, "", 1, 1000);

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
            setPolls(polls.items);
        }

    }

    useEffect(() => {
        getActivePolls();
    }, []);

    return <div className="p-8">
        <Breadcrumb className="mb-4">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <Link to="/polls">Polls</Link>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
        <div className="flex gap-4 flex-wrap">
            {polls.length > 0 && polls.map(p => (
                <ResidentPollCard poll={p} onVote={() => getActivePolls()}></ResidentPollCard>
            ))}
            {polls.length == 0 && <p className="text-center w-full">No active polls</p>}
        </div>
    </div>

}