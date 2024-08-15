import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useLogout } from "@/hooks/logout.hook";
import { Resident } from "@/models/resident.model";
import { ApartmentService } from "@/services/apartment.service";
import { Icon } from "@iconify/react";

interface ManagerResidentCardProps {

    resident : Resident;
    onEdit ?: () => void;

}

export default function ManagerResidentCard(props : ManagerResidentCardProps) {

    const toast = useToast();
    const logout = useLogout();

    async function setAsOwner() {

        const response = await ApartmentService.setApartmentOwner(props.resident.apartmentId, props.resident.userId);

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
                title: "Owner set",
                description: "The resident has been set as owner",
            });
            props.onEdit?.();
        }

    }

    return <Card className="w-[250px]">
        <CardContent className="p-4 flex flex-col items-center">
            <Icon icon="ic:round-person" fontSize={"4em"}/>
            <h2 className="mt-1"><strong>{props.resident.user?.fullName}</strong></h2>
            <div className="text-center text-sm text-gray-500">
                <p>{props.resident.isOwner ? "(Owner)" : <br/>}</p>
                <p>{props.resident.user?.email}</p>
                <p>{props.resident.user?.phoneNumber}</p>
            </div>
        </CardContent>
        <CardFooter>
            {!props.resident.isOwner && <Button className="w-full" onClick={setAsOwner}><Icon icon="mdi:user-star" fontSize="1.5em" className="mr-2"/>Set as owner</Button>}
        </CardFooter>
    </Card>

}