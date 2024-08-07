import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Apartment } from "@/models/apartment.model";
import { Icon } from "@iconify/react";

interface ManagerApartmentCardProps {
    apartment : Apartment;
}

export default function ManagerApartmentCard(props : ManagerApartmentCardProps) {

    return <Card className="w-[250px]">
        <CardContent className="p-4 flex flex-col items-center gap-4">
            <h2 className="w-full text-center text-xl">No. {props.apartment.number}</h2>
            <div>
                <p>Residents: {props.apartment.numberOfResidents}</p>
                <p>Size: {props.apartment.size} m<sup>2</sup></p>
            </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
            <Button className="w-full"><Icon className="mr-2" icon="ic:round-family-restroom" fontSize="1.5em"/> Residents</Button>
            <Button className="w-full"><Icon className="mr-2" icon="mdi:invoice-list" fontSize="1.5em"/> Bills</Button>
            <Button className="w-full"><Icon className="mr-2" icon="mdi:tools" fontSize="1.5em"/> Repairs</Button>
        </CardFooter>
    </Card>

}