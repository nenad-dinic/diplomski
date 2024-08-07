import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Building } from "@/models/building.model";
import { Icon } from "@iconify/react";

interface ManagerBuildingCardProps {

    building : Building;

}

export function ManagerBuildingCard(props : ManagerBuildingCardProps) {

    return <Card className="w-full">
        <CardContent className="p-4 flex items-center gap-4">
            <Icon icon="ic:round-apartment" fontSize={"2em"}/>
            <h2>{props.building.address}</h2>
            <div className="ml-auto flex items-center gap-2">
                <Button size="icon"><Icon icon="material-symbols:doorbell-3p" fontSize="1.5em"/></Button>
            </div>
        </CardContent>
    </Card>

}