import ManagerMeetingDialog from "@/components/blocks/dialogs/manager/meeting.dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Meeting } from "@/models/meeting.model";
import { Icon } from '@iconify/react';
import { format } from "date-fns";

interface ManagerMeetingCardProps {

    meeting : Meeting;
    onEdit ?: () => void;

}

export default function ManagerMeetingCard(props : ManagerMeetingCardProps) {

    return <Card className="w-[250px]">
        <CardContent className="p-4 flex flex-col items-center">
            <Icon icon="mdi:talk" fontSize={"4em"}/>
            <h2 className="mt-4">{format(props.meeting.dateTime, "dd.MM.yyyy HH:mm")}</h2>
            <div className="px-3 w-full text-center text-sm text-gray-500">
                <p>Length: {props.meeting.length} min</p>
                <p className="mt-3">{props.meeting.description}</p>
            </div>
        </CardContent>
        <CardFooter className="flex flex-col w-full gap-2">
            <ManagerMeetingDialog
                trigger={<Button className="w-[200px]"><Icon className="mr-2" icon="mdi:edit" fontSize="1.5em"/> Edit</Button>}
                meeting={props.meeting}
                onClose={props.onEdit}
            />
        </CardFooter>
    </Card>

}