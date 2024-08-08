import AdminUserDialog from "@/components/blocks/dialogs/admin/user.dialog";
import DeletePopover from "@/components/blocks/popovers/delete.popover";
import DataView, { DataViewRef } from "@/components/blocks/views/data.view";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { useLogout } from "@/hooks/logout.hook";
import { User } from "@/models/user.model";
import { UserService } from "@/services/user.service";
import { Icon } from "@iconify/react";
import { useRef} from "react";
import { useNavigate } from "react-router";

export default function AdminUserPage() {

    const toast = useToast();
    const logout = useLogout();
    const navigate = useNavigate();

    const dataViewRef = useRef<DataViewRef>({ refresh: () => {} });

    async function getUsers(filter : string, page : number, limit : number) {

        const users = await UserService.getUsers(filter, page, limit);

        if(users == undefined) {
            toast.toast({
                title: "Communication error",
                description: "Please try again later",
                variant: "destructive"
            });
        } else if ("status" in users) {
            switch(users.status) {
                case 401:
                    logout();
                    break;
                case 403:
                    navigate("/");
                    break;
                default:
                    toast.toast({
                        title: "Error",
                        description: "An error occurred, please try again later",
                        variant: "destructive"
                    });
            }
        } else {
            return users;
        }

        return undefined;

    }

    async function deleteUser(id : number) {

        const user = await UserService.deleteUser(id);

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
                title: "User deleted",
                description: "The user has been deleted",
            });
            dataViewRef.current.refresh();
        }

    }

    function renderUserRow(data : User) {
        return <TableRow key={data.id}>
            <TableCell className="min-w-[100px]">{data.username}</TableCell>
            <TableCell className="min-w-[200px]">{data.fullName}</TableCell>
            <TableCell className="min-w-[300px]">{data.email}</TableCell>
            <TableCell className="min-w-[200px]">{data.phoneNumber}</TableCell>
            <TableCell className="min-w-[100px]">{data.role}</TableCell>
            <TableCell className="w-full"></TableCell>
            <TableCell className="w-fit flex gap-1">
                <AdminUserDialog 
                    trigger={<Button variant="default" size="icon"><Icon icon="ic:round-edit" fontSize="1.5em"/></Button>}
                    user={data} 
                    onClose={() => dataViewRef.current.refresh()}
                />
                <DeletePopover trigger={
                    <Button variant="destructive" size="icon"><Icon icon="mdi:delete" fontSize="1.5em"/></Button>
                }
                onDelete={() => deleteUser(data.id)}
                />
            </TableCell>
        </TableRow>
    }

    return <>
        <DataView<User>
            ref={dataViewRef}
            headers={["Username", "Full Name", "Email", "Phone Number", "Role", "", "Actions"]} 
            rowRenderer={renderUserRow}
            fetchCallback={getUsers}
        />
    </>

}