import ResidentApartmentForm, { ResidentApartmentFormData } from "@/components/blocks/forms/resident/apartment.form";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { useLogout } from "@/hooks/logout.hook";
import { Apartment } from "@/models/apartment.model";
import { ApartmentService } from "@/services/apartment.service";
import { ReactNode, useEffect, useState } from "react";

interface ResidentApartmentDialogProps {

    trigger : ReactNode;
    apartment?: Apartment;
    onClose?: () => void;

}

export default function ResidentApartmentDialog(props : ResidentApartmentDialogProps) {

    const [open, setOpen] = useState(false);

    const toast = useToast();
    const logout = useLogout();

    async function updateApartment(id : number, numberOfResidents : number) {

        const apartment = await ApartmentService.updateApartment(id, undefined, undefined, undefined, numberOfResidents);

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
                title: "Apartment updated",
                description: "The apartment has been updated",
            });
            setOpen(false);
        }

    }

    async function handleFormSubmit(data : ResidentApartmentFormData) {

        if(props.apartment) {
            updateApartment(props.apartment.id, data.numberOfResidents);
        }

    }

    useEffect(() => {
        if(open == false) {
            props.onClose?.();
        }
    }, [open]);

    return <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            {props.trigger}
        </DialogTrigger>
        <DialogContent>
            <ResidentApartmentForm apartment={props.apartment} onSubmit={handleFormSubmit} />
        </DialogContent>
    </Dialog>

}