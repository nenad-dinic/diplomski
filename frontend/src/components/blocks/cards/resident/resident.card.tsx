import DeletePopover from "@/components/blocks/popovers/delete.popover";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useLogout } from "@/hooks/logout.hook";
import { Resident } from "@/models/resident.model";
import { ResidentService } from "@/services/resident.service";
import { TokenManager } from "@/utils/token.manager";
import { Icon } from "@iconify/react";

interface ResidentResidentCardProps {

    resident : Resident;
    canRemove? : boolean;
    onRemove? : () => void;

}

export default function ResidentResidentCard(props : ResidentResidentCardProps) {

    const user = TokenManager.getUserInfo();
    const toast = useToast();
    const logout = useLogout();

    async function removeResident() {

        const resident = await ResidentService.deleteResident(props.resident.id);

        if(resident == undefined) {
            toast.toast({
                title: "Communication error",
                description: "Please try again later",
                variant: "destructive"
            });
        } else if ("status" in resident) {
            switch(resident.status) {
                case 401:
                    logout();
                    break;
                case 403:
                    toast.toast({
                        title: "Unauthorized",
                        description: "You are not allowed to remove this resident",
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
                title: "Resident removed",
                description: "The resident was removed successfully",
            });
            props.onRemove?.();
        }

    }

    return <Card className="w-[250px]">
        <CardContent className="p-4 flex flex-col items-center">
            <Icon icon="ic:round-person" fontSize={"4em"}/>
            <h2 className="mt-1"><strong>{props.resident.user?.fullName} {props.resident.userId === user?.id ? "(You)" : ""}</strong></h2>
            <div className="text-center text-sm text-gray-500">
                <p>{props.resident.isOwner ? "(Owner)" : <br/>}</p>
                <p>{props.resident.user?.email}</p>
                <p>{props.resident.user?.phoneNumber}</p>
            </div>
        </CardContent>
        <CardFooter className="flex flex-col w-full gap-2">
            {props.canRemove && props.resident.userId !== user?.id && 
                <DeletePopover
                    trigger={<Button variant="destructive" className="w-full"><Icon className="mr-2" icon="ic:round-close" fontSize="1.5em"/> Remove</Button>}
                    onDelete={() => removeResident()}
                />
            }
        </CardFooter>
    </Card>

}