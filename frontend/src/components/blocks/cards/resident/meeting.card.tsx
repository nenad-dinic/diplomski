import { Card, CardContent } from "@/components/ui/card";
import { Meeting } from "@/models/meeting.model";
import { Icon } from '@iconify/react';
import { format } from "date-fns";

interface ResidentMeetingCardProps {

    meeting : Meeting;
    onEdit ?: () => void;

}

export default function ResidentMeetingCard(props : ResidentMeetingCardProps) {

    return <Card className="w-[250px]">
        <CardContent className="p-4 flex flex-col items-center">
            <Icon icon="mdi:talk" fontSize={"4em"}/>
            <h2 className="mt-4">{format(props.meeting.dateTime, "dd.MM.yyyy HH:mm")}</h2>
            <div className="px-3 w-full text-center text-sm text-gray-500">
                <p>Length: {props.meeting.length} min</p>
                <p className="mt-3">{props.meeting.description}</p>
            </div>
        </CardContent>
    </Card>

}