import { ManagerBuildingCard } from "@/components/blocks/cards/manager/building.card";
import { useToast } from "@/components/ui/use-toast";
import { useLogout } from "@/hooks/logout.hook";
import { Building } from "@/models/building.model";
import { BuildingService } from "@/services/building.service";
import { TokenManager } from "@/utils/token.manager";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function ManagerBuildingPage() {

    const [buildings, setBuildings] = useState<Building[]>([]);

    const toast = useToast();
    const logout = useLogout();
    const navigate = useNavigate();

    const user = TokenManager.getUserInfo();

    async function getBuildings() {

        if(user == null) {
            logout();
            return;
        }

        const buildings = await BuildingService.getBuildingsByManager(user.id, "", 1, 1000);

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
            setBuildings(buildings.items);
        }

    }

    useEffect(() => {

        getBuildings();

    }, []);

    return <div className="flex flex-col gap-3 p-8">
        {buildings.map(b => (
            <ManagerBuildingCard building={b}></ManagerBuildingCard>
        ))}
    </div>

}