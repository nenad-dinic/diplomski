import ManagerApartmentDialog from "@/components/blocks/dialogs/manager/apartment.dialog";
import ManagerInviteOwnerDialog from "@/components/blocks/dialogs/manager/invite-owner.dialog";
import DeletePopover from "@/components/blocks/popovers/delete.popover";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Apartment } from "@/models/apartment.model";
import { ApartmentService } from "@/services/apartment.service";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router";

interface ManagerApartmentCardProps {
    apartment : Apartment;
    onEdit ?: () => void;
    onDelete ?: () => void;
}

export default function ManagerApartmentCard(props : ManagerApartmentCardProps) {

    const toast = useToast();
    const navigate = useNavigate();

    async function deleteApartment() {

        const apartment = await ApartmentService.deleteApartment(props.apartment.id);

        if(apartment == undefined) {
            toast.toast({
                title: "Communication error",
                description: "Please try again later",
                variant: "destructive"
            });
        } else if ("status" in apartment) {
            switch(apartment.status) {
                case 401:
                    toast.toast({
                        title: "Unauthorized",
                        description: "You are not authorized to delete this apartment",
                        variant: "destructive"
                    });
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
                title: "Apartment deleted",
                description: "The apartment has been deleted"
            });
            if(props.onDelete) {
                props.onDelete();
            }
        }
    }

    function hasOwner() {
        return props.apartment.residents?.some(r => r.isOwner);
    }

    return <Card className="w-[250px]">
        <CardContent className="p-4 flex flex-col items-center gap-4">
            <h2 className="w-full text-center text-xl">No. {props.apartment.number}</h2>
            <div className="text-center text-gray-500 text-sm">
                <p>Residents: {props.apartment.numberOfResidents}</p>
                <p>Size: {props.apartment.size} m<sup>2</sup></p>
            </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
            {!hasOwner() && <ManagerInviteOwnerDialog
                trigger={<Button className="w-full grow"><Icon className="mr-2" icon="mdi:account-plus" fontSize="1.5em"/> Invite Owner</Button>}
                apartmentId={props.apartment.id}
            />}
            <Button className="w-full" onClick={() => navigate(`/manager/building/${props.apartment.buildingId}/apartment/${props.apartment.id}/residents`)}><Icon className="mr-2" icon="ic:round-family-restroom" fontSize="1.5em"/> Residents</Button>
            <div className="flex gap-2 w-full">
                <ManagerApartmentDialog 
                    apartment={props.apartment}
                    trigger={<Button className="grow"><Icon className="mr-2" icon="mdi:edit" fontSize="1.5em"/> Edit</Button>}
                    onClose={props.onEdit}
                />
                <DeletePopover
                    trigger={<Button variant="destructive" className="grow"><Icon className="mr-2" icon="mdi:delete" fontSize="1.5em"/> Delete</Button>}
                    onDelete={deleteApartment}
                />
            </div>
        </CardFooter>
    </Card>

}