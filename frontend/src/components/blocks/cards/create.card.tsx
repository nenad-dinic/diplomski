import { Card } from "@/components/ui/card";
import { cn } from "@/utils";
import { Icon } from "@iconify/react";

interface CreateCardProps {
    className?: string;
}

export default function CreateCard(props : CreateCardProps) {
    return <Card className={cn(props.className, "flex items-center justify-center border-dashed hover:cursor-pointer")}>
        <Icon className="text-gray-500" icon="ion:add" fontSize="4em"></Icon>
    </Card>
}