import DataView from "@/components/blocks/views/data.view";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { useLogout } from "@/hooks/logout.hook";
import { Page } from "@/models/page";
import { User } from "@/models/user.model";
import { UserService } from "@/services/user.service";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";

export default function AdminUserPage() {

    const [users, setUsers] = useState<Page<User>>({items: [], currentPage: 1, totalPages: 0, totalItems: 0, limit: 10});

    const [filter, setFilter] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);

    const toast = useToast();
    const logout = useLogout();

    async function getUsers() {

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
                default:
                    toast.toast({
                        title: "Error",
                        description: "An error occurred, please try again later",
                        variant: "destructive"
                    });
            }
        } else {
            setUsers(users);
        }

    }

    function renderUserRow(data : User) {
        return <TableRow>
            <TableCell>{data.username}</TableCell>
            <TableCell>{data.fullName}</TableCell>
            <TableCell>{data.email}</TableCell>
            <TableCell>{data.phoneNumber}</TableCell>
            <TableCell>{data.role}</TableCell>
            <TableCell className="flex gap-1">
                <Button variant="default" size="icon"><Icon icon="ic:round-edit" fontSize="1.25em"/></Button>
                <Button variant="destructive" size="icon"><Icon icon="mdi:delete" fontSize="1.25em"/></Button>
            </TableCell>
        </TableRow>
    }

    useEffect(() => {
        getUsers();
    }, [filter, page, limit]);

    return <>
        <DataView 
            data={users} 
            headers={["Username", "Full Name", "Email", "Phone Number", "Role", "Actions"]} 
            rowRenderer={renderUserRow}
            onFilterChange={setFilter}
            onPageChange={setPage}
            onLimitChange={setLimit}
        />
    </>

}