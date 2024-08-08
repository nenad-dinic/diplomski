import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Building } from "@/models/building.model";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router";

interface ManagerBuildingCardProps {

    building : Building;

}

export default function ManagerBuildingCard(props : ManagerBuildingCardProps) {

    const navigate = useNavigate();

    return <Card className="w-[250px]">
        <CardContent className="p-4 flex flex-col items-center">
            <Icon icon="ic:round-apartment" fontSize={"4em"}/>
            <h2 className="mt-4">{props.building.address}</h2>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
            <Button className="w-full" onClick={() => navigate(`/manager/building/${props.building.id}/apartments`)}><Icon className="mr-2" icon="material-symbols:doorbell-3p" fontSize="1.5em"/> Apartments</Button>
        </CardFooter>
    </Card>

}