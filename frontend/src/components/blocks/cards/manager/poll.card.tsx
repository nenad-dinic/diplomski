import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Poll } from "@/models/poll.model";
import { Icon } from '@iconify/react';
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import ManagerPollDialog from "@/components/blocks/dialogs/manager/poll.dialog";

interface ManagerPollCardProps {
    poll: Poll;
    onEdit ?: () => void;
}

export default function ManagerPollCard(props : ManagerPollCardProps) {

    return <Card className="w-[250px]">
        <CardContent className="p-4 flex flex-col items-center">
            <Icon icon="mdi:poll" fontSize={"4em"}/>
            <h2 className="mt-2">{props.poll.title}</h2>
            <div className="px-3 w-full text-center text-sm text-gray-500">
                <p>{props.poll.isActive ? "Active" : "Inactive"}</p>
                <div className="w-full mt-4 flex flex-col gap-2 items-center">
                    <Progress className={`${props.poll.totalVotes > 0 ? 'bg-red-500' : ''} *:bg-green-500`} value={(props.poll.totalYesVotes / props.poll.totalVotes) * 100}></Progress>
                    <p className="w-[50px]">{props.poll.totalYesVotes} : {props.poll.totalNoVotes}</p>
                </div>
            </div>
        </CardContent>
        <CardFooter className="flex flex-col w-full gap-2">
            <ManagerPollDialog
                poll={props.poll}
                trigger={<Button className="w-full"><Icon className="mr-2" icon="mdi:edit" fontSize="1.5em"/> Edit</Button>}
                onClose={props.onEdit}
            />
        </CardFooter>
    </Card>

}