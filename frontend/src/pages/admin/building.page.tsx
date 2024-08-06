import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { useLogout } from "@/hooks/logout.hook";
import { Building } from "@/models/building.model";
import { BuildingService } from "@/services/building.service";
import { Icon } from "@iconify/react";
import DataView, { DataViewRef } from "@/components/blocks/views/data.view";
import { useNavigate } from "react-router";
import AdminDeletePopover from "@/components/blocks/popovers/admin/delete.popover";
import { useRef } from "react";
import AdminBuildingDialog from "@/components/blocks/dialogs/admin/building.dialog";


export default function AdminBuildingPage() {

    const toast = useToast();
    const logout = useLogout();
    const navigate = useNavigate();

    const dataViewRef = useRef<DataViewRef>({ refresh: () => {} });

    async function getBuildings(filter : string, page : number, limit : number) {

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
            return buildings;
        }

        return undefined;

    }

    async function deleteBuilding(id : number) {
    
        const building = await BuildingService.deleteBuilding(id);
    
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
                title: "Building deleted",
                description: "The building was successfully deleted"
            });
            dataViewRef.current.refresh();
        }

    }

    function renderBuildingRow(data : Building) {

        return <TableRow>
            <TableCell className="min-w-[200px]">{data.address}</TableCell>
            <TableCell className="min-w-[200px]">{data.manager?.fullName ?? "No manager"}</TableCell>
            <TableCell className="w-full"></TableCell>
            <TableCell className="w-fit flex gap-1">
                <AdminBuildingDialog
                    trigger={<Button variant="default" size="icon"><Icon icon="ic:round-edit" fontSize="1.5em"/></Button>}
                    building={data}
                    onClose={() => dataViewRef.current.refresh()}
                />
                <Button variant="default" size="icon" onClick={() => navigate(`/admin/building/${data.id}/apartments`)}><Icon icon="material-symbols:doorbell-3p" fontSize="1.5em"/></Button>
                <Button variant="default" size="icon" onClick={() => navigate(`/admin/building/${data.id}/meetings`)}><Icon icon="mdi:talk" fontSize="1.5em"/></Button>
                <Button variant="default" size="icon" onClick={() => navigate(`/admin/building/${data.id}/polls`)}><Icon icon="mdi:poll" fontSize="1.5em"/></Button>
                <AdminDeletePopover trigger={
                    <Button variant="destructive" size="icon"><Icon icon="mdi:delete" fontSize="1.5em"/></Button>
                }
                onDelete={() => deleteBuilding(data.id)}
                />
            </TableCell>
        </TableRow>

    }

    return <>
        <DataView<Building>
            ref={dataViewRef}
            headers={["Address", "Manager", "", "Actions"]}
            rowRenderer={renderBuildingRow}
            fetchCallback={getBuildings}
            actionRow={
                <AdminBuildingDialog
                    trigger={<Button variant="default"><Icon icon="ion:add" fontSize="1.5em"/> Add Building</Button>}
                    onClose={() => dataViewRef.current.refresh()}
                />
            }
        />
    </>

}