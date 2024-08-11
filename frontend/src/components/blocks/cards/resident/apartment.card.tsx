import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Apartment } from "@/models/apartment.model";
import { useNavigate } from "react-router";
import { Icon } from "@iconify/react";

interface ResidentApartmentCardProps {
    apartment : Apartment;
}

export default function ResidentApartmentCard(props : ResidentApartmentCardProps) {

    const navigate = useNavigate();

    return <Card className="w-[250px]">
        <CardContent className="p-4 flex flex-col items-center gap-4">
            <h2 className="w-full text-center text-xl">No. {props.apartment.number}</h2>
            <div className="text-center text-gray-500 text-sm">
                <p>Residents: {props.apartment.numberOfResidents}</p>
                <p>Address: {props.apartment.building?.address}</p>
                <p>Size: {props.apartment.size} m<sup>2</sup></p>
            </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
            <Button className="w-full" onClick={() => navigate(`/apartment/${props.apartment.id}/residents`)}><Icon className="mr-2" icon="ic:round-family-restroom" fontSize="1.5em"/> Residents</Button>
            <Button className="w-full" onClick={() => navigate(`/apartment/${props.apartment.id}/repairs`)}><Icon className="mr-2" icon="mdi:tools" fontSize="1.5em"/> Repairs</Button>
            <Button className="w-full" onClick={() => navigate(`/apartment/${props.apartment.id}/bills`)}><Icon className="mr-2" icon="mdi:invoice-list" fontSize="1.5em"/> Bills</Button>
        </CardFooter>
    </Card>

}