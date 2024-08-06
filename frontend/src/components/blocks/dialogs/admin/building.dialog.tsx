import AdminBuildingForm, { BuildingFormData } from "@/components/blocks/forms/admin/building.form";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { useLogout } from "@/hooks/logout.hook";
import { Building } from "@/models/building.model";
import { BuildingService } from "@/services/building.service";
import { ReactNode, useEffect, useState } from "react";

interface BuildingDialogProps {

    trigger : ReactNode;
    building ?: Building;
    onClose ?: () => void;

}

export default function AdminBuildingDialog(props : BuildingDialogProps) {

    const [open, setOpen] = useState(false);

    const toast = useToast();
    const logout = useLogout();

    async function createBuilding(address : string, managerId : number) {
    
        const building = await BuildingService.createBuilding(managerId, address);

        if(building == undefined) {
            toast.toast({
                title: "Communication error",
                description: "Please try again later",
                variant: "destructive"
            });
        } else if ("status" in building) {
            switch(building.status) {
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
                title: "Building created",
                description: "The building has been created",
            });
            setOpen(false);
        }

    }

    async function updateBuilding(id: number, address: string, managerId: number) {

        const building = await BuildingService.updateBuilding(id, managerId, address);

        if (building == undefined) {
            toast.toast({
                title: "Communication error",
                description: "Please try again later",
                variant: "destructive"
            });
        } else if ("status" in building) {
            switch (building.status) {
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
                title: "Building updated",
                description: "The building has been updated",
            });
            setOpen(false);
        }

    }

    function handleFormSubmit(data : BuildingFormData) {

        if(props.building) {
            updateBuilding(props.building.id, data.address, data.managerId);
        } else {
            createBuilding(data.address, data.managerId);
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
            <AdminBuildingForm building={props.building} onSubmit={handleFormSubmit} />
        </DialogContent>
    </Dialog>

}