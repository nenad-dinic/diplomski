import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@iconify/react";

interface DashboardCardProps {
    icon: string;
    title: string;
    count: number;
}

export function AdminDashboardCard(props : DashboardCardProps) {

    return <Card className="w-[200px]">
        <CardHeader className="py-2">
            <CardTitle className="text-center text-lg w-full">{props.title}</CardTitle>
        </CardHeader>
        <CardContent className="py-4">
            <Icon className="mx-auto" icon={props.icon} fontSize="5em"></Icon>
        </CardContent>
        <CardFooter>
            <p className="w-full text-center text-lg">{props.count}</p>
        </CardFooter>
    </Card>

}