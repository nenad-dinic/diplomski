import CreateCard from "@/components/blocks/cards/create.card";
import ManagerMeetingCard from "@/components/blocks/cards/manager/meeting.card";
import ManagerMeetingDialog from "@/components/blocks/dialogs/manager/meeting.dialog";
import { useToast } from "@/components/ui/use-toast";
import { useLogout } from "@/hooks/logout.hook";
import { Meeting } from "@/models/meeting.model";
import { MeetingService } from "@/services/meeting.service";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function ManagerMeetingPage() {

    const {buildingId} = useParams();

    const [meetings, setMeetings] = useState<Meeting[]>([]);

    const toast = useToast();
    const logout = useLogout();
    const navigate = useNavigate();

    async function getMeetings() {

        const id = parseInt(buildingId ?? "0");

        const meetings = await MeetingService.getMeetingsByBuilding(id, "", 1, 1000);

        if(meetings == undefined) {
            toast.toast({
                title: "Communication error",
                description: "Please try again later",
                variant: "destructive"
            });
        } else if ("status" in meetings) {
            switch(meetings.status) {
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
            setMeetings(meetings.items);
        }

    }

    useEffect(() => {
        getMeetings();
    }, []);

    return <div className="flex gap-4 flex-wrap p-8">
        {meetings.length > 0 && meetings.map(m => (
            <ManagerMeetingCard meeting={m} onEdit={() => getMeetings()}/>
        ))}
        <ManagerMeetingDialog
            trigger={<CreateCard className="w-[250px] h-[247px]"/>}
            onClose={() => getMeetings()}
            buildingId={parseInt(buildingId ?? "")}
        />
    </div>

}