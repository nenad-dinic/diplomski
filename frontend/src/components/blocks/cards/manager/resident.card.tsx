import { Card, CardContent } from "@/components/ui/card";
import { Resident } from "@/models/resident.model";
import { Icon } from "@iconify/react";

interface ManagerResidentCardProps {

    resident : Resident;

}

export default function ManagerResidentCard(props : ManagerResidentCardProps) {

    return <Card className="w-[250px]">
        <CardContent className="p-4 flex flex-col items-center">
            <Icon icon="ic:round-person" fontSize={"4em"}/>
            <h2 className="mt-1"><strong>{props.resident.user?.fullName}</strong></h2>
            <div className="text-center text-sm text-gray-500">
                <p>{props.resident.isOwner ? "(Owner)" : <br/>}</p>
                <p>{props.resident.user?.email}</p>
                <p>{props.resident.user?.phoneNumber}</p>
            </div>
        </CardContent>
    </Card>

}