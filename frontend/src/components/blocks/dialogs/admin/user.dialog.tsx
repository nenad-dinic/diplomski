import AdminUserForm, { AdminUserFormData } from "@/components/blocks/forms/admin/user.form";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { useLogout } from "@/hooks/logout.hook";
import { User } from "@/models/user.model";
import { UserService } from "@/services/user.service";
import { Role } from "@/types/role.enum";
import { ReactNode, useEffect, useState } from "react";

interface AdminUserDialogProps {
    trigger : ReactNode;
    user ?: User;
    onClose ?: () => void;
}

export default function AdminUserDialog(props : AdminUserDialogProps) {

    const [open, setOpen] = useState(false);

    const toast = useToast();
    const logout = useLogout();

    async function createUser(username : string, password : string, fullName : string, email : string, phoneNumber : string, role : Role) {

        const user = await UserService.createUser(username, password, fullName, email, phoneNumber, role);

        if(user == undefined) {
            toast.toast({
                title: "Communication error",
                description: "Please try again later",
                variant: "destructive"
            });
        } else if ("status" in user) {
            switch(user.status) {
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
                title: "User created",
                description: "The user has been created",
            });
            setOpen(false);
        }

    }

    async function updateUser(id : number, username : string, password : string, fullName : string, email : string, phoneNumber : string, role : Role) {

        const user = await UserService.updateUser(id, username, password.length > 0 ? password : undefined, fullName, email, phoneNumber, role);

        if(user == undefined) {
            toast.toast({
                title: "Communication error",
                description: "Please try again later",
                variant: "destructive"
            });
        } else if ("status" in user) {
            switch(user.status) {
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
                title: "User updated",
                description: "The user has been updated",
            });
            setOpen(false);
        }

    }

    function handleFormSubmit(data : AdminUserFormData) {

        if(props.user) {
            updateUser(props.user.id, data.username, data.password, data.fullName, data.email, data.phoneNumber, data.role);
        } else {
            createUser(data.username, data.password, data.fullName, data.email, data.phoneNumber, data.role);
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
            <AdminUserForm user={props.user} onSubmit={handleFormSubmit}/>
        </DialogContent>
    </Dialog>

}