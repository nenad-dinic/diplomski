import DataView from "@/components/blocks/views/data.view";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Page } from "@/models/page";
import { User } from "@/models/user.model";
import { UserService } from "@/services/user.service";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";

export default function UserPage() {

    const [users, setUsers] = useState<Page<User>>({items: [], currentPage: 1, totalPages: 0, totalItems: 0, limit: 10});

    const [filter, setFilter] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);

    async function getUsers() {

        const users = await UserService.getUsers(filter, page, limit);

        setUsers(users);

    }

    function renderUserRow(data : User) {
        return <TableRow>
            <TableCell>{data.username}</TableCell>
            <TableCell>{data.fullName}</TableCell>
            <TableCell>{data.email}</TableCell>
            <TableCell>{data.phoneNumber}</TableCell>
            <TableCell>{data.role}</TableCell>
            <TableCell>
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