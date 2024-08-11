import ResidentMeetingCard from "@/components/blocks/cards/resident/meeting.card";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { useToast } from "@/components/ui/use-toast";
import { useLogout } from "@/hooks/logout.hook";
import { Meeting } from "@/models/meeting.model";
import { MeetingService } from "@/services/meeting.service";
import { TokenManager } from "@/utils/token.manager";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export default function ResidentMeetingPage() {

    const user = TokenManager.getUserInfo();

    const [meetings, setMeetings] = useState<Meeting[]>([]);

    const toast = useToast();
    const logout = useLogout();
    const navigate = useNavigate();

    async function getMeetings() {

        const meetings = await MeetingService.getActiveMeetingsForUser(user?.id ?? 0, "", 1, 1000);

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

    return <div className="p-8">
        <Breadcrumb className="mb-4">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <Link to="/">Apartments</Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator/>
                <BreadcrumbItem>
                    <Link to="/meetings">Meetings</Link>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
        <div className="flex gap-4 flex-wrap">
            {meetings.length > 0 && meetings.map(m => (
                <ResidentMeetingCard meeting={m}/>
            ))}
            {meetings.length == 0 && <p className="text-center w-full">No meetings scheduled</p>}
        </div>
    </div>

}