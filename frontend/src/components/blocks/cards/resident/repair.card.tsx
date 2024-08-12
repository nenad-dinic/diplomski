import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useLogout } from "@/hooks/logout.hook";
import { Repair } from "@/models/repair.model";
import { RepairService } from "@/services/repair.service";
import { Icon } from '@iconify/react';
import { format } from "date-fns";

interface ResidentRepairCardProps {
    repair : Repair;
    isOwner : boolean;
    onRepair ?: () => void;
}

export default function ResidentRepairCard(props : ResidentRepairCardProps) {

    const toast = useToast();
    const logout = useLogout();

    async function markAsRepaired() {

        const repair = await RepairService.updateRepair(props.repair.id, undefined, undefined, undefined, true);

        if(repair == undefined) {
            toast.toast({
                title: "Communication error",
                description: "Please try again later",
                variant: "destructive"
            });
        } else if ("status" in repair) {
            switch(repair.status) {
                case 401:
                    logout();
                    break;
                case 403:
                    toast.toast({
                        title: "Permission denied",
                        description: "You are not allowed to perform this action",
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
                title: "Repair updated",
                description: "The repair has been marked as repaired",
            });
            props.onRepair?.();
        }

    }

    return <Card className="w-[250px]">
        <CardContent className="p-4 flex flex-col items-center">
            <Icon icon="mdi:invoice-list" fontSize={"4em"}/>
            <h2 className="text-xl">{format(props.repair.createdAt, "dd.MM.yyyy HH:mm")}</h2>
            <div className="px-3 w-full text-center text-sm text-gray-500">
                <p>{props.repair.isRepaired ? "(Repaired}" : <br/>}</p>
                <p>{props.repair.description}</p>
            </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
            {props.isOwner && <Button className="w-full bg-green-600 hover:bg-green-500" onClick={() => markAsRepaired()}><Icon className="mr-2" icon="ic:round-check" fontSize="1.5em"/> Mark as repaired</Button>}
        </CardFooter>
    </Card>

}