import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useLogout } from "@/hooks/logout.hook";
import { Poll } from "@/models/poll.model";
import { VoteService } from "@/services/vote.service";
import { TokenManager } from "@/utils/token.manager";
import { Icon } from "@iconify/react";

interface ResidentPollCardProps {
    poll: Poll;
    onVote: () => void;
}

export default function ResidentPollCard(props : ResidentPollCardProps) {

    const user = TokenManager.getUserInfo();
    const toast = useToast();
    const logout = useLogout();

    async function castVote(result : boolean) {

        const response = await VoteService.createVote(props.poll.id, user?.id ?? 0, result);

        if(response == undefined) {
            toast.toast({
                title: "Communication error",
                description: "Please try again later",
                variant: "destructive"
            });
        } else if ("status" in response) {
            switch(response.status) {
                case 401:
                    logout();
                    break;
                case 403:
                    toast.toast({
                        title: "Permission denied",
                        description: "You are not allowed to vote in this poll",
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
                title: "Success",
                description: "Your vote has been cast"
            });
            props.onVote?.();
        }

    }

    return <Card className="w-[250px]">
        <CardContent className="p-4 flex flex-col items-center">
            <Icon icon="mdi:poll" fontSize={"4em"}/>
            <h2 className="mt-2">{props.poll.title}</h2>
        </CardContent>
        <CardFooter className="flex flex-col w-full gap-2">
            <Button className="w-full bg-green-600 hover:bg-green-500" onClick={() => castVote(true)}><Icon className="mr-2" icon="ic:round-check" fontSize="1.5em"/> Yes</Button>
            <Button variant="destructive" className="w-full" onClick={() => castVote(false)}><Icon className="mr-2" icon="ic:round-close" fontSize="1.5em"/> No</Button>
        </CardFooter>
    </Card>

}