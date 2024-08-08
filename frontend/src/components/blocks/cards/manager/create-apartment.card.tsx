import { Card } from "@/components/ui/card";
import { Icon } from "@iconify/react";

export default function ManagerCreateApartment() {
    return <Card className="flex items-center justify-center w-[250px] h-[230px] border-dashed hover:cursor-pointer">
        <Icon className="text-gray-500" icon="ion:add" fontSize="4em"></Icon>
    </Card>
}