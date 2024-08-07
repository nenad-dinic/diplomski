import AdminApartmentForm, { ApartmentFormData } from "@/components/blocks/forms/admin/apartment.form";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { useLogout } from "@/hooks/logout.hook";
import { Apartment } from "@/models/apartment.model";
import { ApartmentService } from "@/services/apartment.service";
import { ReactNode, useEffect, useState } from "react";

interface ApartmentDialogProps {
    trigger : ReactNode;
    apartment ?: Apartment;
    onClose ?: () => void;
}

export default function AdminApartmentDialog(props : ApartmentDialogProps) {

    const [open, setOpen] = useState(false);

    const toast = useToast();
    const logout = useLogout();

    async function createApartment(buildingId : number, number : number, size : number, residents : number) {

        const apartment = await ApartmentService.createApartment(buildingId, number, size, residents);

        if(apartment == undefined) {
            toast.toast({
                title: "Communication error",
                description: "Please try again later",
                variant: "destructive"
            });
        } else if ("status" in apartment) {
            switch(apartment.status) {
                case 401:
                    logout();
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
                title: "Apartment created",
                description: "The apartment has been created",
            });
            setOpen(false);
        }

    }

    async function updateApartment(id : number, buildingId : number, number : number, size : number, residents : number) {

        const apartment = await ApartmentService.updateApartment(id, buildingId, number, size, residents);

        if(apartment == undefined) {
            toast.toast({
                title: "Communication error",
                description: "Please try again later",
                variant: "destructive"
            });
        } else if ("status" in apartment) {
            switch(apartment.status) {
                case 401:
                    logout();
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
                title: "Apartment updated",
                description: "The apartment has been updated",
            });
            setOpen(false);
        }

    }

    function handleFormSubmit(data : ApartmentFormData) {

        if(props.apartment != null) {
            updateApartment(props.apartment.id, data.buildingId, data.number, data.size, data.numberOfResidents);
        } else {
            createApartment(data.buildingId, data.number, data.size, data.numberOfResidents);
        }

    }

    useEffect(() => {
        if(open == false) {
            props.onClose?.();
        }
    }, [open]);

    return <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
            {props.trigger}
        </DialogTrigger>
        <DialogContent>
            <AdminApartmentForm apartment={props.apartment} onSubmit={handleFormSubmit} />
        </DialogContent>
    </Dialog>

}