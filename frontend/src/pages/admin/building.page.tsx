import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { useLogout } from "@/hooks/logout.hook";
import { Building } from "@/models/building.model";
import { Page } from "@/models/page";
import { BuildingService } from "@/services/building.service";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import DataView from "@/components/blocks/views/data.view";
import { useNavigate } from "react-router";


export default function AdminBuildingPage() {

    const [buildings, setBuildings] = useState<Page<Building>>();

    const [filter, setFilter] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);

    const toast = useToast();
    const logout = useLogout();
    const navigate = useNavigate();

    async function getBuildings() {

        const buildings = await BuildingService.getBuildings(filter, page, limit);

        if(buildings == undefined) {
            toast.toast({
                title: "Communication error",
                description: "Please try again later",
                variant: "destructive"
            });
        } else if ("status" in buildings) {
            switch(buildings.status) {
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
            setBuildings(buildings);
        }

    }

    function renderBuildingRow(data : Building) {

        return <TableRow>
            <TableCell className="min-w-[200px]">{data.address}</TableCell>
            <TableCell className="min-w-[200px]">{data.manager?.fullName ?? "No manager"}</TableCell>
            <TableCell className="w-full"></TableCell>
            <TableCell className="w-fit flex gap-1">
                <Button variant="default" size="icon"><Icon icon="ic:round-edit" fontSize="1.5em"/></Button>
                <Button variant="default" size="icon" onClick={() => navigate(`/admin/building/${data.id}/apartments`)}><Icon icon="material-symbols:doorbell-3p-sharp" fontSize="1.5em"/></Button>
                <Button variant="destructive" size="icon"><Icon icon="mdi:delete" fontSize="1.5em"/></Button>
            </TableCell>
        </TableRow>

    }

    useEffect(() => {
        getBuildings();
    }, [filter, page, limit]);

    return buildings && <>
        <DataView
            data={buildings}
            headers={["Address", "Manager", "", "Actions"]}
            rowRenderer={renderBuildingRow}
            onFilterChange={setFilter}
            onPageChange={setPage}
            onLimitChange={setLimit}
        />
    </>

}