import CreateCard from "@/components/blocks/cards/create.card";
import ManagerPollCard from "@/components/blocks/cards/manager/poll.card";
import ManagerPollDialog from "@/components/blocks/dialogs/manager/poll.dialog";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { useToast } from "@/components/ui/use-toast";
import { useLogout } from "@/hooks/logout.hook";
import { Poll } from "@/models/poll.model";
import { PollService } from "@/services/poll.service";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";

export default function ManagerPollPage() {

    const {buildingId} = useParams();

    const [polls, setPolls] = useState<Poll[]>([]);

    const toast = useToast();
    const logout = useLogout();
    const navigate = useNavigate();
    
    async function getPolls() {

        const id = parseInt(buildingId ?? "0");

        const polls = await PollService.getPollsByBuilding(id, "", 1, 1000);

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
        getPolls();
    }, []); 

    return <div className="p-8">
        <Breadcrumb className="mb-4">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <Link to="/manager/buildings">Buildings</Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator/>
                <BreadcrumbItem>
                    <p>{buildingId}</p>
                </BreadcrumbItem>
                <BreadcrumbSeparator/>
                <BreadcrumbItem>
                    <Link to={`/manager/building/${buildingId}/polls`}>Polls</Link>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
        <div className="flex gap-4 flex-wrap">
            {polls.length > 0 && polls.map(p => (
                <ManagerPollCard poll={p} onEdit={() => getPolls()}/>
            ))}
            <ManagerPollDialog
                trigger={<CreateCard className="w-[250px] h-[262px]"/>}
                buildingId={parseInt(buildingId ?? "")}
                onClose={() => getPolls()}
                />
        </div>
    </div> 

}